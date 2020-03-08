import Client from "./module/client.ts"
import { configs } from "./configs.ts"
import { Intents } from "./types/options.ts"
import { logYellow } from "./utils/logger.ts"

const startup = async () => {
  new Client({
    token: configs.token,
    bot_id: "675412054529540107",
    intents: [Intents.GUILDS, Intents.GUILD_MESSAGES],
    event_handlers: {
      guild_create: guild => logYellow(guild.roles().toString())
    }
  })
}

startup()
