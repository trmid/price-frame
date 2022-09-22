import type { Address, Token } from '../../types';
export declare const get: (wallet: Address) => Promise<Token[]>;
export declare const getUserStakeV2: (wallet: Address) => Promise<Token[]>;
export declare const getUserRewardsV2: (wallet: Address) => Promise<Token[]>;
