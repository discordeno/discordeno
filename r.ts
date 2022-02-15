import { createBot } from "./bot.ts";

const bot = createBot({
  token: "",
  botId: 1n,
  events: {},
  intents: [],
});

await bot.helpers.deleteWebhookMessage(
  943082834103500820n,
  "LgGfOmEpEh13BP-u31TCUADsr0cE0LCn5ZTQM-RL1toQf0YUJBV5gd8tdpK0gC8c3J7Z",
  943083038240301056n,
);

// https://discord.com/api/webhooks/943082834103500820/LgGfOmEpEh13BP-u31TCUADsr0cE0LCn5ZTQM-RL1toQf0YUJBV5gd8tdpK0gC8c3J7Z
