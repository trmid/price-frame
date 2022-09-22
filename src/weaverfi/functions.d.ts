import { ethers } from 'ethers';
import type { ContractCallResults, ContractCallContext } from 'ethereum-multicall';
import type { Chain, Address, URL, IPFS, IPNS, ABI, TokenData, TokenStatus, NativeToken, Token, LPToken, DebtToken, XToken, NFT, CallContext } from './types';
export declare const defaultTokenLogo: URL;
export declare const defaultAddress: Address;
export declare const zero: Address;
export declare const ignoredErrors: {
    chain: Chain;
    address: Address;
}[];
/**
 * Function to make blockchain queries.
 * @param chain - The blockchain to target for this query.
 * @param address - The contract's address to query.
 * @param abi - The contract's ABI.
 * @param method - The method to be called from the contract.
 * @param args - Any arguments to pass to the method called.
 * @param block - The block height from which to query info from. (Optional)
 * @returns Query results.
 */
export declare const query: (chain: Chain, address: Address, abi: ABI, method: string, args: any[], block?: number) => Promise<any>;
/**
 * Function to query blocks for events on a given contract.
 * @param chain - The blockchain to target for this query.
 * @param address - The contract's address to query.
 * @param abi - The contract's ABI.
 * @param event - The event name to query for.
 * @param querySize - The limit to how many blocks should be queried in each batch.
 * @param args - Any arguments to pass to the event filter.
 * @param startBlock - The block to start querying from. (Optional)
 * @param endBlock - The block to stop querying at. (Optional)
 * @returns Array of events.
 */
export declare const queryBlocks: (chain: Chain, address: Address, abi: ABI, event: string, querySize: number, args: any[], startBlock?: number, endBlock?: number) => Promise<ethers.Event[]>;
/**
 * Function to make multicall blockchain queries (multiple method calls in one query).
 * @param chain - The blockchain to target for this query.
 * @param queries - The queries to be executed.
 * @returns Query results for all given queries.
 * @see {@link multicallOneMethodQuery}, {@link multicallOneContractQuery} and {@link multicallComplexQuery} for simpler use cases.
 */
export declare const multicallQuery: (chain: Chain, queries: ContractCallContext[]) => Promise<ContractCallResults>;
/**
 * Function to make multicall blockchain queries with a singular method call to multiple contracts.
 * @param chain - The blockchain to target for this query.
 * @param contracts - The contracts to query.
 * @param abi - The ABI needed for the given query.
 * @param methodName - The method to call on each contract.
 * @param methodParameters - Any arguments to pass to the method called.
 * @returns Query results for each contract.
 */
export declare const multicallOneMethodQuery: (chain: Chain, contracts: Address[], abi: ABI, methodName: string, methodParameters: any[]) => Promise<Record<`0x${string}`, any[]>>;
/**
 * Function to make multicall blockchain queries with many method calls to a single contract.
 * @param chain - The blockchain to target for this query.
 * @param contractAddress - The contract to query.
 * @param abi - The aggregated ABI needed for all given queries.
 * @param calls - All method calls to query the target contract.
 * @returns Query results for each method call.
 */
export declare const multicallOneContractQuery: (chain: Chain, contractAddress: Address, abi: ABI, calls: CallContext[]) => Promise<Record<string, any[]>>;
/**
 * Function to make multicall blockchain queries with many method calls to many contracts.
 * @param chain - The blockchain to target for this query.
 * @param contracts - The contracts to query.
 * @param abi - The aggregated ABI needed for all given queries.
 * @param calls - All method calls to query the target contracts.
 * @returns Query results for each method call, for each contract.
 */
export declare const multicallComplexQuery: (chain: Chain, contracts: Address[], abi: ABI, calls: CallContext[]) => Promise<Record<`0x${string}`, Record<string, any[]>>>;
/**
 * Function to fetch a wallet's token balances.
 * @param chain - The blockchain to query info from.
 * @param wallet - The wallet to query balances for.
 * @returns All native and token balances for the specified wallet.
 */
