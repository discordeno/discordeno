import Client from "./module/client.ts";
import { configs } from "./configs.ts";
import { Intents } from "./types/options.ts";
import { logYellow } from "./utils/logger.ts";
import { cache } from "./utils/cache.ts";

Client({
  token: configs.token,
  botID: "675412054529540107",
  intents: [Intents.GUILDS, Intents.GUILD_MESSAGES, Intents.GUILD_MEMBERS],
  eventHandlers: {
    ready: () => logYellow("Bot ready emitted"),
    // raw: (data) => logGreen("[RAW] => " + JSON.stringify(data)),
    messageCreate: async (message) => {
      if (message.author.id === "130136895395987456") {
        if (message.content.startsWith("!test")) {
          if (!message.guild_id) return;
          const guild = cache.guilds.get(message.guild_id);
          if (!guild) return logYellow("no guild");

        }
      }
    },
  },
});
