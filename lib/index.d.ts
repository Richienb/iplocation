import { IPResponse } from "./interface";

declare class InvalidIPError extends Error {
    constructor();
}

declare class ProviderError extends Error {
    constructor();
}

interface Callback {
    (err: InvalidIPError | ProviderError, res: IPResponse | null): void;
}

export default function (
    ip: string,
    additionalProviders?: string[]
): Promise<IPResponse>;

export default function (
    ip: string,
    additionalProviders: string[],
    callback: Callback
): void;

export {};
