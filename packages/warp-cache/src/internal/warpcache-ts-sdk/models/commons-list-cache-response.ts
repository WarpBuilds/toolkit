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
import { CommonsCacheEntryWithStat } from './commons-cache-entry-with-stat';

/**
 * 
 * @export
 * @interface CommonsListCacheResponse
 */
export interface CommonsListCacheResponse {
    /**
     * 
     * @type {Array<CommonsCacheEntryWithStat>}
     * @memberof CommonsListCacheResponse
     */
    'cache_entries_with_stat'?: Array<CommonsCacheEntryWithStat>;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof CommonsListCacheResponse
     */
    'sortable_fields'?: { [key: string]: string; };
    /**
     * 
     * @type {number}
     * @memberof CommonsListCacheResponse
     */
    'total_entries'?: number;
    /**
     * 
     * @type {number}
     * @memberof CommonsListCacheResponse
     */
    'total_pages'?: number;
    /**
     * 
     * @type {Array<string>}
     * @memberof CommonsListCacheResponse
     */
    'unique_vcs_refs'?: Array<string>;
}
