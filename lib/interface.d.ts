export interface IPResponse {
    country: string;
    countryCode: string;
    region: string;
    regionCode: string;
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

export declare function getPropertyByPath(obj: any, path: string): any | null;

export declare function validateIp(ip: string): boolean;

export declare function normalise(res: GenericResponse): IPResponse;
