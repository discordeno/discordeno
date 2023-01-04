import type { Camelize, DiscordGuild } from '@discordeno/types'
import { createRestManager } from '../../src/manager.js'
import { token } from './constants.js'

// eslint-disable-next-line prefer-const
export let cached = {
  guild: undefined as Camelize<DiscordGuild> | undefined
}

export const rest = createRestManager({
  token
})
