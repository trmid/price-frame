import type { Address, Token, LPToken, XToken } from '../../types';
export declare const get: (wallet: Address) => Promise<(Token | LPToken | XToken)[]>;
export declare const getPoolBalances: (wallet: Address) => Promise<LPToken[]>;
export declare const getFarmBalances: (wallet: Address) => Promise<(Token | LPToken | XToken)[]>;
export declare const getStakedGTR: (wallet: Address) => Promise<XToken[]>;
