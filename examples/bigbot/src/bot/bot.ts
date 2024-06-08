import type { Bot } from 'discordeno'
import { Collection, createBot, createRestManager } from 'discordeno'
import enableHelpersPlugin from 'discordeno/helpers-plugin'
import { createLogger } from 'discordeno/logger'
import { setupAnalyticsHooks } from '../analytics.js'
import { INTENTS, REST_URL } from '../configs.js'
import { setupEventHandlers } from './events/mod.js'
import type { MessageCollector } from './utils/collectors.js'
import { customizeInternals } from './utils/internals/mod.js'

const DISCORD_TOKEN = process.env.DISCORD_TOKEN!
const REST_AUTHORIZATION = process.env.REST_AUTHORIZATION!

export const bot = enableHelpersPlugin(
  customizeBot(
    createBot({
      token: DISCORD_TOKEN,
      intents: INTENTS,
    }),
  ),
)

/** Add custom props to your `bot` here */
// SETUP-DD-TEMP: If you want to add any custom props to `bot` you can do so here. Please make sure to also add them in the type below. As an example, i have added a `logger` property. You can add any useful methods or props you wish to have easily available.
function customizeBot<B extends Bot = Bot>(bot: B): BotWithCustomProps {
  const customized = bot as unknown as BotWithCustomProps
  customized.logger = createLogger({ name: '[Bot]' })
  customized.collectors = {
    messages: new Collection(),
  }
  customized.commandVersions = new Collection()

  return customized
}

// SETUP-DD-TEMP: If you want to add any custom props to `bot` you can do so here. Please make sure to also add them in the function above. Run a find all and change this to your Bot's name. For example, if your bot's name is Gamer change BotWithCustomProps to Gamer. This way whenever you need to provide the type for the Bot with your custom props it is your bots name.
// Note: ALWAYS edit the function above first before adding the type here.
export type BotWithCustomProps<B extends Bot = Bot> = B & {
  /** A easy to use logger to make clean log messages. */
  logger: ReturnType<typeof createLogger>
  /** Collectors that can be used to get input from users. */
  collectors: {
    /** Holds the pending messages collectors that users can respond to. */
    messages: Collection<bigint, MessageCollector>
  }
  /** The command versions for each guild id. */
  commandVersions: Collection<bigint, number>
}

// Example of how to customize internal discordeno stuff easily.
customizeInternals(bot)

// Setup event handlers.
setupEventHandlers()

bot.rest = createRestManager({
  token: DISCORD_TOKEN,
  secretKey: REST_AUTHORIZATION,
  customUrl: REST_URL,
})

// Add send fetching analytics hook to rest
setupAnalyticsHooks(bot.rest)
