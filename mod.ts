import Client from "./module/client.ts";
import { configs } from "./configs.ts";
import { Intents } from "./types/options.ts";
import { logYellow, logGreen } from "./utils/logger.ts";

Client({
  token: configs.token,
  botID: "675412054529540107",
  intents: [Intents.GUILDS, Intents.GUILD_MESSAGES],
  eventHandlers: {
    ready: () => logYellow("Bot ready emitted"),
    raw: (data) => logGreen("[RAW] => " + JSON.stringify(data)),
  },
});
