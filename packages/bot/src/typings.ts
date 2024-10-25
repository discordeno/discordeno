import { type DiscordGatewayPayload } from '@discordeno/types'
import type { Bot } from './bot.js'

export type BotGatewayHandler = (bot: Bot, data: DiscordGatewayPayload, shardId: number) => unknown
