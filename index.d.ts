/**
 * Anonymous-Request
 * @param url URL to send GET request.
 * @param config Request config.
 * @returns Response body.
 */
declare function AnonymousRequest(url: string, config?: Config): Promise<string>

/** Request config. */
declare interface Config {

    /** Request timeout. ( By default: 10000 ) */
    timeout?: number;

    /** Number of request attempts. ( By default: 3 ) */
    attempts?: number;

    /** Response encoding. ( By default: "utf8" ) */
    encoding?: string;

    /** Log details of the request. ( By default: false )  */
    log?: boolean;
}

export default AnonymousRequest;
