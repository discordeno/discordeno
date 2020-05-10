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
  mention: `<@!${data.id}>`,
  tag: `${data.username}#${data.discriminator}`,
  avatarURL: (size: ImageSize = 128, format?: ImageFormats) =>
    data.avatar
      ? formatImageURL(
        endpoints.USER_AVATAR(data.id, data.avatar),
        size,
        format,
      )
      : endpoints.USER_DEFAULT_AVATAR(Number(data.discriminator) % 5),
});

export type User = ReturnType<typeof createUser>;
