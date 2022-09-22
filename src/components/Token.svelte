<script type="ts">
  export let chain: string = 'ETH';
  export let address: string | undefined;
  export let width = 150;
  export let height = 25;
</script>

<iframe title="Price Frame" src="#/token?chain={chain}{address ? `&tokenAddress=${address}` : ""}" frameborder="0" {width} {height}></iframe>

<style>
  iframe {
    border-radius: 3px;
  }
</style>