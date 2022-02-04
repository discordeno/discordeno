import { assertExists } from "../../deps.ts";
import { bot } from "../../mod.ts";

export async function editGuildTests(guildId: bigint) {
  const guild = await bot.helpers.editGuild(
    guildId,
    {
      name: "Discordeno Test 1.0",
    },
    0,
  );

  // Assertions
  assertExists(guild);

  // Delay the execution to allow event to be processed
  // await delayUntil(10000, async () => bot.guilds.get(guild.id)?.name === "Discordeno Test 1.0");

  // if (!bot.guilds.has(guild.id)) {
  // throw new Error(`The guild seemed to be edited but the cache didn't got updated.`);
  // }
}
