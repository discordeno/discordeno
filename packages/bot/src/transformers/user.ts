import type { DiscordCollectibles, DiscordNameplate, DiscordUser, DiscordUserPrimaryGuild } from '@discordeno/types';
import { avatarUrl, defaultAvatarUrl, displayAvatarUrl, iconHashToBigInt, snowflakeToTimestamp } from '@discordeno/utils';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { callCustomizer } from '../transformers.js';
import { ToggleBitfield } from './toggles/ToggleBitfield.js';
import { UserToggles } from './toggles/user.js';
import type { Collectibles, Nameplate, User, UserPrimaryGuild } from './types.js';

export const baseUser: User = {
  // This allows typescript to still check for type errors on functions below
  ...(undefined as unknown as User),

  avatarUrl(options) {
    if (!this.avatar) return;
    return avatarUrl(this.id, this.avatar, options);
  },
  displayAvatarUrl(options) {
    return displayAvatarUrl(this.id, this.discriminator, this.avatar, options);
  },
  get defaultAvatarUrl() {
    return defaultAvatarUrl(this.id, this.discriminator);
  },
  get displayName() {
    return this.globalName ?? this.username;
  },
  get createdTimestamp() {
    return snowflakeToTimestamp(this.id);
  },
  get tag() {
    const isLegacy = this.discriminator !== '0' && this.discriminator !== '0000';
    return isLegacy ? `${this.username}#${this.discriminator}` : this.username;
  },
  get bot() {
    return !!this.toggles?.has('bot');
  },
  get system() {
    return !!this.toggles?.has('system');
  },
  get mfaEnabled() {
    return !!this.toggles?.has('mfaEnabled');
  },
  get verified() {
    return !!this.toggles?.has('verified');
  },
};

export function transformUser(bot: Bot, payload: Partial<DiscordUser>, extra?: { partial?: boolean }) {
  const user: SetupDesiredProps<User, TransformersDesiredProperties, DesiredPropertiesBehavior> = Object.create(baseUser);
  const props = bot.transformers.desiredProperties.user;

  if (props.toggles) user.toggles = new UserToggles(payload);
  if (props.flags) user.flags = new ToggleBitfield(payload.flags);
  if (props.publicFlags) user.publicFlags = new ToggleBitfield(payload.public_flags);
  if (props.id && payload.id) user.id = bot.transformers.snowflake(payload.id);
  if (props.username && payload.username) user.username = payload.username;
  if (props.globalName && payload.global_name) user.globalName = payload.global_name;
  if (props.discriminator && payload.discriminator) user.discriminator = payload.discriminator;
  if (props.locale && payload.locale) user.locale = payload.locale;
  if (props.email && payload.email) user.email = payload.email;
  if (props.premiumType && payload.premium_type) user.premiumType = payload.premium_type;
  if (props.avatar && payload.avatar) user.avatar = iconHashToBigInt(payload.avatar);
  if (props.banner && payload.banner) user.banner = iconHashToBigInt(payload.banner);
  if (props.accentColor && payload.accent_color) user.accentColor = payload.accent_color;
  if (props.avatarDecorationData && payload.avatar_decoration_data)
    user.avatarDecorationData = bot.transformers.avatarDecorationData(bot, payload.avatar_decoration_data);
  if (props.collectibles && payload.collectibles) user.collectibles = bot.transformers.collectibles(bot, payload.collectibles);
  if (props.primaryGuild && payload.primary_guild) user.primaryGuild = bot.transformers.userPrimaryGuild(bot, payload.primary_guild);

  return callCustomizer('user', bot, payload, user, {
    partial: extra?.partial ?? false,
  });
}

export function transformCollectibles(bot: Bot, payload: Partial<DiscordCollectibles>, extra?: { partial?: boolean }) {
  const collectibles = {} as SetupDesiredProps<Collectibles, TransformersDesiredProperties, DesiredPropertiesBehavior>;
  const props = bot.transformers.desiredProperties.collectibles;

  if (props.nameplate && payload.nameplate) collectibles.nameplate = bot.transformers.nameplate(bot, payload.nameplate);

  return callCustomizer('collectibles', bot, payload, collectibles, {
    partial: extra?.partial ?? false,
  });
}

export function transformNameplate(bot: Bot, payload: Partial<DiscordNameplate>, extra?: { partial?: boolean }) {
  const nameplate = {} as SetupDesiredProps<Nameplate, TransformersDesiredProperties, DesiredPropertiesBehavior>;
  const props = bot.transformers.desiredProperties.nameplate;

  if (props.skuId && payload.sku_id) nameplate.skuId = bot.transformers.snowflake(payload.sku_id);
  if (props.asset && payload.asset) nameplate.asset = payload.asset;
  if (props.label && payload.label) nameplate.label = payload.label;
  if (props.palette && payload.palette) nameplate.palette = payload.palette;

  return callCustomizer('nameplate', bot, payload, nameplate, {
    partial: extra?.partial ?? false,
  });
}

export function transformUserPrimaryGuild(bot: Bot, payload: Partial<DiscordUserPrimaryGuild>, extra?: { partial?: boolean }) {
  const userPrimaryGuild = {} as SetupDesiredProps<UserPrimaryGuild, TransformersDesiredProperties, DesiredPropertiesBehavior>;
  const props = bot.transformers.desiredProperties.userPrimaryGuild;

  if (props.identityGuildId && payload.identity_guild_id) userPrimaryGuild.identityGuildId = bot.transformers.snowflake(payload.identity_guild_id);
  if (props.identityEnabled && payload.identity_enabled) userPrimaryGuild.identityEnabled = payload.identity_enabled;
  if (props.tag && payload.tag) userPrimaryGuild.tag = payload.tag;
  if (props.badge && payload.badge) userPrimaryGuild.badge = iconHashToBigInt(payload.badge);

  return callCustomizer('userPrimaryGuild', bot, payload, userPrimaryGuild, {
    partial: extra?.partial ?? false,
  });
}
