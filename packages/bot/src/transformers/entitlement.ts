import type { DiscordEntitlement, DiscordEntitlementType } from '@discordeno/types'
import type { Bot } from '../index.js'

export function transformEntitlement(bot: Bot, payload: DiscordEntitlement): Entitlement {
  const props = bot.transformers.desiredProperties.entitlement
  const entitlement = {} as Entitlement

  if (props.id && payload.id) entitlement.id = bot.transformers.snowflake(payload.id)
  if (props.skuId && payload.sku_id) entitlement.skuId = bot.transformers.snowflake(payload.sku_id)
  if (props.userId && payload.user_id) entitlement.userId = bot.transformers.snowflake(payload.user_id)
  if (props.guildId && payload.guild_id) entitlement.guildId = bot.transformers.snowflake(payload.guild_id)
  if (props.applicationId && payload.application_id) entitlement.applicationId = bot.transformers.snowflake(payload.application_id)
  if (props.type && payload.type) entitlement.type = payload.type
  if (props.deleted && payload.deleted) entitlement.deleted = payload.deleted
  if (props.startsAt && payload.starts_at) entitlement.startsAt = Date.parse(payload.starts_at)
  if (props.endsAt && payload.ends_at) entitlement.endsAt = Date.parse(payload.ends_at)
  if (props.consumed && payload.consumed) entitlement.consumed = payload.consumed

  return bot.transformers.customizers.entitlement(bot, payload, entitlement)
}

export interface Entitlement {
  /** ID of the entitlement */
  id: bigint
  /** ID of the SKU */
  skuId: bigint
  /** ID of the user that is granted access to the entitlement's sku */
  userId?: bigint
  /** ID of the guild that is granted access to the entitlement's sku */
  guildId?: bigint
  /** ID of the parent application */
  applicationId: bigint
  /** Type of entitlement */
  type: DiscordEntitlementType
  /** Entitlement was deleted */
  deleted: boolean
  /** Start date at which the entitlement is valid. Not present when using test entitlements */
  startsAt?: number
  /** Date at which the entitlement is no longer valid. Not present when using test entitlements */
  endsAt?: number
  /** For consumable items, whether or not the entitlement has been consumed */
  consumed?: boolean
}
