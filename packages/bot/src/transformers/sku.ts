import type { DiscordSku } from '@discordeno/types'
import type { InternalBot, Sku } from '../index.js'

export function transformSku(bot: InternalBot, payload: DiscordSku): typeof bot.transformers.$inferredTypes.sku {
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
