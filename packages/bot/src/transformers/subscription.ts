import type { DiscordSubscription } from '@discordeno/types'
import type { InternalBot, Subscription } from '../index.js'

export function transformSubscription(bot: InternalBot, payload: DiscordSubscription): typeof bot.transformers.$inferredTypes.subscription {
  const props = bot.transformers.desiredProperties.subscription
  const subscription = {} as Subscription

  if (props.id && payload.id) subscription.id = bot.transformers.snowflake(payload.id)
  if (props.userId && payload.user_id) subscription.userId = bot.transformers.snowflake(payload.user_id)
  if (props.skuIds && payload.sku_ids) subscription.skuIds = payload.sku_ids.map((skuId) => bot.transformers.snowflake(skuId))
  if (props.entitlementIds && payload.entitlement_ids)
    subscription.entitlementIds = payload.entitlement_ids.map((entitlementId) => bot.transformers.snowflake(entitlementId))
  if (props.renewalSkuIds && payload.renewal_sku_ids)
    subscription.renewalSkuIds = payload.renewal_sku_ids.map((skuId) => bot.transformers.snowflake(skuId))
  if (props.currentPeriodStart && payload.current_period_start) subscription.currentPeriodStart = Date.parse(payload.current_period_start)
  if (props.currentPeriodEnd && payload.current_period_end) subscription.currentPeriodEnd = Date.parse(payload.current_period_end)
  if (props.status && payload.status) subscription.status = payload.status
  if (props.canceledAt && payload.canceled_at) subscription.canceledAt = Date.parse(payload.canceled_at)
  if (props.country && payload.country) subscription.country = payload.country

  return bot.transformers.customizers.subscription(bot, payload, subscription)
}
