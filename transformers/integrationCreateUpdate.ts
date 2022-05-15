import { Bot } from "../bot.ts";
import { DiscordIntegrationCreateUpdate } from "../types/discord.ts";
import { Optionalize } from "../types/shared.ts";

export function transformIntegrationCreateUpdate(bot: Bot, payload: DiscordIntegrationCreateUpdate) {
  const integration = {
		guildId: bot.transformers.snowflake(payload.guild_id),
		...bot.transformers.integration(bot, payload),
	};

  return integration as Optionalize<typeof integration>;
}

export interface IntegrationCreateUpdate extends ReturnType<typeof transformIntegrationCreateUpdate> {}
