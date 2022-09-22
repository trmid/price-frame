import type { Address, Token, LPToken, DebtToken, XToken } from '../../types';
export declare const get: (wallet: Address) => Promise<(Token | LPToken | DebtToken | XToken)[]>;
export declare const getStakedJOE: (wallet: Address) => Promise<XToken[]>;
export declare const getFarmV2Balances: (wallet: Address) => Promise<(Token | LPToken | XToken)[]>;
export declare const getFarmV3Balances: (wallet: Address) => Promise<(Token | LPToken | XToken)[]>;
export declare const getBoostedFarmBalances: (wallet: Address) => Promise<(Token | LPToken | XToken)[]>;
export declare const getMarketBalances: (wallet: Address) => Promise<(Token | DebtToken)[]>;
