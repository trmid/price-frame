<script type="ts">
  import { onMount } from "svelte";
	import Token from "../components/Token.svelte";
	import WeaverFi from "../weaverfi";
  import type { Chain, UpperCaseChain } from "../weaverfi/types";

	// Example tokens:
	const exampleTokens = [
		undefined,
		"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
		"0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
		"0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72",
		"0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
		"0x0cEC1A9154Ff802e7934Fc916Ed7Ca50bDE6844e"
	];

	// Num Tokens:
	const tokens = WeaverFi.getAllTokens();
	let numTokens = 0;
	for(const chain in tokens) {
		const chainTokens = tokens[<Chain>chain];
		numTokens += chainTokens.length;
	}

	// Embed form:
	let currentURL = "";
	const chains = WeaverFi.getAllChains();
	let chain: UpperCaseChain = "ETH";
	let tokenAddress: string = "";
	let showStyling = false;
	let frameWidth = 150;
	let frameHeight = 25;
	let c = ["#dddddd", "#000000", "#eeeeee", "#000000"];
	let style = "border-radius: 3px;\nborder: 1px solid #ccc;";
	$: nativeTokenName = WeaverFi[chain].getInfo().token;
	$: iframeCode = `<iframe src="${currentURL}#/token?chain=${chain}${tokenAddress ? `&tokenAddress=${tokenAddress}` : ""}${c[0] ? `&c0=${encodeURIComponent(c[0])}` : ''}${c[1] ? `&c1=${encodeURIComponent(c[1])}` : ''}${c[2] ? `&c2=${encodeURIComponent(c[2])}` : ''}${c[3] ? `&c3=${encodeURIComponent(c[3])}` : ''}" title="Price Frame" frameborder="0" width="${frameWidth}" height="${frameHeight}" style="${style.replaceAll(/\n/g, '')}"></iframe>`;

	let copied = false;
	const copyEmbed = () => {
		navigator.clipboard.writeText(iframeCode);
		copied = true;
		setTimeout(() => copied = false, 3000);
	}

	// On Mount:
	onMount(() => {
		currentURL = location.origin + location.pathname;
	});

</script>

