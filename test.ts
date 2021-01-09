import { startBot } from "./mod.ts";
import { Intents } from "./src/types/mod.ts";

startBot({
  token: "",
  intents: [Intents.GUILD_MESSAGES, Intents.GUILDS],
});
