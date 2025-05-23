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
 * @interface CommonsGCSGetCacheResponse
 */
export interface CommonsGCSGetCacheResponse {
    /**
     * 
     * @type {string}
     * @memberof CommonsGCSGetCacheResponse
     */
    'bucket_name'?: string;
    /**
     * 
     * @type {string}
     * @memberof CommonsGCSGetCacheResponse
     */
    'cache_key'?: string;
    /**
     * 
     * @type {string}
     * @memberof CommonsGCSGetCacheResponse
     */
    'cache_version'?: string;
    /**
     * Method contains the auth method to be used to connect to the GCP storage backend
     * @type {string}
     * @memberof CommonsGCSGetCacheResponse
     */
    'method'?: string;
    /**
     * 
     * @type {string}
     * @memberof CommonsGCSGetCacheResponse
     */
    'pre_signed_url'?: string;
    /**
     * 
     * @type {string}
     * @memberof CommonsGCSGetCacheResponse
     */
    'project_id'?: string;
    /**
     * 
     * @type {CommonsShortLivedToken}
     * @memberof CommonsGCSGetCacheResponse
     */
    'short_lived_token'?: CommonsShortLivedToken;
}

