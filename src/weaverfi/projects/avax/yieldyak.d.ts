import type { Address, Token, LPToken, YieldYakAPIResponse } from '../../types';
export declare const get: (wallet: Address) => Promise<(Token | LPToken)[]>;
export declare const getFarmBalances: (wallet: Address, farms: Record<Address, YieldYakAPIResponse>) => Promise<(Token | LPToken)[]>;
export declare const getStakedYAK: (wallet: Address) => Promise<Token[]>;
