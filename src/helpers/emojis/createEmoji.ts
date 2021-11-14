import type { CreateGuildEmoji } from "../../types/emojis/createGuildEmoji.ts";
import type { Emoji } from "../../types/emojis/emoji.ts";
import type { Bot } from "../../bot.ts";

/** Create an emoji in the server. Emojis and animated emojis have a maximum file size of 256kb. Attempting to upload an emoji larger than this limit will fail and return 400 Bad Request and an error message, but not a JSON status code. If a URL is provided to the image parameter, Discordeno will automatically convert it to a base64 string internally. */
export async function createEmoji(bot: Bot, guildId: bigint, options: CreateGuildEmoji) {
  if (options.image && !options.image.startsWith("data:image/")) {
    options.image = await bot.utils.urlToBase64(options.image);
  }

  const emoji = await bot.rest.runMethod<Emoji>(
    bot.rest,
    "post",
    bot.constants.endpoints.GUILD_EMOJIS(guildId),
    options
  );

  return {
    ...emoji,
    id: bot.transformers.snowflake(emoji.id!),
  };
}
