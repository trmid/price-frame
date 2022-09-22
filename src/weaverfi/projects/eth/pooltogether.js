// Imports:
import { minABI } from '../../ABIs';
import { WeaverError } from '../../error';
import { query, addToken } from '../../functions';
// Initializations:
const chain = 'eth';
const project = 'pooltogether';
const poolTicketV4 = '0xdd4d117723C257CEe402285D3aCF218E9A8236E1';
const poolDepositV4 = '0xd89a09084555a7D0ABe7B111b1f78DFEdDd638Be';
const usdc = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
/* ========================================================================================================================================================================= */
// Function to get project balance:
export const get = async (wallet) => {
    let balance = [];
    balance.push(...(await getPoolBalanceV4(wallet).catch((err) => { throw new WeaverError(chain, project, 'getPoolBalanceV4()', err); })));
    return balance;
};
/* ========================================================================================================================================================================= */
// Function to get V4 pool balance:
export const getPoolBalanceV4 = async (wallet) => {
    let balance = parseInt(await query(chain, poolTicketV4, minABI, 'balanceOf', [wallet]));
    if (balance > 0) {
        let newToken = await addToken(chain, project, 'staked', usdc, balance, wallet, poolDepositV4);
        return [newToken];
    }
    else {
        return [];
    }
};
