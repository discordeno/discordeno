import type { DiscordCollectibles, DiscordNameplate, DiscordUser, DiscordUserPrimaryGuild } from '@discordeno/types'
import { iconHashToBigInt } from '@discordeno/utils'
import type { Bot } from '../bot.js'
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js'
import { ToggleBitfield } from './toggles/ToggleBitfield.js'
import { UserToggles } from './toggles/user.js'
import type { Collectibles, Nameplate, User, UserPrimaryGuild } from './types.js'

export const baseUser: User = {
  // This allows typescript to still check for type errors on functions below
  ...(undefined as unknown as User),

  get tag() {
    return this.discriminator === '0' ? this.username : `${this.username}#${this.discriminator}`
  },
  get bot() {
    return !!this.toggles?.has('bot')
  },
  get system() {
    return !!this.toggles?.has('system')
  },
  get mfaEnabled() {
    return !!this.toggles?.has('mfaEnabled')
  },
  get verified() {
    return !!this.toggles?.has('verified')
  },
}

export function transformUser(bot: Bot, payload: DiscordUser): User {
  const user: SetupDesiredProps<User, TransformersDesiredProperties, DesiredPropertiesBehavior> = Object.create(baseUser)
  const props = bot.transformers.desiredProperties.user

  if (props.toggles) user.toggles = new UserToggles(payload)
  if (props.flags) user.flags = new ToggleBitfield(payload.flags)
  if (props.publicFlags) user.publicFlags = new ToggleBitfield(payload.public_flags)
  if (props.id && payload.id) user.id = bot.transformers.snowflake(payload.id)
  if (props.username && payload.username) user.username = payload.username
  if (props.globalName && payload.global_name) user.globalName = payload.global_name
  if (props.discriminator && payload.discriminator) user.discriminator = payload.discriminator
  if (props.locale && payload.locale) user.locale = payload.locale
  if (props.email && payload.email) user.email = payload.email
  if (props.premiumType && payload.premium_type) user.premiumType = payload.premium_type
  if (props.avatar && payload.avatar) user.avatar = iconHashToBigInt(payload.avatar)
  if (props.banner && payload.banner) user.banner = iconHashToBigInt(payload.banner)
  if (props.accentColor && payload.accent_color) user.accentColor = payload.accent_color
  if (props.avatarDecorationData && payload.avatar_decoration_data)
    user.avatarDecorationData = bot.transformers.avatarDecorationData(bot, payload.avatar_decoration_data)
  if (props.collectibles && payload.collectibles) user.collectibles = bot.transformers.collectibles(bot, payload.collectibles)
  if (props.primaryGuild && payload.primary_guild) user.primaryGuild = bot.transformers.userPrimaryGuild(bot, payload.primary_guild)

  return bot.transformers.customizers.user(bot, payload, user)
}

export function transformCollectibles(bot: Bot, payload: DiscordCollectibles): Collectibles {
  const collectibles = {} as SetupDesiredProps<Collectibles, TransformersDesiredProperties, DesiredPropertiesBehavior>
  const props = bot.transformers.desiredProperties.collectibles

  if (props.nameplate && payload.nameplate) collectibles.nameplate = bot.transformers.nameplate(bot, payload.nameplate)

  return bot.transformers.customizers.collectibles(bot, payload, collectibles)
}

export function transformNameplate(bot: Bot, payload: DiscordNameplate): Nameplate {
  const nameplate = {} as SetupDesiredProps<Nameplate, TransformersDesiredProperties, DesiredPropertiesBehavior>
  const props = bot.transformers.desiredProperties.nameplate

  if (props.skuId && payload.sku_id) nameplate.skuId = bot.transformers.snowflake(payload.sku_id)
  if (props.asset && payload.asset) nameplate.asset = payload.asset
  if (props.label && payload.label) nameplate.label = payload.label
  if (props.palette && payload.palette) nameplate.palette = payload.palette

  return bot.transformers.customizers.nameplate(bot, payload, nameplate)
}

export function transformUserPrimaryGuild(bot: Bot, payload: DiscordUserPrimaryGuild): UserPrimaryGuild {
  const userPrimaryGuild = {} as SetupDesiredProps<UserPrimaryGuild, TransformersDesiredProperties, DesiredPropertiesBehavior>
  const props = bot.transformers.desiredProperties.userPrimaryGuild

  if (props.identityGuildId && payload.identity_guild_id) userPrimaryGuild.identityGuildId = bot.transformers.snowflake(payload.identity_guild_id)
  if (props.identityEnabled && payload.identity_enabled) userPrimaryGuild.identityEnabled = payload.identity_enabled
  if (props.tag && payload.tag) userPrimaryGuild.tag = payload.tag
  if (props.badge && payload.badge) userPrimaryGuild.badge = iconHashToBigInt(payload.badge)

  return bot.transformers.customizers.userPrimaryGuild(bot, payload, userPrimaryGuild)
}
