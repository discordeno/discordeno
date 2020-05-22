import { formatImageURL } from "../utils/cdn.ts";
import { endpoints } from "../constants/discord.ts";
import { ImageSize, ImageFormats } from "../types/cdn.ts";
import { UserPayload } from "../types/guild.ts";
import { RequestManager } from "../module/requestManager.ts";
import { MessageContent, DMChannelCreatePayload } from "../types/channel.ts";
import { cache } from "../utils/cache.ts";
import { logRed, logYellow } from "../utils/logger.ts";
import { createChannel } from "./channel.ts";

export const enum PremiumType {
  NitroClassic = 1,
  Nitro,
}

export const createUser = (data: UserPayload) => ({
  ...data,
  /** Whether or not this user has 2FA enabled. */
  mfaEnabled: data.mfa_enabled,
  /** The premium type for this user */
  premiumType: data.premium_type,
  /** This will return the mention for the user. */
  mention: `<@!${data.id}>`,
  /** The tag for the user */
  tag: `${data.username}#${data.discriminator}`,
  /** The full URL of the users avatar from Discords CDN. */
  avatarURL: (size: ImageSize = 128, format?: ImageFormats) =>
    data.avatar
      ? formatImageURL(
        endpoints.USER_AVATAR(data.id, data.avatar),
        size,
        format,
      )
      : endpoints.USER_DEFAULT_AVATAR(Number(data.discriminator) % 5),
  /** Send a message to a users DM. Note: this takes 2 API calls. 1 is to fetch the users dm channel. 2 is to send a message to that channel. */
  sendMessage: async function (content: string | MessageContent) {
    let dmChannel = cache.channels.get(data.id);
    if (!dmChannel) {
      // If not available in cache create a new one.
      const dmChannelData = await RequestManager.post(
        endpoints.USER_CREATE_DM,
        { recipient_id: data.id },
      ) as DMChannelCreatePayload;
      // Channel create event will have added this channel to the cache
      cache.channels.delete(dmChannelData.id);
      const channel = createChannel(dmChannelData);
      // Recreate the channel and add it undert he users id
      cache.channels.set(data.id, channel);
      dmChannel = channel;
    }

    // If it does exist try sending a message to this user
    return dmChannel?.sendMessage(content);
  },
});

export interface User extends ReturnType<typeof createUser> {}
