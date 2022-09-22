import type { Address, Token, LPToken } from '../../types';
export declare const get: (wallet: Address) => Promise<(Token | LPToken)[]>;
export declare const getPoolBalances: (wallet: Address) => Promise<(Token | LPToken)[]>;
export declare const getStakedBalances: (wallet: Address) => Promise<(Token | LPToken)[]>;
