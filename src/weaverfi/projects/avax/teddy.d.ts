import type { Address, Token, DebtToken } from '../../types';
export declare const get: (wallet: Address) => Promise<(Token | DebtToken)[]>;
export declare const getTroveBalance: (wallet: Address) => Promise<(Token | DebtToken)[]>;
export declare const getStabilityPoolBalance: (wallet: Address) => Promise<Token[]>;
export declare const getStakedTEDDY: (wallet: Address) => Promise<Token[]>;
