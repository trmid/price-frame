import type { Address, Token, LPToken, BeefyAPIResponse } from '../../types';
export declare const get: (wallet: Address) => Promise<(Token | LPToken)[]>;
export declare const getVaultBalances: (wallet: Address, vaults: BeefyAPIResponse[], apys: Record<string, number | null>) => Promise<(Token | LPToken)[]>;
export declare const getStakedBIFI: (wallet: Address) => Promise<Token[]>;
