import type { Address, Token, LPToken } from '../../types';
export declare const get: (wallet: Address) => Promise<(Token | LPToken)[]>;
export declare const getStakedXAVA: (wallet: Address) => Promise<Token[]>;
export declare const getStakedLP: (wallet: Address) => Promise<(Token | LPToken)[]>;
