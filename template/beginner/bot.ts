import { configs } from "./configs.ts";
import {
  BotWithCache,
  BotWithHelpersPlugin,
  Collection,
  createBot,
  enableCachePlugin,
  enableCacheSweepers,
  enableHelpersPlugin,
  enablePermissionsPlugin,
} from "./deps.ts";
import { Command } from "./src/types/commands.ts";

// MAKE THE BASIC BOT OBJECT
const bot = createBot({
  token: configs.token,
  botId: configs.botId,
  intents: [],
  events: {},
});

// ENABLE ALL THE PLUGINS THAT WILL HELP MAKE IT EASIER TO CODE YOUR BOT
enableHelpersPlugin(bot);
enableCachePlugin(bot);
enableCacheSweepers(bot as BotWithCache);
enablePermissionsPlugin(bot as BotWithCache);

export interface BotClient extends BotWithCache<BotWithHelpersPlugin> {
  commands: Collection<string, Command>;
}

// THIS IS THE BOT YOU WANT TO USE EVERYWHERE IN YOUR CODE! IT HAS EVERYTHING BUILT INTO IT!
export const Bot = bot as BotClient;
// PREPARE COMMANDS HOLDER
Bot.commands = new Collection();
