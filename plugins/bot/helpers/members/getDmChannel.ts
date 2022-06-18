import { Bot } from "../../bot.ts";
import { DiscordChannel } from "../../deps.ts";

/** Get a user's dm channel. This is required in order to send a DM. */
export async function getDmChannel(bot: Bot, userId: bigint) {
  if (userId === bot.id) throw new Error(bot.constants.Errors.YOU_CAN_NOT_DM_THE_BOT_ITSELF);

  const dmChannelData = await bot.rest.runMethod<DiscordChannel>(bot.rest, "POST", bot.constants.routes.USER_DM(), {
    recipient_id: userId.toString(),
  });

  if (!dmChannelData?.id) return;

  return bot.transformers.channel(bot, { channel: dmChannelData });
}
