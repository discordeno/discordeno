import type { DiscordSubscription } from '@discordeno/types'
import type { Bot } from '../bot.js'
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js'
import { callCustomizer } from '../transformers.js'
import type { Subscription } from './types.js'

export function transformSubscription(bot: Bot, payload: Partial<DiscordSubscription>, extra?: { partial?: boolean }) {
  const props = bot.transformers.desiredProperties.subscription
  const subscription = {} as SetupDesiredProps<Subscription, TransformersDesiredProperties, DesiredPropertiesBehavior>

  if (props.id && payload.id) subscription.id = bot.transformers.snowflake(payload.id)
  if (props.userId && payload.user_id) subscription.userId = bot.transformers.snowflake(payload.user_id)
  if (props.skuIds && payload.sku_ids) subscription.skuIds = payload.sku_ids.map((skuId) => bot.transformers.snowflake(skuId))
  if (props.entitlementIds && payload.entitlement_ids)
    subscription.entitlementIds = payload.entitlement_ids.map((entitlementId) => bot.transformers.snowflake(entitlementId))
  if (props.renewalSkuIds && payload.renewal_sku_ids)
    subscription.renewalSkuIds = payload.renewal_sku_ids.map((skuId) => bot.transformers.snowflake(skuId))
  if (props.currentPeriodStart && payload.current_period_start) subscription.currentPeriodStart = Date.parse(payload.current_period_start)
  if (props.currentPeriodEnd && payload.current_period_end) subscription.currentPeriodEnd = Date.parse(payload.current_period_end)
  if (props.status && payload.status !== undefined) subscription.status = payload.status
  if (props.canceledAt && payload.canceled_at) subscription.canceledAt = Date.parse(payload.canceled_at)
  if (props.country && payload.country) subscription.country = payload.country

  return callCustomizer('subscription', bot, payload, subscription, {
    partial: extra?.partial ?? false,
  })
}
