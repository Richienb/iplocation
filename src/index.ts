import debug from "debug";
import request from "request";

import { normalise, validateIp, IPResponse } from "./interface";

const defaultProviders: string[] = [
    "https://ipapi.co/*/json/",
    "https://ipinfo.io/*"
];

const log = debug("iplocation");

class InvalidIPError extends Error {
    constructor() {
        super();
        this.message = "Invalid IP address.";
    }
}

class ProviderError extends Error {
    constructor() {
        super();
        this.message = "All providers failed.";
    }
}

interface Callback {
    (err: InvalidIPError | ProviderError, res: IPResponse | null): void;
}

export default function(
    ip: string,
    additionalProviders?: string[],
    callback?: Callback
): Promise<IPResponse | InvalidIPError | ProviderError | Error> | void {
    const providers: string[] = (additionalProviders || [])
        .concat(defaultProviders);

    if (validateIp(ip)) {
        return callback
            ? callback(new InvalidIPError(), null)
            : Promise.reject(new InvalidIPError());
    }

    function retry(i: number, callback: Callback) {
        if (!providers[i]) {
            return callback(new ProviderError(), null);
        }

        const url = providers[i].replace("*", ip || "");

        log("trying: " + url);

        request.get(url, {withCredentials: false}, (err, response, body) => {
            let json;

            try {
                log("got: " + body);
                json = JSON.parse(body);
                if (json.error) {
                    return retry(++i, callback);
                }
            } catch (ex) {
                return retry(++i, callback);
            }

            const normalised = normalise(json);
            log("returned: ", normalised);
            return callback(err, normalised);
        });
    }

    if (callback) {
        retry(0, callback);
    } else {
        return new Promise((resolve, reject) => {
            retry(0, (err, res) => {
                if (err) return reject(err);
                resolve(res);
            });
        });
    }
}

