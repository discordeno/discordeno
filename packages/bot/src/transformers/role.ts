import type { BigString, DiscordRole } from '@discordeno/types'
import { type InternalBot, type Role, iconHashToBigInt } from '../index.js'
import { Permissions } from './toggles/Permissions.js'
import { RoleToggles } from './toggles/role.js'

export const baseRole: InternalBot['transformers']['$inferredTypes']['role'] = {
  // This allows typescript to still check for type errors on functions below
  ...(undefined as unknown as InternalBot['transformers']['$inferredTypes']['role']),

  get tags() {
    return {
      botId: this.internalTags?.botId,
      integrationId: this.internalTags?.integrationId,
      subscriptionListingId: this.internalTags?.subscriptionListingId,
      availableForPurchase: this.toggles?.availableForPurchase,
      guildConnections: this.toggles?.guildConnections,
      premiumSubscriber: this.toggles?.premiumSubscriber,
    }
  },
  /** If this role is showed separately in the user listing */
  get hoist() {
    return !!this.toggles?.has('hoist')
  },
  /** Whether this role is managed by an integration */
  get managed() {
    return !!this.toggles?.has('managed')
  },
  /** Whether this role is mentionable */
  get mentionable() {
    return !!this.toggles?.has('mentionable')
  },
  /** Whether this is the guilds premium subscriber role */
  get premiumSubscriber() {
    return !!this.toggles?.has('premiumSubscriber')
  },
  /** Whether this role is available for purchase. */
  get availableForPurchase() {
    return !!this.toggles?.has('availableForPurchase')
  },
  /** Whether this is a guild's linked role. */
  get guildConnections() {
    return !!this.toggles?.has('guildConnections')
  },
}

export function transformRole(bot: InternalBot, payload: { role: DiscordRole; guildId: BigString }): typeof bot.transformers.$inferredTypes.role {
  const role: Role = Object.create(baseRole)
  const props = bot.transformers.desiredProperties.role
  if (props.id && payload.role.id) role.id = bot.transformers.snowflake(payload.role.id)
  if (props.name && payload.role.name) role.name = payload.role.name
  if (props.position) role.position = payload.role.position
  if (props.guildId && payload.guildId) role.guildId = bot.transformers.snowflake(payload.guildId)
  if (props.color && payload.role.color !== undefined) role.color = payload.role.color
  if (props.permissions && payload.role.permissions) role.permissions = new Permissions(payload.role.permissions)
  if (props.icon && payload.role.icon) role.icon = iconHashToBigInt(payload.role.icon)
  if (props.unicodeEmoji && payload.role.unicode_emoji) role.unicodeEmoji = payload.role.unicode_emoji
  if (props.flags) role.flags = payload.role.flags
  if (props.tags && payload.role.tags) {
    role.internalTags = {}
    if (payload.role.tags.bot_id) role.internalTags.botId = bot.transformers.snowflake(payload.role.tags.bot_id)
    if (payload.role.tags.integration_id) role.internalTags.integrationId = bot.transformers.snowflake(payload.role.tags.integration_id)
    if (payload.role.tags.subscription_listing_id)
      role.internalTags.subscriptionListingId = bot.transformers.snowflake(payload.role.tags.subscription_listing_id)
  }
  if (props.toggles) {
    role.toggles = new RoleToggles(payload.role)
  }

  return bot.transformers.customizers.role(bot, payload.role, role)
}
