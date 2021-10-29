import type { Channel } from "../../types/channels/channel.ts";
import type { CreateMessage } from "../../types/messages/create_message.ts";
import type { Bot } from "../../bot.ts";
import type { SnakeCasedPropertiesDeep } from "../../types/util.ts";

/** Send a message to a users DM. Note: this takes 2 API calls. 1 is to fetch the users dm channel. 2 is to send a message to that channel. */
export async function sendDirectMessage(bot: Bot, memberId: bigint, content: string | CreateMessage) {
  if (memberId === bot.id) throw new Error(bot.constants.Errors.YOU_CAN_NOT_DM_THE_BOT_ITSELF);

  let dmChannel = await bot.cache.channels.get(memberId);
  if (!dmChannel) {
    // If not available in cache create a new one.
    const dmChannelData = await bot.rest.runMethod<Channel>(bot.rest, "post", bot.constants.endpoints.USER_DM, {
      recipient_id: memberId,
    });
    const discordenoChannel = await bot.transformers.channel(bot, { channel: dmChannelData });
    // Recreate the channel and add it under the users id
    await bot.cache.channels.set(memberId, discordenoChannel);
    dmChannel = discordenoChannel;
  }

  // If it does exist try sending a message to this user
  return await bot.helpers.sendMessage(dmChannel.id, content);
}
