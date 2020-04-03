import debug from "debug";
import ky from "ky-universal";

import { normalise, validateIp, IPResponse, GenericResponse } from "./interface";

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

        ky(url).json()
            .then((data: GenericResponse) => {
                if (data.error) {
                    return retry(++i, callback);
                }

                const normalised = normalise(data);
                log("returned: ", normalised);
                return callback(undefined, normalised);
            })
            .catch((error) => callback(error, undefined))
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

