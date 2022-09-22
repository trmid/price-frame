import type { Address, ENSDomain } from './types';
/**
 * Function to resolve an ENS domain name into an address.
 * @param name - The ENS domain name to resolve.
 * @returns An address if resolvable, else null.
 */
export declare const resolveENS: (name: ENSDomain) => Promise<`0x${string}` | null>;
/**
 * Function to reverse lookup an ENS domain.
 * @param address - The address to reverse lookup.
 * @returns An ENS domain name if resolvable, else null.
 */
export declare const lookupENS: (address: Address) => Promise<`${string}.eth` | null>;
/**
 * Function to fetch an ENS domain's avatar.
 * @param name - The ENS domain name to query info from.
 * @returns An avatar URI if available, else null.
 */
export declare const fetchAvatarENS: (name: ENSDomain) => Promise<string | null>;
/**
 * Function to fetch ENS domains from subgraph.
 * @param address - The address to lookup domains for.
 * @returns An array of found ENS domains.
 */
export declare const getSubgraphDomains: (address: Address) => Promise<{
    name: ENSDomain;
    expiry: number;
}[]>;
