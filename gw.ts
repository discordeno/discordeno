import { token } from "./debug.ts";
import { startBot } from "./src/bot.ts";
import { ws } from "./src/ws/ws.ts";

const started = Date.now();
let time = Date.now();

let idk = 0;
ws.log = function (type: string, x: any) {
    console.log(idk++, x)
}

startBot({
  token: token,
  intents: [
    "DirectMessageReactions",
    "DirectMessages",
    "GuildBans",
    "GuildEmojis",
    "GuildInvites",
    "GuildMembers",
    "GuildMessageReactions",
    "GuildMessages",
    "GuildVoiceStates",
    "Guilds",
  ],
  eventHandlers: {
    ready() {
      console.log(
        "Successfully connected to gateway",
        (Date.now() - started) / 1000,
        "seconds to start.",
      );
      console.log(`Fully online in ${(time - started) / 1000} seconds`);
      logMemory();
      setInterval(logMemory, 60000);
    },
    shardReady(id) {
      const here = Date.now();
      console.log(
        `SHARD READY`,
        id,
        (here - time) / 1000,
        "seconds to start.",
      );
      time = here;
    },
  },
});

let counter = 1;
function logMemory() {
  const usage = Deno.memoryUsage();
  const bytes = 1000000;
  console.log(
    `[${counter} v11] Memory Usage RSS: ${usage.rss /
      bytes}MB Heap Used: ${usage.heapUsed /
      bytes}MB Heap Total: ${usage.heapTotal /
      bytes}MB`,
  );
  counter++;
}