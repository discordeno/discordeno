import { dotEnvConfig } from './deps.ts.js'

dotEnvConfig({ export: true })
export const BOT_TOKEN = process.env.BOT_TOKEN || ''
export const BOT_ID = BigInt(atob(BOT_TOKEN.split('.')[0]))
