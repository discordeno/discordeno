import { Bot, createChannel, ChannelTypes, channelOverwriteHasPermission, OverwriteTypes } from "../../../mod.ts";
import { Cache } from "../../../src/cache.ts";
import { assertExists, assertEquals } from "../../deps.ts";
import { delayUntil } from "../../utils.ts";

export async function channelOverwriteHasPermissionTest(bot: Bot<Cache>, guildId: bigint, t: Deno.TestContext) {
  const channel = await bot.helpers.createChannel(guildId, {
    name: "Discordeno-test",
    permissionOverwrites: [
      {
        id: bot.id,
        type: OverwriteTypes.Member,
        allow: ["VIEW_CHANNEL"],
        deny: [],
      },
    ],
  });

  // Assertions
  assertExists(channel);
  assertEquals(channel.type, ChannelTypes.GuildText);

  // Delay the execution to allow event to be processed
  await delayUntil(10000, () => bot.cache.channels.has(channel.id));

  if (!bot.cache.channels.has(channel.id)) {
    throw new Error("The channel seemed to be created but it was not cached.");
  }

  assertEquals(channel.permissionOverwrites.length, 1);

  assertEquals(
    channelOverwriteHasPermission(
      channel.guildId,
      bot.id,
      bot.cache.channels.get(channel.id)?.permissionOverwrites || [],
      ["VIEW_CHANNEL"]
    ),
    true
  );
}
