import type { Camelize, DiscordGuild } from '@discordeno/types'
import dotenv from 'dotenv'
import { createRestManager } from '../../src/restManager.js'

dotenv.config()

if (!process.env.DISCORD_TOKEN) throw new Error('Token was not provided.')
export const token = process.env.DISCORD_TOKEN

const E2E_TEST_GUILD_ID = process.env.E2E_TEST_GUILD_ID
export const CACHED_COMMUNITY_GUILD_ID = E2E_TEST_GUILD_ID
  ? BigInt(E2E_TEST_GUILD_ID)
  : 907350958810480671n

// eslint-disable-next-line prefer-const
export let cached = {
  guild: undefined as Camelize<DiscordGuild> | undefined
}

export const rest = createRestManager({
  token
})
