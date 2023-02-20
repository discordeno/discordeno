import dotenv from 'dotenv'

dotenv.config({ path: '../../.env' })

if (!process.env.DISCORD_TOKEN) throw new Error('Token was not provided.')
export const token = process.env.DISCORD_TOKEN

export const E2E_TEST_GUILD_ID = process.env.E2E_TEST_GUILD_ID!
if (!E2E_TEST_GUILD_ID) throw new Error('COMMUNITY guild id was not provided.')
