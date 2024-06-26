/* tslint:disable */
/* eslint-disable */
/**
 * WarpCache
 * Caching server for WarpBuild
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: suppport@warpbuild.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import { CommonsShortLivedToken } from './commons-short-lived-token';

/**
 * 
 * @export
 * @interface CommonsGCSCommitCacheResponse
 */
export interface CommonsGCSCommitCacheResponse {
    /**
     * 
     * @type {string}
     * @memberof CommonsGCSCommitCacheResponse
     */
    'bucket_name'?: string;
    /**
     * CacheKey is the resolved cache key which might contain some prefix or suffix in addition to the cache key provided by the user. This is the actual storage location in gcs.
     * @type {string}
     * @memberof CommonsGCSCommitCacheResponse
     */
    'cache_key': string;
    /**
     * Method contains the auth method to be used to connect to the GCP storage backend
     * @type {string}
     * @memberof CommonsGCSCommitCacheResponse
     */
    'method'?: string;
    /**
     * 
     * @type {string}
     * @memberof CommonsGCSCommitCacheResponse
     */
    'project_id'?: string;
    /**
     * 
     * @type {CommonsShortLivedToken}
     * @memberof CommonsGCSCommitCacheResponse
     */
    'short_lived_token'?: CommonsShortLivedToken;
}

