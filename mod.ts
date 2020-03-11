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
      ready: () => logYellow("Bot ready emitted"),
      channel_create: channel => console.log(channel.permission_overwrites() || "can;t find")
    }
  })
}

startup()
