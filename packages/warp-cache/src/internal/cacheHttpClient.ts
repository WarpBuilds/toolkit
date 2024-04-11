import * as core from '@actions/core'
import {HttpClient} from '@actions/http-client'
import {BearerCredentialHandler} from '@actions/http-client/lib/auth'
import {
  RequestOptions,
  TypedResponse
} from '@actions/http-client/lib/interfaces'
import * as crypto from 'crypto'

import * as utils from './cacheUtils'
import {CompressionMethod} from './constants'
import {
  InternalCacheOptions,
  ITypedResponseWithError,
  InternalS3CompletedPart
} from './contracts'
import {
  downloadCacheMultiConnection,
  downloadCacheStreamingGCP
} from './downloadUtils'
import {isSuccessStatusCode, retryTypedResponse} from './requestUtils'
import {Storage} from '@google-cloud/storage'
import {
  CommonsCommitCacheRequest,
  CommonsCommitCacheResponse,
  CommonsGetCacheResponse,
  CommonsReserveCacheRequest,
  CommonsReserveCacheResponse
} from './warpcache-ts-sdk'
import {multiPartUploadToGCS, uploadFileToS3} from './uploadUtils'

const versionSalt = '1.0'

function getCacheApiUrl(resource: string): string {
  const baseUrl: string =
    process.env['WARPBUILD_CACHE_URL'] ?? 'https://cache.warpbuild.com'
  if (!baseUrl) {
    throw new Error('Cache Service Url not found, unable to restore cache.')
  }

  const url = `${baseUrl}/v1/${resource}`
  core.debug(`Resource Url: ${url}`)
  return url
}

function createAcceptHeader(type: string, apiVersion: string): string {
  return `${type};api-version=${apiVersion}`
}

function getRequestOptions(): RequestOptions {
  const requestOptions: RequestOptions = {
    headers: {
      Accept: createAcceptHeader('application/json', 'v1')
    }
  }

  return requestOptions
}

function createHttpClient(): HttpClient {
  const token = process.env['WARPBUILD_RUNNER_VERIFICATION_TOKEN'] ?? ''
  const bearerCredentialHandler = new BearerCredentialHandler(token)

  return new HttpClient(
    'warp/cache',
    [bearerCredentialHandler],
    getRequestOptions()
  )
}

export function getCacheVersion(
  paths: string[],
  compressionMethod?: CompressionMethod,
  enableCrossOsArchive = false
): string {
  const components = paths

  // Add compression method to cache version to restore
  // compressed cache as per compression method
  if (compressionMethod) {
    components.push(compressionMethod)
  }

  // Only check for windows platforms if enableCrossOsArchive is false
  if (process.platform === 'win32' && !enableCrossOsArchive) {
    components.push('windows-only')
  }

  // Add salt to cache version to support breaking changes in cache entry
  components.push(versionSalt)

  return crypto.createHash('sha256').update(components.join('|')).digest('hex')
}

export async function getCacheEntry(
  keys: string[],
  paths: string[],
  options?: InternalCacheOptions
): Promise<CommonsGetCacheResponse | null> {
  const httpClient = createHttpClient()
  const version = getCacheVersion(
    paths,
    options?.compressionMethod,
    options?.enableCrossOsArchive
  )
  const resource = `cache?keys=${encodeURIComponent(
    keys.join(',')
  )}&version=${version}`

  const response = await retryTypedResponse('getCacheEntry', async () =>
    httpClient.getJson<CommonsGetCacheResponse>(getCacheApiUrl(resource))
  )

  if (response.statusCode === 204) {
    // TODO: List cache for primary key only if cache miss occurs
    // if (core.isDebug()) {
    //   await printCachesListForDiagnostics(keys[0], httpClient, version)
    // }
    return null
  }
  if (!isSuccessStatusCode(response.statusCode)) {
    throw new Error(`Cache service responded with ${response.statusCode}`)
  }

  const cacheResult = response.result
  core.debug(`Cache Result:`)
  core.debug(JSON.stringify(cacheResult))

  return cacheResult
}

/*
async function printCachesListForDiagnostics(
  key: string,
  httpClient: HttpClient,
  version: string
): Promise<void> {
  const resource = `caches?key=${encodeURIComponent(key)}`
  const response = await retryTypedResponse('listCache', async () =>
    httpClient.getJson<ArtifactCacheList>(getCacheApiUrl(resource))
  )
  if (response.statusCode === 200) {
    const cacheListResult = response.result
    const totalCount = cacheListResult?.totalCount
    if (totalCount && totalCount > 0) {
      core.debug(
        `No matching cache found for cache key '${key}', version '${version} and scope ${process.env['GITHUB_REF']}. There exist one or more cache(s) with similar key but they have different version or scope. See more info on cache matching here: https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows#matching-a-cache-key \nOther caches with similar key:`
      )
      for (const cacheEntry of cacheListResult?.artifactCaches ?? []) {
        core.debug(
          `Cache Key: ${cacheEntry?.cache_key}, Cache Version: ${cacheEntry?.cache_version}`
        )
      }
    }
  }
}
*/

export async function downloadCache(
  archiveLocation: string,
  archivePath: string
): Promise<void> {
  await downloadCacheMultiConnection(archiveLocation, archivePath, 8)
}

