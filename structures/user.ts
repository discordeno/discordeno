import { format_image_url } from '../utils/cdn.ts'
import { endpoints } from '../constants/discord.ts'
import { Image_Size, Image_Formats } from '../types/cdn.ts'
import { User_Payload } from '../types/guild.ts'

export const enum PremiumType {
  NitroClassic = 1,
  Nitro
}

export const create_user = (data: User_Payload) => ({
  id: () => data.id,
  mention: () => `<@!${data.id}>`,
  username: () => data.username,
  discriminator: () => data.discriminator,
  tag: () => `${data.username}#${data.discriminator}`,
  avatar: () => data.avatar,
  avatar_url: (size: Image_Size = 128, format?: Image_Formats) =>
    data.avatar
      ? format_image_url(endpoints.USER_AVATAR(data.id, data.avatar), size, format)
      : endpoints.USER_DEFAULT_AVATAR(Number(data.discriminator) % 5),
  bot: () => data.bot,
  system: () => data.system,
  mfa_enabled: () => data.mfa_enabled,
  flags: () => data.flags,
  premium_type: () => data.premium_type
})

export type User = ReturnType<typeof create_user>
