import { MfaLevels } from "../../mod.ts";
import { assertEquals } from "../deps.ts";
import { loadBot } from "../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../utils.ts";

Deno.test("[guild] edit guild mfa level", () => {
  const bot = loadBot();
  let elevated = bot.helpers.editGuildMfaLevel(CACHED_COMMUNITY_GUILD_ID, MfaLevels.Elevated, "test");
  assertEquals(elevated, MfaLevels.Elevated);
  const none = bot.helpers.editGuildMfaLevel(CACHED_COMMUNITY_GUILD_ID, MfaLevels.None, "revert test");
  assertEquals(none, MfaLevels.None);
});
