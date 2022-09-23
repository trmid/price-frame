<script type="ts">
  export let chain: string = 'ETH';
  export let address: string | undefined;
  export let width = 150;
  export let height = 25;
</script>

<iframe src="#/token?chain={chain}{address ? `&tokenAddress=${address}` : ""}&c0=%23eeeeee&c1=%23000000&c2=%23444444&c3=%23ffffff" title="Price Frame" frameborder="0" {width} {height} style="border-radius: 5px;border: 1px solid #777;"></iframe>

<style>
  iframe {
    border-radius: 5px;
    border: 1px solid #777;
  }
</style>