import type { Address, Token, LPToken } from '../../types';
export declare const get: (wallet: Address) => Promise<(Token | LPToken)[]>;
export declare const getFarmBalances: (wallet: Address) => Promise<(Token | LPToken)[]>;
export declare const getFarmBalancesV2: (wallet: Address) => Promise<(Token | LPToken)[]>;
export declare const getAutoCakePoolBalance: (wallet: Address) => Promise<Token[]>;
