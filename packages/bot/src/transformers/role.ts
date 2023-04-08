import type { DiscordRole } from '@discordeno/types'
import { iconHashToBigInt, type Bot } from '../index.js'
import { Permissions } from './toggles/Permissions.js'
import { RoleToggles } from './toggles/role.js'

const baseRole: Partial<Role> & BaseRole = {
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
    return !!this.toggles?.has('availableForPurchase');
  },
  /** Whether this is a guild's linked role. */
  get guildConnections() {
    return !!this.toggles?.has('guildConnections');
  },
}

export function transformRole(bot: Bot, payload: { role: DiscordRole } & { guildId: bigint }): Role {
  const role: Role = Object.create(baseRole)
  const props = bot.transformers.desiredProperties.role
  if (payload.role.id && props.id) role.id = bot.transformers.snowflake(payload.role.id)
  if (payload.role.name && props.name) role.name = payload.role.name
  if (props.position) role.position = payload.role.position
  if (props.guildId && payload.guildId) role.guildId = payload.guildId
  if (props.color && payload.role.color) role.color = payload.role.color
  if (payload.role.permissions && props.permissions) role.permissions = new Permissions(payload.role.permissions)
  if (payload.role.icon && props.icon) role.icon = iconHashToBigInt(payload.role.icon)
  if (payload.role.unicode_emoji && props.unicodeEmoji) role.unicodeEmoji = payload.role.unicode_emoji
  if (payload.role.tags && (props.botId || props.integrationId || props.subscriptionListingId)) {
    role.internalTags = {}
    if (payload.role.tags.bot_id && props.botId) role.internalTags.botId = bot.transformers.snowflake(payload.role.tags.bot_id)
    if (payload.role.tags.integration_id && props.integrationId)
      role.internalTags.integrationId = bot.transformers.snowflake(payload.role.tags.integration_id)
    if (payload.role.tags.subscription_listing_id && props.subscriptionListingId)
      role.internalTags.subscriptionListingId = bot.transformers.snowflake(payload.role.tags.subscription_listing_id)
  }
  if (props.hoist || props.managed || props.mentionable) {
    role.toggles = new RoleToggles(payload.role)
  }

  return role
}

export interface BaseRole {
  /** The tags this role has */
  tags?: {
    /** The id of the bot this role belongs to */
    botId?: bigint
    /** The id of the integration this role belongs to */
    integrationId?: bigint
    /** Id of this role's subscription sku and listing. */
    subscriptionListingId?: bigint
    /** Whether this role is available for purchase. */
    availableForPurchase?: boolean
    /** Whether this is a guild's linked role */
    guildConnections?: boolean
    /** Whether this is the guild's premium subscriber role */
    premiumSubscriber?: boolean
  }
  /** If this role is showed separately in the user listing */
  hoist: boolean
  /** Whether this role is managed by an integration */
  managed: boolean
  /** Whether this role is mentionable */
  mentionable: boolean
  /** Whether this is the guilds premium subscriber role */
  premiumSubscriber: boolean
  /** Whether this role is available for purchase. */
  availableForPurchase: boolean
  /** Whether this is a guild's linked role. */
  guildConnections: boolean
}

export interface Role extends BaseRole {
  /** Role id */
  id: bigint
  /** The guild id where this role is located. */
  guildId: bigint
  /** The compressed version of the boolean values on this role. */
  toggles?: RoleToggles
  /** If this role is showed separately in the user listing */
  hoist: boolean
  /** Permission bit set */
  permissions: Permissions
  /** Whether this role is managed by an integration */
  managed: boolean
  /** Whether this role is mentionable */
  mentionable: boolean
  /** 
   * Use role.tags  
   * @deprecated this is not deprecated, but this is here to prevent users from using this as this is an internal value open to breaking changes.
   */
  internalTags?: {
    /** The id of the bot this role belongs to */
    botId?: bigint
    /** The id of the integration this role belongs to */
    integrationId?: bigint
    /** Id of this role's subscription sku and listing. */
    subscriptionListingId?: bigint
  }
  /** the role emoji hash */
  icon?: bigint
  /** Role name */
  name: string
  /** Integer representation of hexadecimal color code */
  color: number
  /** Position of this role */
  position: number
  /** role unicode emoji */
  unicodeEmoji?: string
}
