import type { DiscordSku, DiscordSkuType, SkuFlag } from '@discordeno/types'
import type { Bot } from '../index.js'

export function transformSku(bot: Bot, payload: DiscordSku): Sku {
  const props = bot.transformers.desiredProperties.sku
  const sku = {} as Sku

  if (props.id && payload.id) sku.id = bot.transformers.snowflake(payload.id)
  if (props.type && payload.type) sku.type = payload.type
  if (props.applicationId && payload.application_id) sku.applicationId = bot.transformers.snowflake(payload.application_id)
  if (props.name && payload.name) sku.name = payload.name
  if (props.slug && payload.slug) sku.slug = payload.slug
  if (props.flags && payload.flags) sku.flags = payload.flags

  return bot.transformers.customizers.sku(bot, payload, sku)
}

export interface Sku {
  /** ID of SKU */
  id: bigint
  /** Type of SKU */
  type: DiscordSkuType
  /** ID of the parent application */
  applicationId: bigint
  /** Customer-facing name of your premium offering */
  name: string
  /** System-generated URL slug based on the SKU's name */
  slug: string
  /** SKU flags combined as a bitfield */
  flags: SkuFlag
}
