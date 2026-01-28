import type { DiscordInviteMetadata } from '@discordeno/types';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { callCustomizer } from '../transformers.js';
import { ToggleBitfield } from './toggles/ToggleBitfield.js';
import type { Invite } from './types.js';

export function transformInvite(bot: Bot, payload: Partial<DiscordInviteMetadata>, extra?: { shardId?: number; partial?: boolean }) {
  const props = bot.transformers.desiredProperties.invite;
  const invite = {} as SetupDesiredProps<Invite, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.type && payload.type !== undefined) invite.type = payload.type;
  if (props.code && payload.code) invite.code = payload.code;
  if (props.createdAt && payload.created_at) invite.createdAt = Date.parse(payload.created_at);
  if (props.inviter && payload.inviter) invite.inviter = bot.transformers.user(bot, payload.inviter);
  if (props.maxAge && payload.max_age !== undefined) invite.maxAge = payload.max_age;
  if (props.maxUses && payload.max_uses !== undefined) invite.maxUses = payload.max_uses;
  if (props.targetType && payload.target_type) invite.targetType = payload.target_type;
  if (props.targetUser && payload.target_user) invite.targetUser = bot.transformers.user(bot, payload.target_user);
  if (props.targetApplication && payload.target_application)
    invite.targetApplication = bot.transformers.application(bot, payload.target_application, { shardId: extra?.shardId, partial: true });
  if (props.temporary && payload.temporary) invite.temporary = payload.temporary;
  if (props.uses && payload.uses) invite.uses = payload.uses;
  if (props.channelId && payload.channel?.id) invite.channelId = bot.transformers.snowflake(payload.channel.id);
  if (props.guildId && payload.guild?.id) invite.guildId = bot.transformers.snowflake(payload.guild.id);
  if (props.approximateMemberCount && payload.approximate_member_count) invite.approximateMemberCount = payload.approximate_member_count;
  if (props.approximatePresenceCount && payload.approximate_presence_count !== undefined)
    invite.approximatePresenceCount = payload.approximate_presence_count;
  if (props.guildScheduledEvent && payload.guild_scheduled_event)
    invite.guildScheduledEvent = bot.transformers.scheduledEvent(bot, payload.guild_scheduled_event);
  if (props.expiresAt && payload.expires_at) invite.expiresAt = Date.parse(payload.expires_at);
  if (props.flags && payload.flags) invite.flags = new ToggleBitfield(payload.flags);
  if (props.roles && payload.roles) invite.roles = payload.roles.map((role) => bot.transformers.role(bot, role));

  return callCustomizer('invite', bot, payload, invite, {
    shardId: extra?.shardId,
    partial: extra?.partial ?? false,
  });
}
