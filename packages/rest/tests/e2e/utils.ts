import dotenv from 'dotenv'

dotenv.config()

if (!process.env.DISCORD_TOKEN) throw new Error('Token was not provided.')
export const token = process.env.DISCORD_TOKEN

const UNIT_TEST_GUILD_ID = process.env.UNIT_TEST_GUILD_ID
export const CACHED_COMMUNITY_GUILD_ID = UNIT_TEST_GUILD_ID
  ? BigInt(UNIT_TEST_GUILD_ID)
  : 907350958810480671n
