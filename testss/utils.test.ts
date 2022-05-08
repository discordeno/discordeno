import { removeTokenPrefix } from "../util/token.ts";
import { assertEquals } from "./deps.ts";

Deno.test({
  name: "[token] Remove token prefix when Bot is prefixed.",
  async fn(t) {
    assertEquals("discordeno is best lib", removeTokenPrefix("Bot discordeno is best lib"));
  },
});

Deno.test({
  name: "[token] Remove token prefix when Bot is NOT prefixed.",
  async fn(t) {
    assertEquals("discordeno is best lib", removeTokenPrefix("discordeno is best lib"));
  },
});
