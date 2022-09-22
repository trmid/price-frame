import type { Address, Token, DebtToken } from '../../types';
export declare const get: (wallet: Address) => Promise<(Token | DebtToken)[]>;
export declare const getMarketBalancesV3: (wallet: Address) => Promise<(Token | DebtToken)[]>;
export declare const getIncentivesV3: (ibTokens: Record<Address, {
    aTokenAddress: Address;
    variableDebtTokenAddress: Address;
}>, wallet: Address) => Promise<Token[]>;
