import type { DiscordApplicationCommand } from '@discordeno/types';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { callCustomizer } from '../transformers.js';
import type { ApplicationCommand } from './types.js';

export function transformApplicationCommand(bot: Bot, payload: Partial<DiscordApplicationCommand>, extra?: { partial?: boolean }) {
  const applicationCommand = {} as SetupDesiredProps<ApplicationCommand, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (payload.id) applicationCommand.id = bot.transformers.snowflake(payload.id);
  if (payload.application_id) applicationCommand.applicationId = bot.transformers.snowflake(payload.application_id);
  if (payload.guild_id) applicationCommand.guildId = bot.transformers.snowflake(payload.guild_id);
  if (payload.name) applicationCommand.name = payload.name;
  if (payload.name_localizations) applicationCommand.nameLocalizations = payload.name_localizations;
  if (payload.description) applicationCommand.description = payload.description;
  if (payload.description_localizations) applicationCommand.descriptionLocalizations = payload.description_localizations;
  if (payload.default_member_permissions)
    applicationCommand.defaultMemberPermissions = bot.transformers.snowflake(payload.default_member_permissions);
  if (payload.dm_permission !== undefined) applicationCommand.dmPermission = payload.dm_permission;
  if (payload.type !== undefined) applicationCommand.type = payload.type;
  if (payload.version) applicationCommand.version = payload.version;
  if (payload.options) applicationCommand.options = payload.options.map((option) => bot.transformers.applicationCommandOption(bot, option));

  return callCustomizer('applicationCommand', bot, payload, applicationCommand, {
    partial: extra?.partial ?? false,
  });
}
