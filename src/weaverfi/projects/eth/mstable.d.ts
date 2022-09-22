import type { Address, Token, LPToken, XToken } from '../../types';
export declare const get: (wallet: Address) => Promise<(Token | LPToken | XToken)[]>;
export declare const getAssetBalances: (wallet: Address) => Promise<Token[]>;
export declare const getPoolBalances: (wallet: Address) => Promise<Token[]>;
export declare const getVaultBalances: (wallet: Address) => Promise<Token[]>;
export declare const getStaked: (wallet: Address) => Promise<(Token | LPToken | XToken)[]>;
