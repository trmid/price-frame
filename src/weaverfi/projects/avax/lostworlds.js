// Imports:
import { lostworlds } from '../../ABIs';
import { WeaverError } from '../../error';
import { query, addToken } from '../../functions';
// Initializations:
const chain = 'avax';
const project = 'lostworlds';
const staking = '0x2cf6625e35b241F30871FAac932dC5946D092631';
const lost = '0x449674B82F05d498E126Dd6615a1057A9c088f2C';
/* ========================================================================================================================================================================= */
// Function to get project balance:
export const get = async (wallet) => {
    let balance = [];
    balance.push(...(await getStakedLOST(wallet).catch((err) => { throw new WeaverError(chain, project, 'getStakedLOST()', err); })));
    return balance;
};
/* ========================================================================================================================================================================= */
// Function to get staked LOST balance:
export const getStakedLOST = async (wallet) => {
    let balances = [];
    let balance = await query(chain, staking, lostworlds.stakingABI, 'deposits', [wallet]);
    if (balance > 0) {
        let newToken = await addToken(chain, project, 'staked', lost, balance, wallet, staking);
        balances.push(newToken);
        let rewards = await query(chain, staking, lostworlds.stakingABI, 'getPendingReward', [wallet]);
        if (rewards > 0) {
            let newToken = await addToken(chain, project, 'unclaimed', lost, rewards, wallet, staking);
            balances.push(newToken);
        }
    }
    return balances;
};
