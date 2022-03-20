import { Bot } from "../bot.ts";
import { DiscordApplicationCommand } from "../types/discord.ts";
import { Optionalize } from "../types/shared.ts";

export function transformApplicationCommand(bot: Bot, payload: DiscordApplicationCommand) {
  const applicationCommand = {
    id: bot.transformers.snowflake(payload.id),
    applicationId: bot.transformers.snowflake(payload.application_id),
    guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
    name: payload.name,
    description: payload.description,
    defaultPermission: payload.default_permission ?? false,
    type: payload.type,
    version: payload.version,

    options: payload.options?.map((option) => bot.transformers.applicationCommandOption(bot, option)),
  };

  return applicationCommand as Optionalize<typeof applicationCommand>;
}

export interface ApplicationCommand extends ReturnType<typeof transformApplicationCommand> {}
