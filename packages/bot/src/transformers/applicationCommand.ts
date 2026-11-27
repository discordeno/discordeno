import type { DiscordApplicationCommand } from '@discordeno/types';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { callCustomizer } from '../transformers.js';
import type { ApplicationCommand } from './types.js';

export function transformApplicationCommand(bot: Bot, payload: Partial<DiscordApplicationCommand>, extra?: { partial?: boolean }) {
  const props = bot.transformers.desiredProperties.applicationCommand;
  const applicationCommand = {} as SetupDesiredProps<ApplicationCommand, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.id && payload.id) applicationCommand.id = bot.transformers.snowflake(payload.id);
  if (props.applicationId && payload.application_id) applicationCommand.applicationId = bot.transformers.snowflake(payload.application_id);
  if (props.guildId && payload.guild_id) applicationCommand.guildId = bot.transformers.snowflake(payload.guild_id);
  if (props.name && payload.name) applicationCommand.name = payload.name;
  if (props.nameLocalizations && payload.name_localizations) applicationCommand.nameLocalizations = payload.name_localizations;
  if (props.description && payload.description) applicationCommand.description = payload.description;
  if (props.descriptionLocalizations && payload.description_localizations)
    applicationCommand.descriptionLocalizations = payload.description_localizations;
  if (props.defaultMemberPermissions && payload.default_member_permissions)
    applicationCommand.defaultMemberPermissions = bot.transformers.snowflake(payload.default_member_permissions);
  if (props.dmPermission && payload.dm_permission !== undefined) applicationCommand.dmPermission = payload.dm_permission;
  if (props.type && payload.type !== undefined) applicationCommand.type = payload.type;
  if (props.version && payload.version) applicationCommand.version = payload.version;
  if (props.options && payload.options)
    applicationCommand.options = payload.options.map((option) => bot.transformers.applicationCommandOption(bot, option));

  return callCustomizer('applicationCommand', bot, payload, applicationCommand, {
    partial: extra?.partial ?? false,
  });
}
