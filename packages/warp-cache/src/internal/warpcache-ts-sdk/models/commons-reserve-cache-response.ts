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
import { CommonsAzureBlobReserveCacheResponse } from './commons-azure-blob-reserve-cache-response';
// May contain unused imports in some cases
// @ts-ignore
import { CommonsGCSReserveCacheResponse } from './commons-gcsreserve-cache-response';
// May contain unused imports in some cases
// @ts-ignore
import { CommonsS3ReserveCacheResponse } from './commons-s3-reserve-cache-response';

/**
 * 
 * @export
 * @interface CommonsReserveCacheResponse
 */
export interface CommonsReserveCacheResponse {
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof CommonsReserveCacheResponse
     */
    'annotations'?: { [key: string]: string; };
    /**
     * 
     * @type {CommonsAzureBlobReserveCacheResponse}
     * @memberof CommonsReserveCacheResponse
     */
    'azure_blob'?: CommonsAzureBlobReserveCacheResponse;
    /**
     * 
     * @type {CommonsGCSReserveCacheResponse}
     * @memberof CommonsReserveCacheResponse
     */
    'gcs'?: CommonsGCSReserveCacheResponse;
    /**
     * 
     * @type {string}
     * @memberof CommonsReserveCacheResponse
     */
    'provider'?: string;
    /**
     * 
     * @type {CommonsS3ReserveCacheResponse}
     * @memberof CommonsReserveCacheResponse
     */
    's3'?: CommonsS3ReserveCacheResponse;
}
