import type { Address, Token, LPToken, XToken } from '../../types';
export declare const get: (wallet: Address) => Promise<(Token | LPToken | XToken)[]>;
export declare const getPoolBalances: (wallet: Address) => Promise<(Token | LPToken)[]>;
export declare const getPoolBalancesV2: (wallet: Address) => Promise<Token[]>;
export declare const getStakedAXIAL: (wallet: Address) => Promise<XToken[]>;
