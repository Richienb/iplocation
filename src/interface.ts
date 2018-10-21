const ipRegex = require("ip-regex");

export interface IPResponse {
    country: string;
    region: string;
    city: string;
    postal: string;
    ip: string;
    latitude: number;
    longitude: number;
    timezone: string;
    __latlon: string;
}

export interface GenericResponse {
    [key: string]: string | number;
}

const keys: { [key: string]: string[]; } = {
    country: ["country.name", "country.code", "country_name", "country"],
    region: ["region", "region_code"],
    city: ["city"],
    postal: ["postal"],
    ip: ["ip"],
    latitude: ["location.latitude", "latitude", "lat"],
    longitude: ["location.longitude", "longitude", "lon"],
    timezone: ["location.timezone", "timezone"],
    __latlon: ["loc"]
};

export function getPropertyByPath (obj: any, path: string): any | null {
    const parts = path.split(".");
    let currentValue = obj;

    for (const part of parts) {
        if (currentValue[part]) {
            currentValue = currentValue[part];
        } else {
            return null;
        }
    }

    return currentValue;
}

export function validateIp (ip: string): boolean {
    return !ip || !ipRegex().test(ip);
}

export function normalise (res: GenericResponse): IPResponse {
    const output: any = {};

    for (const outputKey in keys) {
        const keysToFind: string[] = keys[outputKey];
        output[outputKey] = "";

        for (const key of keysToFind) {
            if (key.includes(".") && getPropertyByPath(res, key)) {
                output[outputKey] = getPropertyByPath(res, key);
                break;
            } else if (res[key]) {
                output[outputKey] = res[key];
                break;
            }
        }
    }

    if ((!output.latitude || !output.longitude) && output.__latlon) {
        if (output.__latlon.includes(",")) {
            const [lat, lon] = output.__latlon.split(",");
            output.latitude = lat;
            output.longitude = lon;
        }
    }

    output.latitude = +output.latitude || null;
    output.longitude = +output.longitude || null;

    for (const key in output) {
        if (key.startsWith("__")) {
            delete output[key];
        }
    }

    return output;
}

