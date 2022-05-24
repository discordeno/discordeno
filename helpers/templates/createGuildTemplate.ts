import type { Bot } from "../../bot.ts";
import { DiscordTemplate } from "../../types/discord.ts";

/** Creates a template for the guild. Requires the `MANAGE_GUILD` permission. */
export async function createGuildTemplate(bot: Bot, guildId: bigint, data: CreateTemplate) {
  if (data.name.length < 1 || data.name.length > 100) {
    throw new Error("The name can only be in between 1-100 characters.");
  }

  if (data.description?.length && data.description.length > 120) {
    throw new Error("The description can only be in between 0-120 characters.");
  }

  return await bot.rest.runMethod<DiscordTemplate>(
    bot.rest,
    "POST",
    bot.constants.endpoints.GUILD_TEMPLATES(guildId),
    data,
  );
}

export interface CreateTemplate {
  /** Name which the template should have */
  name: string;
  /** Description of the template */
  description?: string;
}
