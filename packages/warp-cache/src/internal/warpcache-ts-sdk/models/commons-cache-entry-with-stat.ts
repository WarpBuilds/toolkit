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
import { CommonsCacheEntryMetadata } from './commons-cache-entry-metadata';

/**
 * 
 * @export
 * @interface CommonsCacheEntryWithStat
 */
export interface CommonsCacheEntryWithStat {
    /**
     * 
     * @type {string}
     * @memberof CommonsCacheEntryWithStat
     */
    'cache_key'?: string;
    /**
     * 
     * @type {string}
     * @memberof CommonsCacheEntryWithStat
     */
    'cache_user_given_key'?: string;
    /**
     * 
     * @type {string}
     * @memberof CommonsCacheEntryWithStat
     */
    'cache_version'?: string;
    /**
     * 
     * @type {string}
     * @memberof CommonsCacheEntryWithStat
     */
    'created_at'?: string;
    /**
     * 
     * @type {string}
     * @memberof CommonsCacheEntryWithStat
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof CommonsCacheEntryWithStat
     */
    'last_used_at'?: string;
    /**
     * 
     * @type {CommonsCacheEntryMetadata}
     * @memberof CommonsCacheEntryWithStat
     */
    'metadata'?: CommonsCacheEntryMetadata;
    /**
     * 
     * @type {string}
     * @memberof CommonsCacheEntryWithStat
     */
    'organization_id'?: string;
    /**
     * 
     * @type {string}
     * @memberof CommonsCacheEntryWithStat
     */
    'provider'?: string;
    /**
     * 
     * @type {number}
     * @memberof CommonsCacheEntryWithStat
     */
    'size'?: number;
    /**
     * 
     * @type {string}
     * @memberof CommonsCacheEntryWithStat
     */
    'storage_backend_id'?: string;
    /**
     * 
     * @type {string}
     * @memberof CommonsCacheEntryWithStat
     */
    'storage_backend_location'?: string;
    /**
     * 
     * @type {string}
     * @memberof CommonsCacheEntryWithStat
     */
    'updated_at'?: string;
    /**
     * 
     * @type {string}
     * @memberof CommonsCacheEntryWithStat
     */
    'vcs_organization_name'?: string;
    /**
     * 
     * @type {string}
     * @memberof CommonsCacheEntryWithStat
     */
    'vcs_ref'?: string;
    /**
     * 
     * @type {string}
     * @memberof CommonsCacheEntryWithStat
     */
    'vcs_repository_name'?: string;
}
