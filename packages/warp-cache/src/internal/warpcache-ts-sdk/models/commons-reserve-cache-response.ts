/* tslint:disable */
/* eslint-disable */
/**
 * 
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


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
