import type { Address, Token, LPToken } from '../../types';
export declare const get: (wallet: Address) => Promise<(Token | LPToken)[]>;
export declare const getPoolBalances: (wallet: Address) => Promise<(Token | LPToken)[]>;
export declare const getCryptoPoolBalances: (wallet: Address) => Promise<(Token | LPToken)[]>;
export declare const getFactoryPoolBalances: (wallet: Address) => Promise<(Token | LPToken)[]>;
export declare const getGaugeFactoryPoolBalances: (wallet: Address) => Promise<(Token | LPToken)[]>;
