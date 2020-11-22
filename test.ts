import { startBot } from "./mod.ts";
import { Intents } from "./src/types/options.ts";

const token = "NzcxMDU2NzQzNTI1Nzc3NDM4.X5mkjQ.KhrhSnfw4fs1VfgRdg0cLxRrDkA";

await startBot({
  intents: [Intents.GUILDS, Intents.GUILD_MESSAGES],
  token,
  eventHandlers: {
    ready: () => console.log("hello :)"),
    debug: console.log,
  },
});
