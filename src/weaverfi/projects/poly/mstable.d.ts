import type { Address, Token } from '../../types';
export declare const get: (wallet: Address) => Promise<Token[]>;
export declare const getAssetBalances: (wallet: Address) => Promise<Token[]>;
export declare const getPoolBalances: (wallet: Address) => Promise<Token[]>;
