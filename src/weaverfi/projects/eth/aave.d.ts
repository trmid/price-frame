import type { Address, Token, LPToken, DebtToken, XToken, AaveAPIResponse } from '../../types';
export declare const get: (wallet: Address) => Promise<(Token | LPToken | DebtToken | XToken)[]>;
export declare const getMarketBalances: (markets: AaveAPIResponse[], wallet: Address) => Promise<(Token | DebtToken)[]>;
export declare const getIncentives: (wallet: Address) => Promise<Token[]>;
export declare const getStakedAAVE: (wallet: Address) => Promise<XToken[]>;
export declare const getStakedLP: (wallet: Address) => Promise<LPToken[]>;
