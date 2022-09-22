// Imports:
import axios from 'axios';
import { ethers } from 'ethers';
import { chains } from './chains';
// Initializations:
const ensSubgraphURL = 'https://api.thegraph.com/subgraphs/name/ensdomains/ens';
const ethProvider = new ethers.providers.StaticJsonRpcProvider(chains.eth.rpcs[0]);
/* ========================================================================================================================================================================= */
/**
 * Function to resolve an ENS domain name into an address.
 * @param name - The ENS domain name to resolve.
 * @returns An address if resolvable, else null.
 */
export const resolveENS = async (name) => {
    let address = await ethProvider.resolveName(name);
    if (address) {
        return address;
    }
    return null;
};
/* ========================================================================================================================================================================= */
/**
 * Function to reverse lookup an ENS domain.
 * @param address - The address to reverse lookup.
 * @returns An ENS domain name if resolvable, else null.
 */
export const lookupENS = async (address) => {
    let ensAddress = await ethProvider.lookupAddress(address);
    if (ensAddress) {
        return ensAddress;
    }
    return null;
};
/* ========================================================================================================================================================================= */
/**
 * Function to fetch an ENS domain's avatar.
 * @param name - The ENS domain name to query info from.
 * @returns An avatar URI if available, else null.
 */
export const fetchAvatarENS = async (name) => {
    let resolver = await ethProvider.getResolver(name);
    if (resolver) {
        let avatar = await resolver.getText('avatar');
        if (avatar) {
            return avatar;
        }
    }
    return null;
};
/* ========================================================================================================================================================================= */
/**
 * Function to fetch ENS domains from subgraph.
 * @param address - The address to lookup domains for.
 * @returns An array of found ENS domains.
 */
export const getSubgraphDomains = async (address) => {
    let ensDomains = [];
    let subgraphQuery = { query: `{ account(id: "${address.toLowerCase()}") { registrations { domain { name }, expiryDate } } }` };
    let subgraphResults = (await axios.post(ensSubgraphURL, subgraphQuery)).data.data.account;
    if (subgraphResults) {
        subgraphResults.registrations.forEach(registration => {
            let name = registration.domain.name;
            let expiry = parseInt(registration.expiryDate);
            ensDomains.push({ name, expiry });
        });
    }
    return ensDomains;
};
