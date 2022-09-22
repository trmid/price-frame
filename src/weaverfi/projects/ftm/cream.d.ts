import type { Address, Token, DebtToken } from '../../types';
export declare const get: (wallet: Address) => Promise<(Token | DebtToken)[]>;
export declare const getMarketBalances: (wallet: Address) => Promise<(Token | DebtToken)[]>;
