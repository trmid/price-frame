<script type="ts">
  import { onMount } from "svelte";
  import { minABI } from "../weaverfi/ABIs";
  import { defaultAddress } from "../weaverfi/functions";
  import { WeaverFi } from "../weaverfi/index";
  import { prices } from "../weaverfi/prices";
  import type { Address, Chain } from "../weaverfi/types";

  // Config variables:
  let tokenAddress: string | null;
  let chain: string | null;

  // Token Data:
  let tokenName: string = "-";
  let tokenIcon: string = "favicon.svg";
  let tokenPrice: string = "$--.--"; // USD

  // Function to format price:
  function formatPrice(price: number){
    if(price === 0) return "$0.00";
    let sigPrice = price;
    let decimals = 0;
    while(Math.floor(sigPrice) == 0) {
      sigPrice = sigPrice * 10;
      decimals++;
    }
    return `$${price.toFixed(Math.max(2, decimals))}`
  }

  // Function to refresh token price:
  const refresh = async () => {
    const searchParams = new URLSearchParams(location.hash.slice(Math.max(0, location.hash.indexOf("?"))));
    tokenAddress = searchParams.get("tokenAddress");
    chain = searchParams.get("chain") ?? "ETH";
    const validChain = WeaverFi.getAllChains().filter(x => x === (chain ?? 'ETH')?.toUpperCase())[0];
    if(!validChain) throw new Error("Invalid Chain");

    // Clear previously fetched token price:
    const chainPriceList = prices[<Chain>(validChain.toLowerCase())];
    prices[<Chain>(validChain.toLowerCase())] = chainPriceList.filter(token => token.address !== (tokenAddress || defaultAddress));

    // Fetch new token price:
    if(tokenAddress) {
      const validToken = WeaverFi[validChain].getTokens().filter(x => x.address.toLowerCase() === tokenAddress?.toLowerCase())[0];
      if(!validToken) {
        tokenName = (await WeaverFi[validChain].query(<Address>tokenAddress, minABI, "symbol", [])).slice(0, 10);
        tokenIcon = WeaverFi[validChain].getTokenLogo(tokenName);
      } else {  
        tokenName = validToken.symbol;
        tokenIcon = validToken.logo;
      }
      tokenPrice = formatPrice(await  WeaverFi[validChain].getTokenPrice(<any>tokenAddress));
    } else {
      const chainInfo = WeaverFi[validChain].getInfo();
      tokenName = chainInfo.token;
      tokenIcon =  WeaverFi[validChain].getTokenLogo(tokenName);
      tokenPrice = formatPrice(await  WeaverFi[validChain].getTokenPrice(defaultAddress));
    }
  };

  // On Mount:
  const refreshRate = 1000 * 60; // every 60 sec
  let originURL = "";
  onMount(() => {

    // Get origin URL:
    originURL = location.origin;

    // Get token info:
    refresh().catch(console.error);

    // Start refreshing at a random time within refresh rate
    setTimeout(() => {
      setInterval(() => refresh().catch(console.error), refreshRate);
    }, Math.random() * refreshRate);
  });

</script>

<!-- Token -->
<a id="token" href="{originURL}" target="_blank" title="{tokenName} Price Frame">
  <span class="icon icofont-">
    <img src="{tokenIcon}" alt="{tokenName} icon" />
  </span>
  <span class="name">{tokenName}</span>
  <span class="price">{tokenPrice}</span>
</a>

<!-- Style -->
<style>
  #token {
    position: fixed;
    inset: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: stretch;
    background-color: #ddd;
    border: 1px solid #ccc;
    color: black;
    font-family: monospace;
    font-size: 12px;
    overflow: auto hidden;
    scrollbar-width: 2px;

    text-decoration: none;
  }

  #token > span {
    flex: 1 1 20%;
    display: inline-flex;
    flex-wrap: nowrap;
    width: max-content;
    white-space: nowrap;
    align-items: center;
  }

  .icon {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #token:hover {
    cursor: pointer;
  }

  #token:hover .icon::after {
    content: "\ef4e";
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    color: #444;
  }

  #token:hover .icon > img {
    visibility: hidden;
  }

  .icon > img {
    width: 1rem;
    height: 1rem;
    padding: 5px;
  }

  .name, .price {
    font-weight: bold;
  }

  .name {
    flex: 1 1 30% !important;
    padding: 3px 8px 3px 5px;
  }

  .price {
    flex: 1 1 50% !important;
    background-color: #eee;
    padding: 3px 6px;
  }

  /* width */
  ::-webkit-scrollbar {
    width: 3px;
    height: 3px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
</style>