export declare const getWalletBalance: (chain: Chain, wallet: Address) => Promise<(NativeToken | Token)[]>;
/**
 * Function to fetch project balances for a given wallet.
 * @param chain - The blockchain to query info from.
 * @param wallet - The wallet to query balances for.
 * @param project - The project/dapp to query for balances in.
 * @returns A wallet's balance on the specified project/dapp.
 */
export declare const getProjectBalance: (chain: Chain, wallet: Address, project: string) => Promise<(NativeToken | Token | LPToken | DebtToken | XToken)[]>;
/**
 * Function to fetch all project balances for a given wallet.
 * @param chain - The blockchain to query info from.
 * @param wallet - The wallet to query balances for.
 * @returns A wallet's balance on all projects/dapps on the specified chain.
 */
export declare const getAllProjectBalances: (chain: Chain, wallet: Address) => Promise<(NativeToken | Token | LPToken | DebtToken | XToken)[]>;
/**
 * Function to fetch all balances for a given wallet, including in their wallets and in dapps/projects.
 * @param wallet - The wallet to query balances for.
 * @returns A wallet's token, project and NFT balances.
 * @see {@link getWalletBalance}, {@link getProjectBalance} and {@link getWalletNFTBalance} for more specific (and faster) queries.
 */
export declare const getAllBalances: (wallet: Address) => Promise<(NativeToken | Token | LPToken | DebtToken | XToken | NFT)[]>;
/**
 * Function to get a wallet's native token balance.
 * @param chain - The blockchain to query info from.
 * @param wallet - The wallet to query native balance for.
 * @returns An array of NativeToken objects if any balance is found.
 */
export declare const getWalletNativeTokenBalance: (chain: Chain, wallet: Address) => Promise<NativeToken[]>;
/**
 * Function to get a wallet's token balance.
 * @param chain - The blockchain to query info from.
 * @param wallet - The wallet to query token balances for.
 * @returns An array of Token objects if any balances are found.
 */
export declare const getWalletTokenBalance: (chain: Chain, wallet: Address) => Promise<Token[]>;
/**
 * Function to get a wallet's NFT balance.
 * @param chain - The blockchain to query info from.
 * @param wallet - The wallet to query NFT balances for.
 * @returns An array of NFT objects if any balances are found.
 */
export declare const getWalletNFTBalance: (chain: Chain, wallet: Address) => Promise<NFT[]>;
/**
 * Function to check if a hash corresponds to a valid wallet/contract address.
 * @param address - The hash to check for validity.
 * @returns True or false, depending on if the hash is a valid address or not.
 */
export declare const isAddress: (address: Address) => boolean;
/**
 * Function to get a wallet's transaction count.
 * @param chain - The blockchain to query info from.
 * @param wallet - The wallet to query transaction count for.
 * @returns A number of transactions.
 */
export declare const getWalletTXCount: (chain: Chain, wallet: Address) => Promise<number>;
/**
 * Function to get all relevant native token info.
 * @param chain - The blockchain to query info from.
 * @param rawBalance - The balance to be assigned to the native token's object, with decimals.
 * @param owner - The native token owner's wallet address.
 * @returns A NativeToken object with all its information.
 */
export declare const addNativeToken: (chain: Chain, rawBalance: number, owner: Address) => Promise<NativeToken>;
/**
 * Function to get all relevant token info.
 * @param chain - The blockchain to query info from.
 * @param location - The current location of the token, either in a wallet or in some project's contract.
 * @param status - The current status of the token.
 * @param address - The token's address.
 * @param rawBalance - The balance to be assigned to the token's object, with decimals.
 * @param owner - The token owner's wallet address.
 * @param contract - The contract interacted with to generate this deposit, stake, etc. (Optional)
 * @returns A Token object with all its information.
 */
