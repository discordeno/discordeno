import type { BigString, DiscordInviteStageInstance, DiscordMember } from '@discordeno/types'
import { checkIfExists, type Bot, type Member } from '../index.js'

export function transformInviteStageInstance(bot: Bot, payload: DiscordInviteStageInstance & { guildId: BigString }): InviteStageInstance {
  const props = bot.transformers.desiredProperties.inviteStageInstance
  const inviteStageInstance = {} as InviteStageInstance

  if (props.members && checkIfExists(payload.members)) {
    inviteStageInstance.members = payload.members.map((member) =>
      bot.transformers.member(bot, <DiscordMember>member, payload.guildId, bot.transformers.snowflake(<string>member.user?.id)),
    )
  }
  if (props.participantCount && checkIfExists(payload.participant_count)) inviteStageInstance.participantCount = payload.participant_count
  if (props.speakerCount && checkIfExists(payload.speaker_count)) inviteStageInstance.participantCount = payload.participant_count
  if (props.topic && checkIfExists(payload.topic)) inviteStageInstance.topic = payload.topic

  return bot.transformers.customizers.inviteStageInstance(bot, payload, inviteStageInstance)
}

export interface InviteStageInstance {
  /** The members speaking in the Stage */
  members: Array<Partial<Member>>
  /** The number of users in the Stage */
  participantCount: number
  /** The number of users speaking in the Stage */
  speakerCount: number
  /** The topic of the Stage instance (1-120 characters) */
  topic: string
}
