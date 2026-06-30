import type { BigString, DiscordInviteStageInstance } from '@discordeno/types';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { callCustomizer } from '../transformers.js';
import type { InviteStageInstance } from './types.js';

export function transformInviteStageInstance(
  bot: Bot,
  payload: Partial<DiscordInviteStageInstance>,
  extra?: { guildId?: BigString; partial?: boolean },
) {
  const props = bot.transformers.desiredProperties.inviteStageInstance;
  const inviteStageInstance = {} as SetupDesiredProps<InviteStageInstance, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.members && payload.members) {
    inviteStageInstance.members = payload.members.map((member) =>
      bot.transformers.member(bot, member, {
        guildId: extra?.guildId,
        userId: member.user?.id,
        partial: true,
      }),
    );
  }
  if (props.participantCount && payload.participant_count !== undefined) inviteStageInstance.participantCount = payload.participant_count;
  if (props.speakerCount && payload.speaker_count !== undefined) inviteStageInstance.speakerCount = payload.speaker_count;
  if (props.topic && payload.topic) inviteStageInstance.topic = payload.topic;

  return callCustomizer('inviteStageInstance', bot, payload, inviteStageInstance, {
    guildId: extra?.guildId ? bot.transformers.snowflake(extra.guildId) : undefined,
    partial: extra?.partial ?? false,
  });
}