export function downloadCacheStreaming(
  provider: string,
  archiveLocation: string,
  gcsToken?: string
): NodeJS.ReadableStream | undefined {
  switch (provider) {
    case 's3':
      return undefined
    case 'gcs': {
      if (!gcsToken) {
        throw new Error(
          'Unable to download cache from GCS. GCP token is not provided.'
        )
      }
      const storage = new Storage({
        token: gcsToken
      })
      return downloadCacheStreamingGCP(storage, archiveLocation)
    }
    default:
      return undefined
  }
}

export async function reserveCache(
  cacheKey: string,
  numberOfChunks: number,
  options?: InternalCacheOptions
): Promise<ITypedResponseWithError<CommonsReserveCacheResponse>> {
  const httpClient = createHttpClient()

  const reserveCacheRequest: CommonsReserveCacheRequest = {
    cache_key: cacheKey,
    number_of_chunks: numberOfChunks,
    content_type: 'application/zstd'
  }
  const response = await retryTypedResponse('reserveCache', async () =>
    httpClient.postJson<CommonsReserveCacheResponse>(
      getCacheApiUrl('cache/reserve'),
      reserveCacheRequest
    )
  )
  return response
}

async function commitCache(
  cacheKey: string,
  cacheVersion: string,
  uploadKey?: string,
  uploadID?: string,
  parts?: InternalS3CompletedPart[]
): Promise<TypedResponse<CommonsCommitCacheResponse>> {
  const httpClient = createHttpClient()

  if (!parts) {
    parts = []
  }

  const commitCacheRequest: CommonsCommitCacheRequest = {
    cache_key: cacheKey,
    cache_version: cacheVersion,
    upload_key: uploadKey,
    upload_id: uploadID,
    parts: parts,
    os: process.env['RUNNER_OS'] ?? 'Linux',
    vcs_type: 'github'
  }
  return await retryTypedResponse('commitCache', async () =>
    httpClient.postJson<CommonsCommitCacheResponse>(
      getCacheApiUrl(`cache/commit`),
      commitCacheRequest
    )
  )
}

export async function saveCache(
  provider: string,
  cacheKey: string,
  cacheVersion: string,
  archivePath: string,
  S3UploadId?: string,
  S3UploadKey?: string,
  S3NumberOfChunks?: number,
  S3PreSignedURLs?: string[],
  GCSAuthToken?: string,
  GCSBucketName?: string,
  GCSObjectName?: string
): Promise<string> {
  const cacheSize = utils.getArchiveFileSizeInBytes(archivePath)
  core.info(
    `Cache Size: ~${Math.round(cacheSize / (1024 * 1024))} MB (${cacheSize} B)`
  )

  let commitCacheResponse: TypedResponse<CommonsCommitCacheResponse> = {
    headers: {},
    statusCode: 0,
    result: null
  }

  let cacheKeyResponse = ''

  switch (provider) {
    case 's3': {
      if (
        !S3NumberOfChunks ||
        !S3PreSignedURLs ||
        !S3UploadId ||
        !S3UploadKey
      ) {
        throw new Error(
          'Unable to upload cache to S3. One of the following required parameters is missing: numberOfChunks, preSignedURLs, uploadId, uploadKey.'
        )
      }

      // Number of chunks should match the number of pre-signed URLs
      if (S3NumberOfChunks !== S3PreSignedURLs.length) {
        throw new Error(
          `Number of chunks (${S3NumberOfChunks}) should match the number of pre-signed URLs (${S3PreSignedURLs.length}).`
        )
      }

      core.debug('Uploading cache')
      const completedParts = await uploadFileToS3(S3PreSignedURLs, archivePath)

      // Sort parts in ascending order by partNumber
      completedParts.sort((a, b) => a.PartNumber - b.PartNumber)

      core.debug('Committing cache')
      commitCacheResponse = await commitCache(
        cacheKey,
        cacheVersion,
        S3UploadKey,
        S3UploadId,
        completedParts
      )

      cacheKeyResponse = commitCacheResponse.result?.s3?.cache_key ?? ''

      break
    }

    case 'gcs': {
      if (!GCSBucketName || !GCSObjectName || !GCSAuthToken) {
        throw new Error(
          'Unable to upload cache to GCS. One of the following required parameters is missing: GCSBucketName, GCSObjectName, GCSAuthToken.'
        )
      }

      core.debug('Uploading cache')
      const storage = new Storage({
        token: GCSAuthToken
      })
      await multiPartUploadToGCS(
        storage,
        archivePath,
        GCSBucketName,
        GCSObjectName
      )

      core.debug('Committing cache')
      commitCacheResponse = await commitCache(cacheKey, cacheVersion)

      cacheKeyResponse = commitCacheResponse.result?.gcs?.cache_key ?? ''
      break
    }
  }

  if (!isSuccessStatusCode(commitCacheResponse.statusCode)) {
    throw new Error(
      `Cache service responded with ${commitCacheResponse.statusCode} during commit cache.`
    )
  }

  core.info('Cache saved successfully')
  return cacheKeyResponse
}

export async function deleteCache(keys: string[]) {
  const httpClient = createHttpClient()
  const resource = `cache?keys=${encodeURIComponent(keys.join(','))}`
  const response = await httpClient.del(getCacheApiUrl(resource))
  if (!isSuccessStatusCode(response.message.statusCode)) {
    throw new Error(
      `Cache service responded with ${response.message.statusCode}`
    )
  }
}