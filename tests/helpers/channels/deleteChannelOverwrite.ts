import { ChannelTypes, OverwriteTypes } from "../../../mod.ts";
import { assertExists, assertEquals, channelOverwriteHasPermission } from "../../deps.ts";
import { bot } from "../../mod.ts";
import { delayUntil } from "../../utils.ts";

export async function deleteChannelOverwriteTests(guildId: bigint) {
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
  await delayUntil(10000, () => bot.channels.has(channel.id));

  if (!bot.channels.has(channel.id)) {
    throw new Error("The channel seemed to be created but it was not cached.");
  }

  assertEquals(channel.permissionOverwrites.length, 1);

  assertEquals(
    channelOverwriteHasPermission(channel.guildId, bot.id, bot.channels.get(channel.id)?.permissionOverwrites || [], [
      "VIEW_CHANNEL",
    ]),
    true
  );

  await bot.helpers.deleteChannelOverwrite(channel.id, bot.id);

  await delayUntil(10000, () => bot.channels.get(channel.id)?.permissionOverwrites?.length === 0);

  if (bot.channels.get(channel.id)?.permissionOverwrites?.length !== 0) {
    throw new Error("The channel permission overwrite was supposed to be deleted but it does not appear to be.");
  }
}
