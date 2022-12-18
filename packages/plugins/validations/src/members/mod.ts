import { Bot } from '../../deps.js'
import { editMember } from './editMember.js'

export function members (bot: Bot) {
  editMember(bot)

  // TODO: validations getDmChannel
  // if (userId === rest.id) {
  //   throw new Error(rest.constants.Errors.YOU_CAN_NOT_DM_THE_BOT_ITSELF)
  // }

  // TODO: validations pruneMembers
  // if (options.days && options.days < 1) {
  //   throw new Error(rest.constants.Errors.PRUNE_MIN_DAYS)
  // }
  // if (options.days && options.days > 30) {
  //   throw new Error(rest.constants.Errors.PRUNE_MAX_DAYS)
  // }

  // TODO: validations searchMembers
  // if (options?.limit) {
  //   if (options.limit < 1) {
  //     throw new Error(rest.constants.Errors.MEMBER_SEARCH_LIMIT_TOO_LOW)
  //   }
  //   if (options.limit > 1000) {
  //     throw new Error(rest.constants.Errors.MEMBER_SEARCH_LIMIT_TOO_HIGH)
  //   }
  // }
}
