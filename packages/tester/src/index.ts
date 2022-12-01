import { createBot, startBot } from '@discordeno/bot'
import { Intents } from '@discordeno/types'

const bot = createBot({
  token:
    '',
  intents: Intents.GuildMessages | Intents.MessageContent
})

await startBot(bot)

bot.events.messageCreate = console.log
