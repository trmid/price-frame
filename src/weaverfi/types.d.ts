export declare type Chain = 'eth' | 'bsc' | 'poly' | 'ftm' | 'avax' | 'cronos' | 'op' | 'arb';
export declare type UpperCaseChain = 'ETH' | 'BSC' | 'POLY' | 'FTM' | 'AVAX' | 'CRONOS' | 'OP' | 'ARB';
export declare type ChainID = 1 | 56 | 137 | 250 | 43114 | 25 | 10 | 42161;
export declare type Address = `0x${string}`;
export declare type ENSDomain = `${string}.eth`;
export declare type TokenType = 'nativeToken' | 'token' | 'lpToken' | 'debt' | 'xToken' | 'nft';
export declare type TokenStatus = 'none' | 'staked' | 'liquidity' | 'lent' | 'borrowed' | 'unclaimed';
export declare type PriceSource = 'chain' | 'coingecko' | '1inch' | 'paraswap';
export declare type NFTDataQueryType = 'none' | 'indexed' | 'listed' | 'ens';
export declare type ABI = (ABIEntry | ExtendedABIEntry | ExtendedABIEventEntry | ExtendedABIConstructorEntry)[];
export declare type ABIIOType = `int${number}` | `int${number}[${number | ''}]` | `uint${number}` | `uint${number}[${number | ''}]` | `bytes${number | ''}` | `bytes${number | ''}[${number | ''}]` | 'address' | `address[${number | ''}]` | 'bool' | `bool[${number | ''}]` | 'tuple' | `tuple[${number | ''}]` | 'string' | `string[${number | ''}]` | `contract ${string}` | `struct ${string}`;
export declare type URL = `https://${string}`;
export declare type Hash = `0x${string}`;
export declare type IPFS = `ipfs://${string}`;
export declare type IPNS = `ipns://${string}`;
export interface BaseToken {
    symbol: string;
    address: Address;
    balance: number;
}
export interface PricedToken extends BaseToken {
    price: number;
    logo: URL;
}
export interface OwnedToken extends BaseToken {
    type: TokenType;
    chain: Chain;
    location: string;
    status: TokenStatus;
    owner: Address;
    contract?: Address;
    info?: TokenInfo;
}
export interface NativeToken extends OwnedToken, PricedToken {
    type: 'nativeToken';
}
export interface Token extends OwnedToken, PricedToken {
    type: 'token';
}
export interface LPToken extends OwnedToken {
    type: 'lpToken';
    token0: PricedToken;
    token1: PricedToken;
}
export interface DebtToken extends OwnedToken, PricedToken {
    type: 'debt';
}
export interface XToken extends OwnedToken {
    type: 'xToken';
    logo: URL;
    underlyingToken: PricedToken;
}
export interface TokenInfo {
    apr?: number;
    apy?: number;
    unlock?: number;
    deprecated?: boolean;
}
export declare function isNativeToken(token: OwnedToken): token is NativeToken;
export declare function isToken(token: OwnedToken): token is Token;
export declare function isLPToken(token: OwnedToken): token is LPToken;
export declare function isDebtToken(token: OwnedToken): token is DebtToken;
export declare function isXToken(token: OwnedToken): token is XToken;
export interface NFT {
    type: TokenType;
    chain: Chain;
    location: string;
    status: TokenStatus;
    owner: Address;
    name: string;
    address: Address;
    id?: number;
    data?: string;
}
export interface ABIEntry {
    constant: boolean;
    inputs: (ABIIO | ABITupleIO)[];
    name: string;
    outputs: (ABIIO | ABITupleIO)[];
    type: 'function';
}
export interface ABIIO {
    name: string;
    type: ABIIOType;
}
export interface ABITupleIO {
    type: 'tuple' | 'tuple[]';
    components: ABIIO[];
}
export interface ExtendedABIEntry {
    inputs: (ExtendedABIIO | ExtendedABITupleIO)[];
    name: string;
    outputs: (ExtendedABIIO | ExtendedABITupleIO)[];
    stateMutability: 'view' | 'nonpayable' | 'payable' | 'pure';
    type: 'function';
}
export interface ExtendedABIEventEntry {
    anonymous: boolean;
    inputs: (ExtendedABIIO | ExtendedABITupleIO)[];
    name: string;
    type: 'event';
}
export interface ExtendedABIConstructorEntry {
    inputs: (ExtendedABIIO | ExtendedABITupleIO)[];
    stateMutability: 'view' | 'nonpayable' | 'payable' | 'pure';
    type: 'constructor';
}
export interface ExtendedABIIO extends ABIIO {
    indexed?: boolean;
    internalType: ABIIOType;
}
export interface ExtendedABITupleIO {
    type: 'tuple' | 'tuple[]';
    components: ExtendedABIIO[];
}
export interface ChainData {
    id: ChainID;
    name: string;
    token: string;
    wrappedToken: Address;
    usdc: Address;
    usdcDecimals: number;
    inch: boolean;
    paraswap: boolean;
    rpcs: URL[];
    coingeckoIDs: CoinGeckoIDs;
    multicall: Address;
}
export interface CoinGeckoIDs {
    chainID: string;
    nativeTokenID: string;
}
export interface ChainTokenData {
    tokens: TokenData[];
    logos: LogoData[];
    nfts: NFTData[];
}
export interface TokenData {
    address: Address;
    symbol: string;
    logo: URL;
    decimals: number;
}
export interface LogoData {
    symbol: string;
    logo: URL;
}
export interface NFTData {
    address: Address;
    dataQuery: NFTDataQueryType;
    name: string;
}
export interface TokenPriceData {
    symbol: string | null;
    address: Address;
    price: number;
    source: PriceSource;
    timestamp: number;
}
export interface CallContext {
    reference: string;
    methodName: string;
    methodParameters: any[];
}
export interface SnowballAPIResponse {
    symbol: string;
    address: Address;
    lpAddress: Address;
    deprecated: boolean;
    yearlyAPY: number;
    yearlySwapFees: number;
    gaugeInfo: {
        address: Address;
        snobYearlyAPR: number;
    };
}
export interface AaveAPIResponse {
    symbol: string;
    isActive: boolean;
    underlyingAsset: Address;
    aTokenAddress: Address;
    avg7DaysLiquidityRate: number;
    borrowingEnabled: boolean;
    variableDebtTokenAddress: Address;
    avg7DaysVariableBorrowRate: number;
    stableBorrowRateEnabled: boolean;
    stableDebtTokenAddress: Address;
    stableBorrowRate: number;
}
export interface BeefyAPIResponse {
    id: string;
    chain: string;
    status: 'active' | 'eol';
    platform: string;
    token: string;
    tokenAddress: Address;
    earnedTokenAddress: Address;
    assets: string[];
}
export interface YieldYakAPIResponse {
    apr: number | null;
    apy: number | null;
}
export interface MoonPotAPIResponse {
    status: 'active' | 'eol';
    token: string;
    tokenAddress: Address;
    contractAddress: Address;
}
