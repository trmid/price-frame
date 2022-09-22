import type { Address, Token, LPToken, XToken, SnowballAPIResponse } from '../../types';
export declare const get: (wallet: Address) => Promise<(Token | LPToken | XToken)[]>;
export declare const getFarmBalances: (farms: SnowballAPIResponse[], wallet: Address) => Promise<(Token | LPToken)[]>;
export declare const getStakedSNOB: (wallet: Address) => Promise<XToken[]>;
