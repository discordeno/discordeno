import type { DiscordEntitlement } from '@discordeno/types'
import type { Bot } from '../bot.js'
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js'
import { callCustomizer } from '../transformers.js'
import type { Entitlement } from './types.js'

export function transformEntitlement(bot: Bot, payload: Partial<DiscordEntitlement>, extra?: { partial?: boolean }) {
  const props = bot.transformers.desiredProperties.entitlement
  const entitlement = {} as SetupDesiredProps<Entitlement, TransformersDesiredProperties, DesiredPropertiesBehavior>

  if (props.id && payload.id) entitlement.id = bot.transformers.snowflake(payload.id)
  if (props.skuId && payload.sku_id) entitlement.skuId = bot.transformers.snowflake(payload.sku_id)
  if (props.userId && payload.user_id) entitlement.userId = bot.transformers.snowflake(payload.user_id)
  if (props.guildId && payload.guild_id) entitlement.guildId = bot.transformers.snowflake(payload.guild_id)
  if (props.applicationId && payload.application_id) entitlement.applicationId = bot.transformers.snowflake(payload.application_id)
  if (props.type && payload.type) entitlement.type = payload.type
  if (props.deleted && payload.deleted !== undefined) entitlement.deleted = payload.deleted
  if (props.startsAt && payload.starts_at) entitlement.startsAt = Date.parse(payload.starts_at)
  if (props.endsAt && payload.ends_at) entitlement.endsAt = Date.parse(payload.ends_at)
  if (props.consumed && payload.consumed !== undefined) entitlement.consumed = payload.consumed

  return callCustomizer('entitlement', bot, payload, entitlement, {
    partial: extra?.partial ?? false,
  })
}
