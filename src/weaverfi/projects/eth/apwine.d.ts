import type { Address, Token, LPToken, XToken } from '../../types';
export declare const get: (wallet: Address) => Promise<(Token | LPToken | XToken)[]>;
export declare const getStakedAPW: (wallet: Address) => Promise<XToken[]>;
export declare const getFutureBalances: (wallet: Address) => Promise<(Token | LPToken)[]>;
