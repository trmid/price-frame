// Imports:
import { moonpot } from '../../ABIs';
import { WeaverError } from '../../error';
import { add4BeltToken, addBeltToken, addAlpacaToken } from '../../project-functions';
import { multicallOneMethodQuery, addToken, addLPToken, parseBN, fetchData } from '../../functions';
// Initializations:
const chain = 'bsc';
const project = 'moonpot';
const apiURL = 'https://api.moonpot.com/pots';
/* ========================================================================================================================================================================= */
// Function to get project balance:
export const get = async (wallet) => {
    let balance = [];
    let pots = [];
    let potsData = (await fetchData(apiURL)).data;
    let potsKeys = Object.keys(potsData).filter(pot => potsData[pot].status === 'active');
    potsKeys.forEach(key => {
        pots.push(potsData[key]);
    });
    if (pots.length > 0) {
        balance.push(...(await getPotBalances(wallet, pots).catch((err) => { throw new WeaverError(chain, project, 'getPotBalances()', err); })));
    }
    else {
        throw new WeaverError(chain, project, 'Invalid response from Moonpot API');
    }
    return balance;
};
/* ========================================================================================================================================================================= */
// Function to get pot balances:
export const getPotBalances = async (wallet, pots) => {
    let balances = [];
    // Balance Multicall Query:
    let potAddresses = pots.map(pot => pot.contractAddress);
    let multicallResults = await multicallOneMethodQuery(chain, potAddresses, moonpot.potABI, 'userTotalBalance', [wallet]);
    let promises = pots.map(pot => (async () => {
        let balanceResults = multicallResults[pot.contractAddress];
        if (balanceResults) {
            let balance = parseBN(balanceResults[0]);
            if (balance > 0) {
                // 4Belt Pot:
                if (pot.token.includes('4Belt')) {
                    let newToken = await add4BeltToken(chain, project, 'staked', pot.tokenAddress, balance, wallet);
                    balances.push(newToken);
                    // Belt Pots:
                }
                else if (pot.token.startsWith('belt')) {
                    let newToken = await addBeltToken(chain, project, 'staked', pot.tokenAddress, balance, wallet);
                    balances.push(newToken);
                    // Alpaca Pots:
                }
                else if (pot.token.startsWith('ib')) {
                    let newToken = await addAlpacaToken(chain, project, 'staked', pot.tokenAddress, balance, wallet);
                    balances.push(newToken);
                    // LP Pots:
                }
                else if (pot.token.endsWith('LP')) {
                    let newToken = await addLPToken(chain, project, 'staked', pot.tokenAddress, balance, wallet);
                    balances.push(newToken);
                    // Single-Asset Pots:
                }
                else {
                    let newToken = await addToken(chain, project, 'staked', pot.tokenAddress, balance, wallet);
                    balances.push(newToken);
                }
            }
        }
    })());
    await Promise.all(promises);
    return balances;
};
