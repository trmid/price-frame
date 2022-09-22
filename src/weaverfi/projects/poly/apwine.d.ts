import type { Address, Token, LPToken } from '../../types';
export declare const get: (wallet: Address) => Promise<(Token | LPToken)[]>;
export declare const getFutureBalances: (wallet: Address) => Promise<(Token | LPToken)[]>;
