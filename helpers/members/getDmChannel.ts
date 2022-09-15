import type { Bot } from "../../bot.ts";
import { Channel } from "../../transformers/channel.ts";
import { DiscordChannel } from "../../types/discord.ts";
import { BigString } from "../../types/shared.ts";

/**
 * Gets or creates a DM channel with a user.
 *
 * @param bot - The bot instance to use to make the request.
 * @param userId - The ID of the user to create the DM channel with.
 * @returns An instance of {@link Channel}.
 *
 * @see {@link https://discord.com/developers/docs/resources/user#create-dm}
 */
export async function getDmChannel(bot: Bot, userId: BigString): Promise<Channel> {
  if (userId === bot.id) throw new Error(bot.constants.Errors.YOU_CAN_NOT_DM_THE_BOT_ITSELF);

  const result = await bot.rest.runMethod<DiscordChannel>(bot.rest, "POST", bot.constants.routes.USER_DM(), {
    recipient_id: userId.toString(),
  });

  return bot.transformers.channel(bot, { channel: result });
}
