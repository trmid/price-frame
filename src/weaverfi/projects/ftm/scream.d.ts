import type { Address, Token, DebtToken, XToken } from '../../types';
export declare const get: (wallet: Address) => Promise<(Token | DebtToken | XToken)[]>;
export declare const getMarketBalances: (wallet: Address) => Promise<(Token | DebtToken)[]>;
export declare const getStakedSCREAM: (wallet: Address) => Promise<XToken[]>;
