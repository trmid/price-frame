import type { Address, Chain, TokenPriceData } from './types';
export declare let prices: Record<Chain, TokenPriceData[]>;
/**
 * Function to populate the `prices` object with all tracked tokens' prices.
 * @returns Current state of the `prices` object post-update.
 */
export declare const getAllTokenPrices: () => Promise<Record<Chain, TokenPriceData[]>>;
/**
 * Function to populate the `prices` object with all tracked tokens' prices in one chain.
 * @param chain - The blockchain to query tokens' prices for.
 * @returns Current state of the `prices` object post-update, including only the selected chain.
 */
export declare const getChainTokenPrices: (chain: Chain) => Promise<TokenPriceData[]>;
/**
 * Function to populate the `prices` object with all native tokens' prices.
 * @returns Current state of the `prices` object post-update.
 */
export declare const getNativeTokenPrices: () => Promise<Record<Chain, TokenPriceData[]>>;
/**
 * Function to get a token's current price by checking all price sources sequentially until a value is found.
 * @param chain - The blockchain in which the given token is in.
 * @param address - The token's address.
 * @param decimals - The token's decimals.
 * @returns The token's price (also updates the `prices` object).
 */
export declare const getTokenPrice: (chain: Chain, address: Address, decimals?: number) => Promise<number>;
/**
 * Function to check a previously queried token's price.
 * @param chain - The blockchain in which the given token is in.
 * @param address - The token's address.
 * @returns The token's price if previously queried, else undefined.
 */
export declare const checkTokenPrice: (chain: Chain, address: Address) => TokenPriceData | undefined;
/**
 * Function to query token prices from CoinGecko, and update the `prices` object.
 * @param chain - The blockchain in which the tokens are in.
 * @param addresses - The tokens' addresses.
 */
export declare const queryCoinGeckoPrices: (chain: Chain, addresses: Address[]) => Promise<void>;
/**
 * Function to query a token's price from 1Inch, and update the `prices` object.
 * @param chain - The blockchain in which the token is in.
 * @param address - The token's address.
 * @param decimals - The token's decimals.
 */
export declare const query1InchPrice: (chain: Chain, address: Address, decimals: number) => Promise<void>;
/**
 * Function to query a token's price from ParaSwap, and update the `prices` object.
 * @param chain - The blockchain in which the token is in.
 * @param address - The token's address.
 * @param decimals - The token's decimals.
 */
export declare const queryParaSwapPrice: (chain: Chain, address: Address, decimals: number) => Promise<void>;
/**
 * Function to update the `prices` object with a token's newly queried price.
 * @param chain - The blockchain in which the token is in.
 * @param priceData - The token's new price data.
 */
export declare const updatePrices: (chain: Chain, priceData: TokenPriceData) => void;
