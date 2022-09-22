import type { Address, Token, LPToken } from '../../types';
export declare const get: (wallet: Address) => Promise<(Token | LPToken)[]>;
export declare const getFarmBalances: (wallet: Address) => Promise<(Token | LPToken)[]>;
export declare const getFarmV2Balances: (wallet: Address) => Promise<(Token | LPToken)[]>;