export declare const addToken: (chain: Chain, location: string, status: TokenStatus, address: Address, rawBalance: number, owner: Address, contract?: Address) => Promise<Token>;
/**
 * Function to get all relevant liquidity pool token info.
 * @param chain - The blockchain to query info from.
 * @param location - The current location of the token, either in a wallet or in some project's contract.
 * @param status - The current status of the token.
 * @param address - The token's address.
 * @param rawBalance - The balance to be assigned to the token's object, with decimals.
 * @param owner - The token owner's wallet address.
 * @param contract - The contract interacted with to generate this deposit, liquidity, etc. (Optional)
 * @returns A LPToken object with all its information.
 */
export declare const addLPToken: (chain: Chain, location: string, status: TokenStatus, address: Address, rawBalance: number, owner: Address, contract?: Address) => Promise<LPToken>;
/**
 * Function to get all relevant debt token info.
 * @param chain - The blockchain to query info from.
 * @param location - The current location of the token, either in a wallet or in some project's contract.
 * @param address - The token's address.
 * @param rawBalance - The balance to be assigned to the token's object, with decimals.
 * @param owner - The token owner's wallet address.
 * @param contract - The contract interacted with to generate this debt. (Optional)
 * @returns A DebtToken object with all its information.
 */
export declare const addDebtToken: (chain: Chain, location: string, address: Address, rawBalance: number, owner: Address, contract?: Address) => Promise<DebtToken>;
/**
 * Function to get all relevant derivative/composite token info (example: xJOE).
 * @param chain - The blockchain to query info from.
 * @param location - The current location of the token, either in a wallet or in some project's contract.
 * @param status - The current status of the token.
 * @param address - The token's address.
 * @param rawBalance - The balance to be assigned to the token's object, with decimals.
 * @param owner - The token owner's wallet address.
 * @param underlyingAddress - The underlying token's address (the token this token is built upon).
 * @param underlyingRawBalance - The equivalent balance of the underlying token this xToken represents.
 * @param contract - The contract interacted with to generate this deposit, stake, etc. (Optional)
 * @returns A XToken object with all its information.
 */
export declare const addXToken: (chain: Chain, location: string, status: TokenStatus, address: Address, rawBalance: number, owner: Address, underlyingAddress: Address, underlyingRawBalance: number, contract?: Address) => Promise<XToken>;
/**
 * Function to get a list of all tracked tokens on all chains.
 * @returns A record of arrays of tracked tokens on every chain.
 */
export declare const getAllTokens: () => Record<Chain, TokenData[]>;
/**
 * Function to get a list of all tracked tokens on any given chain.
 * @param chain - The chain to fetch tracked tokens from.
 * @returns An array of all tracked tokens in the given chain.
 */
export declare const getTokens: (chain: Chain) => TokenData[];
/**
 * Helper function to get a given chains' token data.
 * @param chain - The chain to fetch data from.
 * @returns The given chain's token data.
 */
export declare const getChainTokenData: (chain: Chain) => import("./types").ChainTokenData | undefined;
/**
 * Function to get a token's logo.
 * @param chain - The chain to fetch data from.
 * @param symbol - The token's symbol.
 * @returns The token logo if available, else a generic coin logo.
 */
export declare const getTokenLogo: (chain: Chain, symbol: string) => `https://${string}`;
/**
 * Function to get gas estimates for TXs on any given chain.
 * @param chain - The chain to fetch data from.
 * @returns The gas price, token price and gas estimates for various TX types.
 */
export declare const getGasEstimates: (chain: Chain) => Promise<{
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
 * Helper function to parse big numbers from query results.
 * @param bn - The big number to parse.
 * @returns A regular JavaScript number.
 */
export declare const parseBN: (bn: any) => number;
/**
 * Helper function to query data with Axios.
 * @param link The link to fetch data from.
 * @returns Data or undefined if an invalid link is given.
 */
export declare const fetchData: (link: URL | IPFS | IPNS) => Promise<any>;
