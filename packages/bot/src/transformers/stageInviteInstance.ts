import type { BigString, DiscordInviteStageInstance } from '@discordeno/types'
import type { Bot } from '../bot.js'
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js'
import type { InviteStageInstance } from './types.js'

export function transformInviteStageInstance(bot: Bot, payload: DiscordInviteStageInstance, extra?: { guildId?: BigString }): InviteStageInstance {
  const props = bot.transformers.desiredProperties.inviteStageInstance
  const inviteStageInstance = {} as SetupDesiredProps<InviteStageInstance, TransformersDesiredProperties, DesiredPropertiesBehavior>

  if (props.members && payload.members) {
    inviteStageInstance.members = payload.members.map((member) =>
      // @ts-expect-error TODO: Partials
      bot.transformers.member(bot, member, {
        guildId: extra?.guildId,
        userId: member.user?.id,
      }),
    )
  }
  if (props.participantCount) inviteStageInstance.participantCount = payload.participant_count
  if (props.speakerCount) inviteStageInstance.participantCount = payload.participant_count
  if (props.topic && payload.topic) inviteStageInstance.topic = payload.topic

  return bot.transformers.customizers.inviteStageInstance(bot, payload, inviteStageInstance, {
    guildId: extra?.guildId ? bot.transformers.snowflake(extra.guildId) : undefined,
  })
}
