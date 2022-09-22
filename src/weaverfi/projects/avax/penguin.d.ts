import type { Address, Token, LPToken, XToken } from '../../types';
export declare const get: (wallet: Address) => Promise<(Token | LPToken | XToken)[]>;
export declare const getIglooBalances: (wallet: Address) => Promise<(Token | LPToken)[]>;
export declare const getStakedPEFI: (wallet: Address) => Promise<XToken[]>;
export declare const getClubPenguinBalance: (wallet: Address) => Promise<XToken[]>;
