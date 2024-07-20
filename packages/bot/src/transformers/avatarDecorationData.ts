import { type AvatarDecorationData, type Bot, type DiscordAvatarDecorationData, iconHashToBigInt } from '../index.js'

export function transformAvatarDecorationData(bot: Bot, payload: DiscordAvatarDecorationData): AvatarDecorationData {
  const data = {} as AvatarDecorationData
  const props = bot.transformers.desiredProperties.avatarDecorationData

  if (props.asset && payload.asset) data.asset = iconHashToBigInt(payload.asset)
  if (props.skuId && payload.sku_id) data.skuId = bot.transformers.snowflake(payload.sku_id)

  return data
}
