import type { Address, Token, LPToken, XToken, MoonPotAPIResponse } from '../../types';
export declare const get: (wallet: Address) => Promise<(Token | LPToken | XToken)[]>;
export declare const getPotBalances: (wallet: Address, pots: MoonPotAPIResponse[]) => Promise<(Token | LPToken | XToken)[]>;
