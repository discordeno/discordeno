import type { Bot } from "../../bot.ts";
import { DiscordEmoji } from "../../types/discord.ts";

/** Create an emoji in the server */
export async function createEmoji(bot: Bot, guildId: bigint, options: CreateGuildEmoji) {
  if (options.image && !options.image.startsWith("data:image/")) {
    options.image = await bot.utils.urlToBase64(options.image);
  }

  const emoji = await bot.rest.runMethod<DiscordEmoji>(
    bot.rest,
    "post",
    bot.constants.endpoints.GUILD_EMOJIS(guildId),
    {
      name: options.name,
      image: options.image,
      roles: options.roles?.map((role) => role.toString()),
      reason: options.reason,
    },
  );

  return bot.transformers.emoji(bot, emoji);
}

/** https://discord.com/developers/docs/resources/emoji#create-guild-emoji */
export interface CreateGuildEmoji {
  /** Name of the emoji */
  name: string;
  /** The 128x128 emoji image. Emojis and animated emojis have a maximum file size of 256kb. Attempting to upload an emoji larger than this limit will fail and return 400 Bad Request and an error message, but not a JSON status code. If a URL is provided to the image parameter, Discordeno will automatically convert it to a base64 string internally. */
  image: string;
  /** Roles allowed to use this emoji */
  roles?: bigint[];
  /** The reason you are creating this emoji */
  reason?: string;
}
