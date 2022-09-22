import type { Address, Token, LPToken } from '../../types';
export declare const get: (wallet: Address) => Promise<(Token | LPToken)[]>;
export declare const getFarmBalances: (wallet: Address) => Promise<(Token | LPToken)[]>;
export declare const getAutoLYDFarmBalance: (wallet: Address) => Promise<Token[]>;
export declare const getMaximusFarmBalances: (wallet: Address) => Promise<(Token | LPToken)[]>;
