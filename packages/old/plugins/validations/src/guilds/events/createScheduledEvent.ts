import { Bot, ScheduledEventEntityType } from '../../../deps.js'

export function createScheduledEvent (bot: Bot) {
  const createScheduledEvent = bot.helpers.createScheduledEvent

  bot.helpers.createScheduledEvent = async function (guildId, options) {
    // TODO: validations
    // if (!validateLength(options.name, { min: 1, max: 100 })) {
    //   throw new Error('Name must be between 1-100 characters.')
    // }
    // if (
    //   options.description &&
    //   !validateLength(options.description, { max: 1000 })
    // ) {
    //   throw new Error('Description must be below 1000 characters.')
    // }
    // if (options.location) {
    //   if (!validateLength(options.location, { max: 100 })) {
    //     throw new Error('Location must be below 100 characters.')
    //   }
    //   if (options.entityType === ScheduledEventEntityType.Voice) {
    //     throw new Error('Location can not be provided for a Voice event.')
    //   }
    // }
    // if (options.entityType === ScheduledEventEntityType.External) {
    //   if (!options.scheduledEndTime) {
    //     throw new Error(
    //       'A scheduled end time is required when making an External event.'
    //     )
    //   }
    //   if (!options.location) {
    //     throw new Error('A location is required when making an External event.')
    //   }
    // }
    // if (
    //   options.scheduledStartTime &&
    //   options.scheduledEndTime &&
    //   options.scheduledStartTime > options.scheduledEndTime
    // ) {
    //   throw new Error('Cannot schedule event to end before starting.')
    // }

    if (options.entityType === ScheduledEventEntityType.StageInstance) {
      if (!options.channelId) {
        throw new Error(
          'A channel id is required for creating a stage scheduled event.'
        )
      }

      return await createScheduledEvent(guildId, options)
    }

    if (options.entityType === ScheduledEventEntityType.Voice) {
      if (!options.channelId) {
        throw new Error(
          'A channel id is required for creating a voice scheduled event.'
        )
      }
    }

    return await createScheduledEvent(guildId, options)
  }
}
