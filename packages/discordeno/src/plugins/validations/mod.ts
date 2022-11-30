import { Bot } from "./deps.ts";
import { channels } from "./src/channels/mod.ts";
import { guilds } from "./src/guilds/mod.ts";
import { interactions } from "./src/interaction/mod.ts";
import { invites } from "./src/invites/mod.ts";
import { members } from "./src/members/mod.ts";
import { messages } from "./src/messages/mod.ts";
import { misc } from "./src/misc/mod.ts";
import { stickers } from "./src/stickers/mod.ts";
import { webhooks } from "./src/webhooks/mod.ts";

// PLUGINS MUST TAKE A BOT ARGUMENT WHICH WILL BE MODIFIED
export function enableValidationsPlugin<B extends Bot>(bot: B): B {
  // MARK THIS PLUGIN BEING USED
  bot.enabledPlugins.add("VALIDATIONS");

  // BEGIN OVERRIDING HELPER FUNCTIONS
  channels(bot);
  guilds(bot);
  interactions(bot);
  invites(bot);
  members(bot);
  messages(bot);
  misc(bot);
  stickers(bot);
  webhooks(bot);

  // PLUGINS MUST RETURN THE BOT
  return bot;
}

// EXPORT ALL UTIL FUNCTIONS
export * from "./src/applicationCommandOptions.ts";
export * from "./src/attachments.ts";
export * from "./src/components.ts";

// DEFAULT MAKES IT SLIGHTLY EASIER TO USE
export default enableValidationsPlugin;
