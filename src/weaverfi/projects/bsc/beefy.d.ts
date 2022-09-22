import type { Address, Token, LPToken, XToken, BeefyAPIResponse } from '../../types';
export declare const get: (wallet: Address) => Promise<(Token | LPToken | XToken)[]>;
export declare const getVaultBalances: (wallet: Address, vaults: BeefyAPIResponse[], apys: Record<string, number | null>) => Promise<(Token | LPToken | XToken)[]>;
export declare const getStakedBIFI: (wallet: Address) => Promise<Token[]>;
