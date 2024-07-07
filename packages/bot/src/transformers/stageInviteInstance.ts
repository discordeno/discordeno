import type { BigString, DiscordInviteStageInstance, DiscordMember } from '@discordeno/types'
import type { Bot, InviteStageInstance } from '../index.js'

export function transformInviteStageInstance(bot: Bot, payload: DiscordInviteStageInstance & { guildId: BigString }): InviteStageInstance {
  const props = bot.transformers.desiredProperties.inviteStageInstance
  const inviteStageInstance = {} as InviteStageInstance

  if (props.members && payload.members) {
    inviteStageInstance.members = payload.members.map((member) =>
      bot.transformers.member(
        bot,
        member as DiscordMember,
        payload.guildId,
        member.user?.id ? bot.transformers.snowflake(member.user.id) : undefined!,
      ),
    )
  }
  if (props.participantCount) inviteStageInstance.participantCount = payload.participant_count
  if (props.speakerCount) inviteStageInstance.participantCount = payload.participant_count
  if (props.topic && payload.topic) inviteStageInstance.topic = payload.topic

  return bot.transformers.customizers.inviteStageInstance(bot, payload, inviteStageInstance)
}