<!-- Main -->
<main>

	<!-- Header -->
	<header>
		<section>
			<!-- Title -->
			<div id="title">
				<img src="logo.svg" alt="Price Frame">
			</div>
		</section>
	</header>

	<!-- Content -->
	<div id="content">
		<section>

			<!-- About -->
			<h2>About</h2>
			<p>
				Price Frame is a token price embed that uses the <a href="https://github.com/WeaverFi/weaverfi" target="_blank">WeaverFi SDK</a> to display a live price feed for <strong>{numTokens}+</strong> different cryptocurrencies! Learn how to embed a token on your webpage below.
			</p>

			<!-- Example -->
			<h2>Examples</h2>

			<!-- Tokens -->
			<div id="tokens">

				<!-- Tokens -->
				{#each exampleTokens as token}
				<div class="token">
					<Token chain="ETH" address={token} />
				</div>
				{/each}
			</div>

			<!-- How To Use -->
			<h2>How to Embed</h2>
			<p>
				Price Frame is embedded using an <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe" target="_blank">IFrame Element</a> on your page. Use the following form to quickly embed a new coin!
			</p>
			<div id="embed-form">
				<select bind:value={chain}>
					{#each chains as chain }
						<option value={chain}>{chain}</option>
					{/each}
				</select>
				<input type="text" name="token-address" placeholder="Token Address 0x000... (Leave blank for {nativeTokenName})" bind:value={tokenAddress}>
				<div class="input-row">
					<button name="styling-toggle" on:click={() => showStyling = !showStyling}>{showStyling ? "Hide Styling Options" : "Show Styling Options"}</button>
					<label for="styling-toggle" style:background="linear-gradient(45deg, field, transparent)"></label>
				</div>
				{#if showStyling}
				<div class="input-row">
					<label for="frame-width">Width</label>
					<input type="number" name="frame-width" placeholder="Width (px)" bind:value={frameWidth}>
				</div>
				<div class="input-row">
					<label for="frame-height">Height</label>
					<input type="number" name="frame-height" placeholder="Height (px)" bind:value={frameHeight}>
				</div>
				<div class="input-row">
					<label for="c0">Background Color 1</label>
					<input type="text" name="c0" placeholder="Background Color 1" bind:value={c[0]}>
					<input type="color" name="c0" placeholder="Background Color 1" bind:value={c[0]}>
				</div>
				<div class="input-row">
					<label for="c1">Text Color 1</label>
					<input type="text" name="c1" placeholder="Text Color 1" bind:value={c[1]}>
					<input type="color" name="c1" placeholder="Text Color 1" bind:value={c[1]}>
				</div>
				<div class="input-row">
					<label for="c2">Background Color 2</label>
					<input type="text" name="c2" placeholder="Background Color 2" bind:value={c[2]}>
					<input type="color" name="c2" placeholder="Background Color 2" bind:value={c[2]}>
				</div>
				<div class="input-row">
					<label for="c3">Text Color 2</label>
					<input type="text" name="c3" placeholder="Text Color 2" bind:value={c[3]}>
					<input type="color" name="c3" placeholder="Text Color 2" bind:value={c[3]}>
				</div>
				<div class="input-row">
					<label for="css-style">IFrame Styling</label>
					<textarea rows="3" name="css-style" placeholder="CSS Styling" bind:value={style}></textarea>
				</div>
				{/if}
				<div id="code-row">
					<input type="text" disabled value={iframeCode}>
					<button id="copy-btn" class:copied on:click={copyEmbed}>{copied ? "Copied!" : "Copy Embed"}</button>
				</div>
			</div>

			<!-- Preview -->
			<h3>Preview</h3>
			{@html iframeCode}
			<aside>
				Is the token logo missing? Request support for it <a href="https://github.com/WeaverFi/weaverfi/blob/main/CONTRIBUTING.md#tracking-new-token">here</a>.
			</aside>

			<br><br><br><br>
		</section>
	</div>

	<!-- Footer -->
	<footer>
		<section>
			<a href="https://github.com/trmid/price-frame" target="_blank">GitHub</a>
			<a href="https://weaver.fi" target="_blank">WeaverFi</a>
		</section>
	</footer>

</main>

<!-- Style -->
<style>
	@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap');

	a {
		color: #d6ac03;
	}

	aside {
		font-size: small;
		font-style: italic;
		margin: 0.5rem 0;
		color: #888;
	}

	main {
		font-family: 'Noto Sans', sans-serif;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: stretch;
	}

	#content {
		flex-grow: 1;
		overflow-y: auto;
	}

	section {
		max-width: 1024px;
    margin: 0 auto;
    padding: 1rem;
  }

	header {
		background-color: #f5c600;
    color: black;
	}

	header, footer {
    box-shadow: 2px 2px 12px #0003;
    z-index: 1;
	}

	footer {
		border-top: 2px solid #f5c600;
	}

	footer a {
		font-size: small;
		margin: 1rem;
	}

	#title {
		display: flex;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: center;
	}

	#title > img {
		height: 48px;
	}

	#tokens > .token {
		margin: 3px;
	}

	#embed-form {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		max-width: 500px;
		gap: 0.5rem;
	}

	input, select, button, textarea {
		padding: 0.5rem;
		border-radius: 3px;
	}

	input[type=color] {
		padding: 0;
	}

	textarea {
		resize: vertical;
	}

	button {
		cursor: pointer;
	}

	.input-row > label {
		flex-grow: 1;
		font-size: small;
		font-weight: bold;
		padding: 0.5rem;
		border-radius: 3px;
		background-color: field;
		color: fieldtext;
		display: flex;
		align-items: center;
	}

	.input-row > input[type=color] {
		height: 40px;
	}

	.input-row > textarea {
		flex-grow: 2;
	}

	#code-row, .input-row {
		display: flex;
		flex-direction: row;
		align-items: stretch;
		gap: 0.5rem;
	}

	#code-row > input {
		flex: 1 1 auto;
	}

	#copy-btn.copied {
		color: #f5c600;
		font-weight: bold;
	}
</style>