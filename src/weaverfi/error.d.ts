import type { Chain } from './types';
export declare class WeaverError extends Error {
    chain: Chain;
    project: string | null;
    description: string;
    sourceError?: unknown;
    isWeaverError: boolean;
    constructor(chain: Chain, project: string | null, description: string, sourceError?: unknown);
}
