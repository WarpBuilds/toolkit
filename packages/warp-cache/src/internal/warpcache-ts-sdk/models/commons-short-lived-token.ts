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



/**
 * 
 * @export
 * @interface CommonsShortLivedToken
 */
export interface CommonsShortLivedToken {
    /**
     * AccessToken contains the short lived access token to be used to connect to the GCP storage backend
     * @type {string}
     * @memberof CommonsShortLivedToken
     */
    'access_token'?: string;
    /**
     * ExpiresAt contains the expiry time of the short lived access token format: date-time
     * @type {string}
     * @memberof CommonsShortLivedToken
     */
    'expires_at'?: string;
}

