import type { Address, Token, LPToken, XToken } from '../../types';
export declare const get: (wallet: Address) => Promise<(Token | LPToken | XToken)[]>;
export declare const getFarmBalances: (wallet: Address, farms: Address[], ratio: number) => Promise<(Token | LPToken)[]>;
export declare const getDualFarmBalances: (wallet: Address, dualFarms: Address[], ratio: number) => Promise<(Token | LPToken)[]>;
export declare const getStakedQUICK: (wallet: Address, ratio: number) => Promise<XToken[]>;
