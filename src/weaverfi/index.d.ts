import { ChainFunctions, ETHChainFunctions } from './chain-functions';
import type { Address, UpperCaseChain } from './types';
export declare const WeaverFi: {
    ETH: ETHChainFunctions;
    BSC: ChainFunctions;
    POLY: ChainFunctions;
    FTM: ChainFunctions;
    AVAX: ChainFunctions;
    CRONOS: ChainFunctions;
    OP: ChainFunctions;
    ARB: ChainFunctions;
    /**
     * Function to get all supported chains.
     * @returns An array of all supported chain abbreviations.
     */
    getAllChains: () => UpperCaseChain[];
    /**
     * Function to fetch information from all supported chains.
     * @returns A record of chain information in JSON format.
     */
    getAllChainInfo: () => Record<import("./types").Chain, import("./types").ChainData>;
    /**
     * Function to get a list of all supported projects.
     * @returns A record of project name arrays for each chain.
     */
    getAllProjects: () => Record<import("./types").Chain, string[]>;
    /**
     * Function to get a list of all tracked tokens on all chains.
     * @returns A record of arrays of tracked tokens on every chain.
     */
    getAllTokens: () => Record<import("./types").Chain, import("./types").TokenData[]>;
    /**
     * Function to populate the `prices` object with all tracked tokens' prices.
     * @returns Current state of the `prices` object post-update.
     */
    getAllTokenPrices: () => Promise<Record<import("./types").Chain, import("./types").TokenPriceData[]>>;
    /**
     * Function to populate the `prices` object with all native tokens' prices.
     * @returns Current state of the `prices` object post-update.
     */
    getNativeTokenPrices: () => Promise<Record<import("./types").Chain, import("./types").TokenPriceData[]>>;
    /**
     * Function to fetch all previously queried token prices.
     * @returns Current state of the `prices` object for all chains.
     */
    fetchPrices: () => Record<import("./types").Chain, import("./types").TokenPriceData[]>;
    /**
     * Function to fetch all balances for a given wallet, including in their wallets and in dapps/projects.
     * @param wallet The wallet to query balances for.
     * @returns A wallet's token, project and NFT balances.
     */
    getAllBalances: (wallet: Address) => Promise<(import("./types").NativeToken | import("./types").Token | import("./types").LPToken | import("./types").DebtToken | import("./types").XToken | import("./types").NFT)[]>;
};
export default WeaverFi;
