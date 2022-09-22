// Imports:
import { WeaverError } from './error';
import { getTokenPrice } from './prices';
import { query, multicallOneContractQuery, multicallOneMethodQuery, addXToken, getTokenLogo, defaultTokenLogo, parseBN, zero } from './functions';
import { minABI, lpABI, aave, balancer, belt, alpaca, curve, bzx, axial, mstable } from './ABIs';
/* ========================================================================================================================================================================= */
// Function to get Trader Joe token info (xJOE):
export const addTraderJoeToken = async (chain, location, status, rawBalance, owner, contract) => {
    const xjoe = '0x57319d41F71E81F3c65F2a47CA4e001EbAFd4F33';
    const joe = '0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd';
    let joeStaked = parseInt(await query(chain, joe, minABI, 'balanceOf', [xjoe]));
    let xjoeSupply = parseInt(await query(chain, xjoe, minABI, 'totalSupply', []));
    let newToken = await addXToken(chain, location, status, xjoe, rawBalance, owner, joe, rawBalance * (joeStaked / xjoeSupply), contract);
    return newToken;
};
/* ========================================================================================================================================================================= */
// Function to get Belt token info (beltBTC, beltETH, etc.):
export const addBeltToken = async (chain, location, status, address, rawBalance, owner, contract) => {
    let exchangeRate = parseInt(await query(chain, address, belt.tokenABI, 'getPricePerFullShare', [])) / (10 ** 18);
    let underlyingToken = await query(chain, address, belt.tokenABI, 'token', []);
    let newToken = await addXToken(chain, location, status, address, rawBalance, owner, underlyingToken, rawBalance * exchangeRate, contract);
    return newToken;
};
/* ========================================================================================================================================================================= */
// Function to get SpookySwap token info (xBOO):
export const addSpookyToken = async (chain, location, status, rawBalance, owner, contract) => {
    const xboo = '0xa48d959AE2E88f1dAA7D5F611E01908106dE7598';
    const boo = '0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE';
    let booStaked = parseInt(await query(chain, boo, minABI, 'balanceOf', [xboo]));
    let xbooSupply = parseInt(await query(chain, xboo, minABI, 'totalSupply', []));
    let newToken = await addXToken(chain, location, status, xboo, rawBalance, owner, boo, rawBalance * (booStaked / xbooSupply), contract);
    return newToken;
};
/* ========================================================================================================================================================================= */
// Function to get Aave BLP token info:
export const addAaveBLPToken = async (chain, location, status, address, rawBalance, owner, contract) => {
    // Initializing Token Values:
    let type = 'lpToken';
    let symbol = await query(chain, address, minABI, 'symbol', []);
    let decimals = parseInt(await query(chain, address, minABI, 'decimals', []));
    let balance = rawBalance / (10 ** decimals);
    address = await query(chain, address, aave.lpABI, 'bPool', []);
    // Finding LP Token Info:
    let lpTokenSupply = await query(chain, address, minABI, 'totalSupply', []) / (10 ** decimals);
    let lpTokenAddresses = await query(chain, address, balancer.tokenABI, 'getCurrentTokens', []);
    let address0 = lpTokenAddresses[0];
    let address1 = lpTokenAddresses[1];
    let supply0 = await query(chain, address, balancer.tokenABI, 'getBalance', [address0]) / (10 ** decimals);
    let supply1 = await query(chain, address, balancer.tokenABI, 'getBalance', [address1]) / (10 ** decimals);
    let decimals0 = parseInt(await query(chain, address0, minABI, 'decimals', []));
    let decimals1 = parseInt(await query(chain, address1, minABI, 'decimals', []));
    let symbol0 = await query(chain, address0, minABI, 'symbol', []);
    let symbol1 = await query(chain, address1, minABI, 'symbol', []);
    // First Paired Token:
    let token0 = {
        symbol: symbol0,
        address: address0,
        balance: supply0 * (balance / lpTokenSupply),
        price: await getTokenPrice(chain, address0, decimals0),
        logo: getTokenLogo(chain, symbol0)
    };
    // Second Paired Token:
    let token1 = {
        symbol: symbol1,
        address: address1,
        balance: supply1 * (balance / lpTokenSupply),
        price: await getTokenPrice(chain, address1, decimals1),
        logo: getTokenLogo(chain, symbol1)
    };
    return { type, chain, location, status, owner, symbol, address, balance, token0, token1, contract };
};
/* ========================================================================================================================================================================= */
// Function to get 4Belt token info:
export const add4BeltToken = async (chain, location, status, address, rawBalance, owner, contract) => {
    // Initializing Token Values:
    let type = 'token';
    let symbol = '4Belt';
    let decimals = 18;
    let balance = rawBalance / (10 ** decimals);
    let logo = getTokenLogo(chain, symbol);
    let price = 1;
    return { type, chain, location, status, owner, symbol, address, balance, price, logo, contract };
};
/* ========================================================================================================================================================================= */
// Function to get Alpaca token info:
export const addAlpacaToken = async (chain, location, status, address, rawBalance, owner, contract) => {
    // Initializing Token Values:
    let type = 'token';
    let symbol = await query(chain, address, minABI, 'symbol', []);
    let decimals = parseInt(await query(chain, address, minABI, 'decimals', []));
    let balance = rawBalance / (10 ** decimals);
    let logo = getTokenLogo(chain, symbol);
    // Finding Token Price:
    let totalToken = parseInt(await query(chain, address, alpaca.tokenABI, 'totalToken', []));
    let totalSupply = parseInt(await query(chain, address, minABI, 'totalSupply', []));
    let multiplier = totalToken / totalSupply;
    let underlyingToken = await query(chain, address, alpaca.tokenABI, 'token', []);
    let price = multiplier * (await getTokenPrice(chain, underlyingToken, decimals));
    return { type, chain, location, status, owner, symbol, address, balance, price, logo, contract };
};
/* ========================================================================================================================================================================= */
// Function to get Curve token info:
export const addCurveToken = async (chain, location, status, lpToken, rawBalance, owner, contract) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    var _k, _l, _m, _o, _p, _q, _r, _s, _t;
    // Initializations:
    const addressProvider = '0x0000000022D53366457F9d5E68Ec105046FC4383';
    let registry = 'base';
    let poolAddress;
    let poolMultiplier;
    let poolInfo = [];
    // Initializing Multicalls:
    const providerCalls = [
        { reference: 'registry', methodName: 'get_address', methodParameters: [0] },
        { reference: 'poolInfoGetter', methodName: 'get_address', methodParameters: [1] },
        { reference: 'factoryRegistry', methodName: 'get_address', methodParameters: [3] },
        { reference: 'cryptoRegistry', methodName: 'get_address', methodParameters: [5] }
    ];
    const lpCalls = [
        { reference: 'symbol', methodName: 'symbol', methodParameters: [] },
        { reference: 'decimals', methodName: 'decimals', methodParameters: [] },
        { reference: 'totalSupply', methodName: 'totalSupply', methodParameters: [] }
    ];
    // Fetching Addresses:
    let providerMulticallResults = await multicallOneContractQuery(chain, addressProvider, curve.providerABI, providerCalls);
    let baseRegistry = providerMulticallResults['registry'][0];
    let poolInfoGetter = providerMulticallResults['poolInfoGetter'][0];
    let factoryRegistry = providerMulticallResults['factoryRegistry'][0];
    let cryptoRegistry = providerMulticallResults['cryptoRegistry'][0];
    // Fetching LP Token Info:
    let lpMulticallResults = await multicallOneContractQuery(chain, lpToken, lpABI, lpCalls);
    let symbol = lpMulticallResults['symbol'][0];
    let decimals = lpMulticallResults['decimals'][0];
    let totalSupply = parseBN(lpMulticallResults['totalSupply'][0]) / (10 ** decimals);
    let balance = rawBalance / (10 ** decimals);
    // Finding Pool Address & Multiplier:
    poolAddress = await query(chain, baseRegistry, curve.registryABI, 'get_pool_from_lp_token', [lpToken]);
    if (poolAddress == zero) {
        poolAddress = await query(chain, cryptoRegistry, curve.registryABI, 'get_pool_from_lp_token', [lpToken]);
        registry = 'crypto';
        if (poolAddress == zero) {
            poolAddress = lpToken;
            registry = 'factory';
        }
    }
    // Fetching Pool Info From CryptoRegistry:
    if (registry === 'crypto') {
        let registryCalls = [
            { reference: 'multiplier', methodName: 'get_virtual_price_from_lp_token', methodParameters: [lpToken] },
            { reference: 'coins', methodName: 'get_coins', methodParameters: [poolAddress] },
            { reference: 'balances', methodName: 'get_balances', methodParameters: [poolAddress] },
            { reference: 'decimals', methodName: 'get_decimals', methodParameters: [poolAddress] }
        ];
        let registryMulticallResults = await multicallOneContractQuery(chain, cryptoRegistry, curve.cryptoRegistryABI, registryCalls);
        poolMultiplier = parseBN(registryMulticallResults['multiplier'][0]) / (10 ** decimals);
        let coins = registryMulticallResults['coins'].filter((coin) => coin != zero);
        let coinBalances = registryMulticallResults['balances'];
        let coinDecimals = registryMulticallResults['decimals'];
        for (let i = 0; i < coins.length; i++) {
            poolInfo.push({
                coin: coins[i],
                decimals: parseBN(coinDecimals[i]),
                balance: parseBN(coinBalances[i])
            });
        }
        // Fetching Pool Info From Factory:
    }
    else if (registry === 'factory') {
        let coins = (await query(chain, factoryRegistry, curve.factoryABI, 'get_coins', [poolAddress])).filter((coin) => coin != zero);
        if (coins.length > 0) {
            poolMultiplier = 1;
            let isMetaPool = await query(chain, factoryRegistry, curve.factoryABI, 'is_meta', [poolAddress]);
            if (isMetaPool) {
                let factoryCalls = [
                    { reference: 'underlyingCoins', methodName: 'get_underlying_coins', methodParameters: [poolAddress] },
                    { reference: 'underlyingBalances', methodName: 'get_underlying_balances', methodParameters: [poolAddress] },
                    { reference: 'underlyingDecimals', methodName: 'get_underlying_decimals', methodParameters: [poolAddress] }
                ];
                let factoryMulticallResults = await multicallOneContractQuery(chain, factoryRegistry, curve.factoryABI, factoryCalls);
                let underlyingCoins = factoryMulticallResults['underlyingCoins'].filter((coin) => coin != zero);
                let underlyingBalances = factoryMulticallResults['underlyingBalances'];
                let underlyingDecimals = factoryMulticallResults['underlyingDecimals'];
                for (let i = 0; i < underlyingCoins.length; i++) {
                    poolInfo.push({
                        coin: underlyingCoins[i],
                        decimals: parseBN(underlyingDecimals[i]),
                        balance: parseBN(underlyingBalances[i])
                    });
                }
            }
            else {
                let factoryCalls = [
                    { reference: 'balances', methodName: 'get_balances', methodParameters: [poolAddress] },
                    { reference: 'decimals', methodName: 'get_decimals', methodParameters: [poolAddress] }
                ];
                let factoryMulticallResults = await multicallOneContractQuery(chain, factoryRegistry, curve.factoryABI, factoryCalls);
                let coinBalances = factoryMulticallResults['balances'];
                let coinDecimals = factoryMulticallResults['decimals'];
                for (let i = 0; i < coins.length; i++) {
                    poolInfo.push({
                        coin: coins[i],
                        decimals: parseBN(coinDecimals[i]),
                        balance: parseBN(coinBalances[i])
                    });
                }
            }
        }
        else {
            throw new WeaverError(chain, null, `Unidentified Curve pool found`);
        }
        // Fetching Pool Info From Registry & PoolInfoGetter:
    }
    else {
        poolMultiplier = parseInt(await query(chain, baseRegistry, curve.registryABI, 'get_virtual_price_from_lp_token', [lpToken])) / (10 ** decimals);
        let getterCalls = [
            { reference: 'coins', methodName: 'get_pool_coins', methodParameters: [poolAddress] },
            { reference: 'info', methodName: 'get_pool_info', methodParameters: [poolAddress] }
        ];
        let getterMulticallResults = await multicallOneContractQuery(chain, poolInfoGetter, curve.poolInfoGetterABI, getterCalls);
        let coins = getterMulticallResults['coins'][0].filter((coin) => coin != zero);
        let underlyingCoins = getterMulticallResults['coins'][1];
        let coinDecimals = getterMulticallResults['coins'][2];
        let underlyingDecimals = getterMulticallResults['coins'][3];
        let coinBalances = getterMulticallResults['info'][0];
        let underlyingBalances = getterMulticallResults['info'][1];
        for (let i = 0; i < coins.length; i++) {
            poolInfo.push({
                coin: coins[i],
                decimals: parseBN(coinDecimals[i]),
                balance: parseBN(coinBalances[i]),
                underlyingCoin: underlyingCoins[i],
                underlyingDecimals: parseBN(underlyingDecimals[i]),
                underlyingBalance: parseBN(underlyingBalances[i])
            });
        }
    }
    // Standard LP Tokens:
    if (poolInfo.length === 2) {
        // Initializing Token Values:
        let type = 'lpToken';
        let address0 = (_a = (_k = poolInfo[0]).underlyingCoin) !== null && _a !== void 0 ? _a : (_k.underlyingCoin = poolInfo[0].coin);
        let address1 = (_b = (_l = poolInfo[1]).underlyingCoin) !== null && _b !== void 0 ? _b : (_l.underlyingCoin = poolInfo[1].coin);
        let supply0 = (_c = (_m = poolInfo[0]).underlyingBalance) !== null && _c !== void 0 ? _c : (_m.underlyingBalance = poolInfo[0].balance);
        let supply1 = (_d = (_o = poolInfo[1]).underlyingBalance) !== null && _d !== void 0 ? _d : (_o.underlyingBalance = poolInfo[1].balance);
        let decimals0 = (_e = (_p = poolInfo[0]).underlyingDecimals) !== null && _e !== void 0 ? _e : (_p.underlyingDecimals = poolInfo[0].decimals);
        let decimals1 = (_f = (_q = poolInfo[1]).underlyingDecimals) !== null && _f !== void 0 ? _f : (_q.underlyingDecimals = poolInfo[1].decimals);
        // Fetching Underlying Token Symbols:
        let multicallResults = await multicallOneMethodQuery(chain, [address0, address1], minABI, 'symbol', []);
        let symbol0 = multicallResults[address0][0];
        let symbol1 = multicallResults[address1][0];
        // First Paired Token:
        let token0 = {
            symbol: symbol0,
            address: address0,
            balance: (supply0 / (10 ** decimals0)) * (balance / totalSupply),
            price: await getTokenPrice(chain, address0, decimals0),
            logo: getTokenLogo(chain, symbol0)
        };
        // Second Paired Token:
        let token1 = {
            symbol: symbol1,
            address: address1,
            balance: (supply1 / (10 ** decimals1)) * (balance / totalSupply),
            price: await getTokenPrice(chain, address1, decimals1),
            logo: getTokenLogo(chain, symbol1)
        };
        return { type, chain, location, status, owner, symbol, address: lpToken, balance, token0, token1, contract };
        // Other:
    }
    else {
        // Initializing Token Values:
        let type = 'token';
        // Fetching Token Logo:
        let logo = getTokenLogo(chain, symbol);
        // Calculating Token Price:
        let price = 0;
        for (let i = 0; i < poolInfo.length; i++) {
            let address = (_g = (_r = poolInfo[i]).underlyingCoin) !== null && _g !== void 0 ? _g : (_r.underlyingCoin = poolInfo[i].coin);
            let supply = (_h = (_s = poolInfo[i]).underlyingBalance) !== null && _h !== void 0 ? _h : (_s.underlyingBalance = poolInfo[i].balance);
            let decimals = (_j = (_t = poolInfo[i]).underlyingDecimals) !== null && _j !== void 0 ? _j : (_t.underlyingDecimals = poolInfo[i].decimals);
            let tokenPrice = await getTokenPrice(chain, address, decimals);
            price += (supply / (10 ** decimals)) * tokenPrice;
        }
        price /= totalSupply;
        price *= poolMultiplier;
        return { type, chain, location, status, owner, symbol, address: lpToken, balance, price, logo, contract };
    }
};
/* ========================================================================================================================================================================= */
// Function to get BZX token info:
export const addBZXToken = async (chain, location, status, address, rawBalance, owner, contract) => {
    // Initializing Token Values:
    let type = 'token';
    let symbol = await query(chain, address, minABI, 'symbol', []);
    let decimals = parseInt(await query(chain, address, minABI, 'decimals', []));
    let balance = rawBalance / (10 ** decimals);
    let logo = getTokenLogo(chain, symbol);
    // Finding Token Price:
    let multiplier = parseInt(await query(chain, address, bzx.tokenABI, 'tokenPrice', [])) / (10 ** decimals);
    let underlyingToken = await query(chain, address, bzx.tokenABI, 'loanTokenAddress', []);
    let price = multiplier * (await getTokenPrice(chain, underlyingToken, decimals));
    return { type, chain, location, status, owner, symbol, address, balance, price, logo, contract };
};
/* ========================================================================================================================================================================= */
// Function to get Balancer LP token info:
export const addBalancerToken = async (chain, location, status, address, rawBalance, owner, contract) => {
    return await addBalancerLikeToken(chain, location, status, address, rawBalance, owner, '0xBA12222222228d8Ba445958a75a0704d566BF2C8', contract);
};
// Function to get Balancer-like LP token info:
export const addBalancerLikeToken = async (chain, location, status, address, rawBalance, owner, vault, contract) => {
    // Initializing Multicalls:
    const tokenCalls = [
        { reference: 'poolID', methodName: 'getPoolId', methodParameters: [] },
        { reference: 'symbol', methodName: 'symbol', methodParameters: [] },
        { reference: 'decimals', methodName: 'decimals', methodParameters: [] },
        { reference: 'totalSupply', methodName: 'totalSupply', methodParameters: [] }
    ];
    const underlyingCalls = [
        { reference: 'symbol', methodName: 'symbol', methodParameters: [] },
        { reference: 'decimals', methodName: 'decimals', methodParameters: [] }
    ];
    // Generic Token Values:
    let multicallResults = await multicallOneContractQuery(chain, address, minABI.concat(balancer.poolABI), tokenCalls);
    let poolID = multicallResults['poolID'][0];
    let symbol = multicallResults['symbol'][0];
    let decimals = multicallResults['decimals'][0];
    let lpTokenSupply = parseBN(multicallResults['totalSupply'][0]);
    let balance = rawBalance / (10 ** decimals);
    // Finding Pool Info:
    let poolInfo = await query(chain, vault, balancer.vaultABI, 'getPoolTokens', [poolID]);
    // Standard LP Tokens:
    if (poolInfo.tokens.length === 2) {
        // Initializing Token Values:
        let type = 'lpToken';
        // Finding LP Token Info:
        let address0 = poolInfo.tokens[0];
        let address1 = poolInfo.tokens[1];
        let token0MulticallResults = await multicallOneContractQuery(chain, address0, minABI, underlyingCalls);
        let symbol0 = token0MulticallResults['symbol'][0];
        let decimals0 = token0MulticallResults['decimals'][0];
        let token1MulticallResults = await multicallOneContractQuery(chain, address1, minABI, underlyingCalls);
        let symbol1 = token1MulticallResults['symbol'][0];
        let decimals1 = token1MulticallResults['decimals'][0];
        // First Paired Token:
        let token0 = {
            symbol: symbol0,
            address: address0,
            balance: (parseInt(poolInfo.balances[0]) * (balance / lpTokenSupply)) / (10 ** decimals0),
            price: await getTokenPrice(chain, address0, decimals0),
            logo: getTokenLogo(chain, symbol0)
        };
        // Second Paired Token:
        let token1 = {
            symbol: symbol1,
            address: address1,
            balance: (parseInt(poolInfo.balances[1]) * (balance / lpTokenSupply)) / (10 ** decimals1),
            price: await getTokenPrice(chain, address1, decimals1),
            logo: getTokenLogo(chain, symbol1)
        };
        return { type, chain, location, status, owner, symbol, address, balance, token0, token1, contract };
        // Others:
    }
    else {
        // Initializing Token Values:
        let type = 'token';
        let logo = getTokenLogo(chain, symbol);
        // Finding Token Price:
        let priceSum = 0;
        for (let i = 0; i < poolInfo.tokens.length; i++) {
            let tokenDecimals = parseInt(await query(chain, poolInfo.tokens[i], minABI, 'decimals', []));
            let tokenPrice = await getTokenPrice(chain, poolInfo.tokens[i], tokenDecimals);
            priceSum += (parseInt(poolInfo.balances[i]) / (10 ** tokenDecimals)) * tokenPrice;
        }
        let price = priceSum / (lpTokenSupply / (10 ** decimals));
        return { type, chain, location, status, owner, symbol, address, balance, price, logo, contract };
    }
};
/* ========================================================================================================================================================================= */
// Function to get Axial token info:
export const addAxialToken = async (chain, location, status, address, rawBalance, owner, contract) => {
    // Initializing Token Values:
    let type = 'token';
    let symbol = await query(chain, address, minABI, 'symbol', []);
    let decimals = parseInt(await query(chain, address, minABI, 'decimals', []));
    let balance = rawBalance / (10 ** decimals);
    let logo = getTokenLogo(chain, symbol);
    // Finding Token Price:
    let swapAddress = await query(chain, address, axial.tokenABI, 'owner', []);
    let price = parseInt(await query(chain, swapAddress, axial.swapABI, 'getVirtualPrice', [])) / (10 ** decimals);
    return { type, chain, location, status, owner, symbol, address, balance, price, logo, contract };
};
/* ========================================================================================================================================================================= */
// Function to get mStable token info:
export const addStableToken = async (chain, location, status, address, rawBalance, owner, contract) => {
    // Initializing Token Values:
    let type = 'token';
    let symbol = await query(chain, address, minABI, 'symbol', []);
    let decimals = parseInt(await query(chain, address, minABI, 'decimals', []));
    let balance = rawBalance / (10 ** decimals);
    let logo = defaultTokenLogo;
    // Finding Token Price:
    let price = parseInt((await query(chain, address, mstable.stableABI, 'getPrice', [])).price) / (10 ** decimals);
    // Finding Token Symbol:
    logo = price > 1000 ? getTokenLogo(chain, 'mBTC') : getTokenLogo(chain, 'mUSD');
    return { type, chain, location, status, owner, symbol, address, balance, price, logo, contract };
};
