import type { Address, Token } from '../../types';
export declare const get: (wallet: Address) => Promise<Token[]>;
export declare const getPoolBalanceV4: (wallet: Address) => Promise<Token[]>;
export declare const getCommunityPoolBalance: (wallet: Address) => Promise<Token[]>;
