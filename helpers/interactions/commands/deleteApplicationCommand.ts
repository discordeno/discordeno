import type { Bot } from "../../../bot.ts";

/** Deletes a application command. */
export async function deleteApplicationCommand(bot: Bot, id: bigint, guildId?: bigint): Promise<void> {
  return void await bot.rest.runMethod(
    bot.rest,
    "DELETE",
    guildId
      ? bot.constants.routes.COMMANDS_GUILD_ID(bot.applicationId, guildId, id)
      : bot.constants.routes.COMMANDS_ID(bot.applicationId, id),
  );
}
