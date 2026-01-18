import type { BigString, DiscordRole, DiscordRoleColors } from '@discordeno/types';
import { iconHashToBigInt } from '@discordeno/utils';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { callCustomizer } from '../transformers.js';
import { Permissions } from './toggles/Permissions.js';
import { RoleToggles } from './toggles/role.js';
import type { Role, RoleColors } from './types.js';

export const baseRole: Role = {
  // This allows typescript to still check for type errors on functions below
  ...(undefined as unknown as Role),

  get tags() {
    return {
      botId: this.internalTags?.botId,
      integrationId: this.internalTags?.integrationId,
      subscriptionListingId: this.internalTags?.subscriptionListingId,
      availableForPurchase: this.toggles?.availableForPurchase,
      guildConnections: this.toggles?.guildConnections,
      premiumSubscriber: this.toggles?.premiumSubscriber,
    };
  },
  /** If this role is showed separately in the user listing */
  get hoist() {
    return !!this.toggles?.has('hoist');
  },
  /** Whether this role is managed by an integration */
  get managed() {
    return !!this.toggles?.has('managed');
  },
  /** Whether this role is mentionable */
  get mentionable() {
    return !!this.toggles?.has('mentionable');
  },
  /** Whether this is the guilds premium subscriber role */
  get premiumSubscriber() {
    return !!this.toggles?.has('premiumSubscriber');
  },
  /** Whether this role is available for purchase. */
  get availableForPurchase() {
    return !!this.toggles?.has('availableForPurchase');
  },
  /** Whether this is a guild's linked role. */
  get guildConnections() {
    return !!this.toggles?.has('guildConnections');
  },
};

export function transformRole(bot: Bot, payload: Partial<DiscordRole>, extra?: { guildId?: BigString; partial?: boolean }) {
  const role: SetupDesiredProps<Role, TransformersDesiredProperties, DesiredPropertiesBehavior> = Object.create(baseRole);
  const props = bot.transformers.desiredProperties.role;
  if (props.id && payload.id) role.id = bot.transformers.snowflake(payload.id);
  // Role name can be an empty string
  if (props.name && payload.name !== undefined) role.name = payload.name;
  if (props.position && payload.position !== undefined) role.position = payload.position;
  if (props.guildId && extra?.guildId) role.guildId = bot.transformers.snowflake(extra?.guildId);
  if (props.color && payload.color !== undefined) role.color = payload.color;
  if (props.permissions && payload.permissions) role.permissions = new Permissions(payload.permissions);
  if (props.icon && payload.icon) role.icon = iconHashToBigInt(payload.icon);
  if (props.unicodeEmoji && payload.unicode_emoji) role.unicodeEmoji = payload.unicode_emoji;
  if (props.flags && payload.flags !== undefined) role.flags = payload.flags;
  if (props.tags && payload.tags) {
    role.internalTags = {};
    if (payload.tags.bot_id) role.internalTags.botId = bot.transformers.snowflake(payload.tags.bot_id);
    if (payload.tags.integration_id) role.internalTags.integrationId = bot.transformers.snowflake(payload.tags.integration_id);
    if (payload.tags.subscription_listing_id)
      role.internalTags.subscriptionListingId = bot.transformers.snowflake(payload.tags.subscription_listing_id);
  }
  if (props.toggles) role.toggles = new RoleToggles(payload);

  return callCustomizer('role', bot, payload, role, {
    guildId: extra?.guildId ? bot.transformers.snowflake(extra.guildId) : undefined,
    partial: extra?.partial ?? false,
  });
}

export function transformRoleColors(bot: Bot, payload: Partial<DiscordRoleColors>, extra?: { partial?: boolean }) {
  const roleColors = {} as SetupDesiredProps<RoleColors, TransformersDesiredProperties, DesiredPropertiesBehavior>;
  const props = bot.transformers.desiredProperties.roleColors;

  if (props.primaryColor && payload.primary_color !== undefined) roleColors.primaryColor = payload.primary_color;
  if (props.secondaryColor && payload.secondary_color !== undefined && payload.secondary_color !== null)
    roleColors.secondaryColor = payload.secondary_color;
  if (props.tertiaryColor && payload.tertiary_color !== undefined && payload.tertiary_color !== null)
    roleColors.tertiaryColor = payload.tertiary_color;

  return callCustomizer('roleColors', bot, payload, roleColors, {
    partial: extra?.partial ?? false,
  });
}
