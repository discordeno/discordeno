import type { Camelize, DiscordGuild } from '@discordeno/types'
import { logger, LogLevels } from "@discordeno/utils"
import { createRestManager } from '../../src/manager.js'
import { token } from './constants.js'

// eslint-disable-next-line prefer-const
export let cached = {
  guild: undefined as Camelize<DiscordGuild> | undefined
}

export const rest = createRestManager({
  token
})
rest.deleteQueueDelay = 10000;

// For debugging purposes
// logger.setLevel(LogLevels.Debug)
