import type { Address, Token, LPToken, XToken } from '../../types';
export declare const get: (wallet: Address) => Promise<(Token | LPToken | XToken)[]>;
export declare const getVaultBalances: (wallet: Address) => Promise<(Token | LPToken | XToken)[]>;
export declare const getAutoVaultBalance: (wallet: Address) => Promise<Token[]>;
