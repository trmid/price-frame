import HomeSvelte from "./routes/Home.svelte";
import TokenSvelte from "./routes/Token.svelte";
import NotFoundSvelte from "./routes/NotFound.svelte";

export const routes = {
  "/": HomeSvelte,
  "/token": TokenSvelte,
  "*": NotFoundSvelte
};