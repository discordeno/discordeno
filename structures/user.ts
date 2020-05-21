import { formatImageURL } from "../utils/cdn.ts";
import { endpoints } from "../constants/discord.ts";
import { ImageSize, ImageFormats } from "../types/cdn.ts";
import { UserPayload } from "../types/guild.ts";

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
});

export interface User extends ReturnType<typeof createUser> {}
