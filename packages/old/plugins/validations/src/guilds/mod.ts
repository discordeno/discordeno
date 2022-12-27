import type { Bot } from '../../deps.js'
import { createGuild } from './createGuild.js'
import { events } from './events/index.js.js'

export function guilds (bot: Bot) {
  events(bot)
  createGuild(bot)

  // TODO: validations createEmoji
  // if (options.image && !options.image.startsWith('data:image/')) {
  //   options.image = await urlToBase64(options.image)
  // }

  // TODO: validations editGuild
  // if (options.icon && !options.icon.startsWith('data:image/')) {
  //   options.icon = await urlToBase64(options.icon)
  // }

  // if (options.banner && !options.banner.startsWith('data:image/')) {
  //   options.banner = await urlToBase64(options.banner)
  // }

  // if (options.splash && !options.splash.startsWith('data:image/')) {
  //   options.splash = await urlToBase64(options.splash)
  // }

  // TODO: validations getAuditLog
  // if (options?.limit) {
  //   options.limit =
  //     options.limit >= 1 && options.limit <= 100 ? options.limit : 50
  // }

  // TODO: validations getPruneCount
  // if (options?.days && options.days < 1) {
  //   throw new Error(rest.constants.Errors.PRUNE_MIN_DAYS)
  // }
  // if (options?.days && options.days > 30) {
  //   throw new Error(rest.constants.Errors.PRUNE_MAX_DAYS)
  // }
}
