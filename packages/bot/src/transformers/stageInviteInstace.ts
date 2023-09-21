import type { BigString, DiscordInviteStageInstance, DiscordMember } from '@discordeno/types'
import type { Bot, Member } from '../index.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformInviteStageInstance(bot: Bot, payload: DiscordInviteStageInstance & { guildId: BigString }) {
  const props = bot.transformers.desiredProperties.inviteStageInstance
  const inviteStageInstance = {} as InviteStageInstance

  if (props.members) {
    inviteStageInstance.members = payload.members.map((member) =>
      bot.transformers.member(bot, <DiscordMember>member, payload.guildId, bot.transformers.snowflake(<string>member.user?.id)),
    )
  }
  if (props.participantCount) {
    inviteStageInstance.participantCount = payload.participant_count
  }
  if (props.speakerCount) {
    inviteStageInstance.participantCount = payload.participant_count
  }
  if (props.topic) {
    inviteStageInstance.topic = payload.topic
  }
  return inviteStageInstance
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
