import type { DiscordApplicationCommandPermissions, DiscordGuildApplicationCommandPermissions } from '@discordeno/types';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { callCustomizer } from '../transformers.js';
import type { ApplicationCommandPermissions, GuildApplicationCommandPermissions } from './types.js';

export function transformGuildApplicationCommandPermissions(
  bot: Bot,
  payload: Partial<DiscordGuildApplicationCommandPermissions>,
  extra?: { partial?: boolean },
) {
  const guildApplicationCommandPermissions = {} as SetupDesiredProps<
    GuildApplicationCommandPermissions,
    TransformersDesiredProperties,
    DesiredPropertiesBehavior
  >;

  if (payload.id) guildApplicationCommandPermissions.id = bot.transformers.snowflake(payload.id);
  if (payload.application_id) guildApplicationCommandPermissions.applicationId = bot.transformers.snowflake(payload.application_id);
  if (payload.guild_id) guildApplicationCommandPermissions.guildId = bot.transformers.snowflake(payload.guild_id);
  if (payload.permissions)
    guildApplicationCommandPermissions.permissions = payload.permissions.map((x) => bot.transformers.applicationCommandPermissions(bot, x));

  return callCustomizer('guildApplicationCommandPermissions', bot, payload, guildApplicationCommandPermissions, {
    partial: extra?.partial ?? false,
  });
}

export function transformApplicationCommandPermissions(
  bot: Bot,
  payload: Partial<DiscordApplicationCommandPermissions>,
  extra?: { partial?: boolean },
) {
  const applicationCommandPermissions = {} as SetupDesiredProps<
    ApplicationCommandPermissions,
    TransformersDesiredProperties,
    DesiredPropertiesBehavior
  >;

  if (payload.id) applicationCommandPermissions.id = bot.transformers.snowflake(payload.id);
  if (payload.type !== undefined) applicationCommandPermissions.type = payload.type;
  if (payload.permission !== undefined) applicationCommandPermissions.permission = payload.permission;

  return callCustomizer('applicationCommandPermissions', bot, payload, applicationCommandPermissions, {
    partial: extra?.partial ?? false,
  });
}
