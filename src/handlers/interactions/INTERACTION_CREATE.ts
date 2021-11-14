import { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gatewayPayload.ts";
import type { Interaction } from "../../types/interactions/interaction.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleInteractionCreate(bot: Bot, data: DiscordGatewayPayload) {
  bot.cache.unrepliedInteractions.add(bot.transformers.snowflake((data.d as SnakeCasedPropertiesDeep<Interaction>).id));
  bot.events.interactionCreate(bot, bot.transformers.interaction(bot, data.d as SnakeCasedPropertiesDeep<Interaction>));
}
