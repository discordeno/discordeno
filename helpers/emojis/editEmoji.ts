import type { Bot } from "../../bot.ts";
import { DiscordEmoji } from "../../types/discord.ts";

/** Modify the given emoji. Requires the MANAGE_EMOJIS permission. */
export async function editEmoji(bot: Bot, guildId: bigint, id: bigint, options: ModifyGuildEmoji) {
  const result = await bot.rest.runMethod<DiscordEmoji>(
    bot.rest,
    "patch",
    bot.constants.endpoints.GUILD_EMOJI(guildId, id),
    {
      name: options.name,
      // NEED TERNARY TO SUPPORT NULL AS VALID
      roles: options.roles ? options.roles.map((role) => role.toString()) : options.roles,
    },
  );

  return bot.transformers.emoji(bot, result);
}

/** https://discord.com/developers/docs/resources/emoji#modify-guild-emoji */
export interface ModifyGuildEmoji {
  /** Name of the emoji */
  name?: string;
  /** Roles allowed to use this emoji */
  roles?: bigint[] | null;
}
