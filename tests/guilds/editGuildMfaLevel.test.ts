import { MfaLevels } from "../../mod.ts";
import { assertEquals } from "../deps.ts";
import { loadBot } from "../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../utils.ts";

Deno.test("[guild] edit guild mfa level", async () => {
  const bot = loadBot();
  await bot.helpers.editGuildMfaLevel(CACHED_COMMUNITY_GUILD_ID, MfaLevels.Elevated, "test");
  assertEquals((await bot.helpers.getGuild(CACHED_COMMUNITY_GUILD_ID)).mfaLevel, MfaLevels.Elevated);
  await bot.helpers.editGuildMfaLevel(CACHED_COMMUNITY_GUILD_ID, MfaLevels.None, "revert test");
  assertEquals((await bot.helpers.getGuild(CACHED_COMMUNITY_GUILD_ID)).mfaLevel, MfaLevels.None);
});
