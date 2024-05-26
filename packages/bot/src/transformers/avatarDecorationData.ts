import { iconHashToBigInt, type Bot, type DiscordAvatarDecorationData } from '../index.js'

export function transformAvatarDecorationData(bot: Bot, payload: DiscordAvatarDecorationData): AvatarDecorationData {
  const data = {} as AvatarDecorationData
  const props = bot.transformers.desiredProperties.avatarDecorationData

  if (props.asset && payload.asset) data.asset = iconHashToBigInt(payload.asset)
  if (props.skuId && payload.sku_id) data.skuId = bot.transformers.snowflake(payload.sku_id)

  return data
}

export interface AvatarDecorationData {
  /** the avatar decoration hash */
  asset: bigint
  /** id of the avatar decoration's SKU */
  skuId: bigint
}
