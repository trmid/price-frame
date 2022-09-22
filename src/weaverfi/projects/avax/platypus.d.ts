import type { Address, Token, XToken } from '../../types';
export declare const get: (wallet: Address) => Promise<(Token | XToken)[]>;
export declare const getStakedPTP: (wallet: Address) => Promise<XToken[]>;
export declare const getPoolBalances: (wallet: Address) => Promise<Token[]>;
export declare const getFactoryPoolBalances: (wallet: Address) => Promise<Token[]>;
