import type { Chain, Address, TokenPriceData, ABI, ENSDomain } from './types';
export declare class ChainFunctions {
    private chain;
    constructor(chain: Chain);
    /**
     * Function to make blockchain queries.
     * @param address The contract's address to query.
     * @param abi The contract's ABI.
     * @param method The method to be called from the contract.
     * @param args Any arguments to pass to the method called.
     * @param block - The block height from which to query info from. (Optional)
     * @returns Query results.
     */
    query(address: Address, abi: ABI, method: string, args: any[], block?: number): Promise<any>;
    /**
     * Function to query blocks for events on a given contract.
     * @param address - The contract's address to query.
     * @param abi - The contract's ABI.
     * @param event - The event name to query for.
     * @param querySize - The limit to how many blocks should be queried in each batch.
     * @param args - Any arguments to pass to the event filter.
     * @param startBlock - The block to start querying from. (Optional)
     * @param endBlock - The block to stop querying at. (Optional)
     * @returns Array of events.
     */
    queryBlocks(address: Address, abi: ABI, event: string, querySize: number, args: any[], startBlock?: number, endBlock?: number): Promise<import("ethers").Event[]>;
    /**
     * Function to check if a hash corresponds to a valid wallet/contract address.
     * @param address The hash to check for validity.
     * @returns True or false, depending on if the hash is a valid address or not.
     */
    isAddress(address: Address): boolean;
    /**
     * Function to get a wallet's transaction count.
     * @param wallet The wallet to query transaction count for.
     * @returns A number of transactions.
     */
    getTXCount(wallet: Address): Promise<number>;
    /**
     * Function to fetch a wallet's token balances.
     * @param wallet The wallet to query balances for.
     * @returns All native and token balances for the specified wallet.
     */
    getWalletBalance(wallet: Address): Promise<(import("./types").NativeToken | import("./types").Token)[]>;
    /**
     * Function to fetch project balances for a given wallet.
     * @param wallet The wallet to query balances for.
     * @param project The project/dapp to query for balances in.
     * @returns A wallet's balance on the specified project/dapp.
     */
    getProjectBalance(wallet: Address, project: string): Promise<(import("./types").NativeToken | import("./types").Token | import("./types").LPToken | import("./types").DebtToken | import("./types").XToken)[]>;
    /**
     * Function to fetch all project balances for a given wallet.
     * @param wallet The wallet to query balances for.
     * @returns A wallet's balance on all projects/dapps.
     */
    getAllProjectBalances(wallet: Address): Promise<(import("./types").NativeToken | import("./types").Token | import("./types").LPToken | import("./types").DebtToken | import("./types").XToken)[]>;
    /**
     * Function to get a wallet's NFT balance.
     * @param wallet The wallet to query NFT balances for.
     * @returns An array of NFT objects if any balances are found.
     */
    getNFTBalance(wallet: Address): Promise<import("./types").NFT[]>;
    /**
     * Function to get a list of all tracked tokens.
     * @returns An array of all tracked tokens.
     */
    getTokens(): import("./types").TokenData[];
    /**
     * Function to get a token's logo.
     * @param symbol The token's symbol.
     * @returns The token logo if available, else a generic coin logo.
     */
    getTokenLogo(symbol: string): `https://${string}`;
    /**
     * Function to get gas estimates for TXs.
     * @returns The gas price, token price and gas estimates for various TX types.
     */
    getGasEstimates(): Promise<{
        gasPrice: number;
        tokenPrice: number;
        estimates: Record<string, {
            gas: number;
            cost: number;
        }>;
        ethGasPrice?: number | undefined;
        ethTokenPrice?: number | undefined;
    }>;
    /**
     * Function to fetch some chain information.
     * @returns Some chain data in JSON format.
     */
    getInfo(): import("./types").ChainData;
    /**
     * Function to fetch the list of projects available.
     * @returns An array of project names.
     */
    getProjects(): string[];
    /**
     * Function to populate the `prices` object with token prices.
     * @returns Current state of the `prices` object post-update.
     */
    getTokenPrices(): Promise<TokenPriceData[]>;
    /**
     * Function to get a token's current price.
     * @param address The token's address.
     * @param decimals The token's decimals.
     * @returns The token's price (also updates the `prices` object).
     */
    getTokenPrice(address: Address, decimals?: number): Promise<number>;
    /**
     * Function to update the `prices` object with a token's newly queried price.
     * @param priceData The token's new price data.
     */
    updateTokenPrice(priceData: TokenPriceData): void;
    /**
     * Function to fetch all previously queried token prices.
     * @returns Current state of the `prices` object.
     */
    fetchPrices(): TokenPriceData[];
}
export declare class ETHChainFunctions extends ChainFunctions {
    /**
     * Function to resolve an ENS domain name into an address.
     * @param name - The ENS domain name to resolve.
     * @returns An address if resolvable, else null.
     */
    resolveENS(name: ENSDomain): Promise<`0x${string}` | null>;
    /**
     * Function to reverse lookup an ENS domain.
     * @param address - The address to reverse lookup.
     * @returns An ENS domain name if resolvable, else null.
     */
    lookupENS(address: Address): Promise<`${string}.eth` | null>;
    /**
     * Function to fetch an ENS domain's avatar.
     * @param name - The ENS domain name to query info from.
     * @returns An avatar URI if available, else null.
     */
    fetchAvatarENS(name: ENSDomain): Promise<string | null>;
}
