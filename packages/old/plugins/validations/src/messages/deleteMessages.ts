import { Bot } from '../../deps.js'

export function deleteMessages (bot: Bot) {
  const deleteMessages = bot.helpers.deleteMessages

  bot.helpers.deleteMessages = async function (
    channelId,
    ids,
    reason
  ) {
    // TODO: validations
    // if (ids.length < 2) {
    //   throw new Error(rest.constants.Errors.DELETE_MESSAGES_MIN)
    // }
  
    // if (ids.length > 100) {
    //   console.warn(
    //     'This endpoint only accepts a maximum of 100 messages. Using the first 100 message ids provided.'
    //   )
    // }

    // 2 WEEKS
    const oldestAllowed = Date.now() - 1209600000

    ids = ids.filter((id) => {
      const createdAt = Number(bot.transformers.snowflake(id) / 4194304n + 1420070400000n)
      // IF MESSAGE IS OLDER THAN 2 WEEKS
      if (createdAt > oldestAllowed) return true

      console.log(
        `[Validation Plugin] Skipping bulk message delete of ID ${id} because it is older than 2 weeks.`
      )
      return false
    })

    if (ids.length < 2) throw new Error('Bulk message delete requires at least 2 messages.')

    return await deleteMessages(channelId, ids, reason)
  }
}
