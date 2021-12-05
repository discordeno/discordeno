import type { Bot } from "../../../bot.ts";

/** Deletes a slash command. */
export async function deleteApplicationCommand(bot: Bot, id: bigint, guildId?: bigint) {
  await bot.rest.runMethod<undefined>(
    bot.rest,
    "delete",
    guildId
      ? bot.constants.endpoints.COMMANDS_GUILD_ID(bot.applicationId, guildId, id)
      : bot.constants.endpoints.COMMANDS_ID(bot.applicationId, id)
  );
}
