import type { Bot } from "../../bot.ts";
import { Template } from "../../transformers/template.ts";
import { DiscordTemplate } from "../../types/discord.ts";
import { Collection } from "../../util/collection.ts";

/** Returns an array of templates. Requires the `MANAGE_GUILD` permission. */
export async function getGuildTemplates(bot: Bot, guildId: bigint): Promise<Collection<string, Template>> {
  const results = await bot.rest.runMethod<DiscordTemplate[]>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_TEMPLATES(guildId),
  );

  return new Collection(
    results.map((result) => {
      const template = bot.transformers.template(bot, result);
      return [template.code, template];
    }),
  );
}
