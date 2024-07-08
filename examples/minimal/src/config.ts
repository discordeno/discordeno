const token = process.env.BOT_TOKEN
const devGuildId = process.env.DEV_GUILD_ID

if (!token) throw new Error('Missing BOT_TOKEN environment variable')
if (!devGuildId) throw new Error('Missing DEV_GUILD_ID environment variable')

export const configs: Config = {
  /** Get token from ENV variable */
  token,
  /** The server id where you develop your bot and want dev commands created. */
  devGuildId: BigInt(devGuildId),
}

export interface Config {
  token: string
  devGuildId: bigint
}
