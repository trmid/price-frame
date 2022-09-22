<script lang="ts">
	import Router from "svelte-spa-router";
  import { routes } from "./routes";
</script>

<!-- Router -->
<Router {routes}/>

<style>
  :global(html, body) {
    margin: 0;
    padding: 0;
    height: 100%;
  }
</style>