import type { Channel } from "../../types/channels/channel.ts";
import type { CreateMessage } from "../../types/messages/createMessage.ts";
import type { Bot } from "../../bot.ts";

/** Send a message to a users DM. Note: this takes 2 API calls. 1 is to fetch the users dm channel. 2 is to send a message to that channel. */
export async function getDmChannel(bot: Bot, memberId: bigint, content: string | CreateMessage) {
  if (memberId === bot.id) throw new Error(bot.constants.Errors.YOU_CAN_NOT_DM_THE_BOT_ITSELF);

  const dmChannelData = await bot.rest.runMethod<Channel>(bot.rest, "post", bot.constants.endpoints.USER_DM, {
    recipient_id: memberId.toString(),
  });
  return bot.transformers.channel(bot, { channel: dmChannelData });
}
