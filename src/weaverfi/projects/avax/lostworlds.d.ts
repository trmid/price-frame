import type { Address, Token } from '../../types';
export declare const get: (wallet: Address) => Promise<Token[]>;
export declare const getStakedLOST: (wallet: Address) => Promise<Token[]>;
