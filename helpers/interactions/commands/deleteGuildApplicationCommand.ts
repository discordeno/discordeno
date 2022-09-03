import type { Bot } from "../../../bot.ts";

/** Deletes a guild application command. */
export async function deleteGuildApplicationCommand(bot: Bot, commandId: bigint, guildId: bigint): Promise<void> {
  return await bot.rest.runMethod<void>(
    bot.rest,
    "DELETE",
    bot.constants.routes.COMMANDS_GUILD_ID(bot.applicationId, guildId, commandId),
  );
}
