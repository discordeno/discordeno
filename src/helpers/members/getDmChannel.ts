import type { Channel } from "../../types/channels/channel.ts";
import type { Bot } from "../../bot.ts";

/** Get a user's dm channel. This is required in order to send a DM. */
export async function getDmChannel(bot: Bot, userId: bigint) {
  if (userId === bot.id) throw new Error(bot.constants.Errors.YOU_CAN_NOT_DM_THE_BOT_ITSELF);

  const dmChannelData = await bot.rest.runMethod<Channel>(bot.rest, "post", bot.constants.endpoints.USER_DM, {
    recipient_id: userId.toString(),
  });
  
  return bot.transformers.channel(bot, { channel: dmChannelData });
}
