import dotenv from 'dotenv'

dotenv.config()

if (!process.env.DISCORD_TOKEN) throw new Error('Token was not provided.')
export const token = process.env.DISCORD_TOKEN

const E2E_TEST_GUILD_ID = process.env.E2E_TEST_GUILD_ID
export const CACHED_COMMUNITY_GUILD_ID = E2E_TEST_GUILD_ID
  ? BigInt(E2E_TEST_GUILD_ID)
  : 907350958810480671n
