import { MfaLevels } from "../../mod.ts";
import { assertEquals } from "../deps.ts";
import { loadBot } from "../mod.ts";

Deno.test({
  name: "[guild] edit guild mfa level",
  ignore: Deno.env.get("TEST_ENV") === "UNIT",
  async fn(t) {
    const bot = loadBot();
    const guild = await bot.helpers.createGuild({ name: "test" });
    await bot.helpers.editGuildMfaLevel(guild.id, MfaLevels.Elevated, "test");
    assertEquals((await bot.helpers.getGuild(guild.id)).mfaLevel, MfaLevels.Elevated);
    await bot.helpers.editGuildMfaLevel(guild.id, MfaLevels.None, "revert test");
    assertEquals((await bot.helpers.getGuild(guild.id)).mfaLevel, MfaLevels.None);
    await bot.helpers.deleteGuild(guild.id);
  },
});
