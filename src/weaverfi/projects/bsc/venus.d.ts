import type { Address, Token, DebtToken } from '../../types';
export declare const get: (wallet: Address) => Promise<(Token | DebtToken)[]>;
export declare const getMarketBalances: (wallet: Address) => Promise<(Token | DebtToken)[]>;
export declare const getPendingRewards: (wallet: Address) => Promise<Token[]>;
export declare const getStakedVAI: (wallet: Address) => Promise<Token[]>;
export declare const getStakedXVS: (wallet: Address) => Promise<Token[]>;
