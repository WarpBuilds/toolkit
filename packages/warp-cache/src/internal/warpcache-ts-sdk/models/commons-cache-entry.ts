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
 * @interface CommonsCacheEntry
 */
export interface CommonsCacheEntry {
    /**
     * 
     * @type {string}
     * @memberof CommonsCacheEntry
     */
    'cache_key'?: string;
    /**
     * 
     * @type {string}
     * @memberof CommonsCacheEntry
     */
    'cache_user_given_key'?: string;
    /**
     * 
     * @type {string}
     * @memberof CommonsCacheEntry
     */
    'cache_version'?: string;
    /**
     * 
     * @type {string}
     * @memberof CommonsCacheEntry
     */
    'created_at'?: string;
    /**
     * 
     * @type {string}
     * @memberof CommonsCacheEntry
     */
    'id'?: string;
    /**
     * 
     * @type {CommonsCacheEntryMetadata}
     * @memberof CommonsCacheEntry
     */
    'metadata'?: CommonsCacheEntryMetadata;
    /**
     * 
     * @type {string}
     * @memberof CommonsCacheEntry
     */
    'organization_id'?: string;
    /**
     * 
     * @type {string}
     * @memberof CommonsCacheEntry
     */
    'provider'?: string;
    /**
     * 
     * @type {string}
     * @memberof CommonsCacheEntry
     */
    'storage_backend_id'?: string;
    /**
     * 
     * @type {string}
     * @memberof CommonsCacheEntry
     */
    'storage_backend_location'?: string;
    /**
     * 
     * @type {string}
     * @memberof CommonsCacheEntry
     */
    'updated_at'?: string;
    /**
     * 
     * @type {string}
     * @memberof CommonsCacheEntry
     */
    'vcs_organization_name'?: string;
    /**
     * 
     * @type {string}
     * @memberof CommonsCacheEntry
     */
    'vcs_ref'?: string;
    /**
     * 
     * @type {string}
     * @memberof CommonsCacheEntry
     */
    'vcs_repository_name'?: string;
}

