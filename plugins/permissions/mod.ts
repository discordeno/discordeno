import { BotWithCache } from "./deps.ts";
import { channels } from "./src/channels/mod.ts";
import { emojis } from "./src/emojis/mod.ts";
import { guilds } from "./src/guilds/mod.ts";
import { integrations } from "./src/integrations/mod.ts";
import { members } from "./src/members/mod.ts";
import { messages } from "./src/messages/mod.ts";
import { roles } from "./src/roles/mod.ts";
import { stickers } from "./src/stickers/mod.ts";
import { webhooks } from "./src/webhooks/mod.ts";

// PLUGINS MUST TAKE A BOT ARGUMENT WHICH WILL BE MODIFIED
export function enablePermissionsPlugin<B extends BotWithCache = BotWithCache>(bot: B): B {
  // PERM CHECKS REQUIRE CACHE DUH!
  if (!bot.enabledPlugins?.has("CACHE")) throw new Error("The PERMISSIONS plugin requires the CACHE plugin first.");

  // MARK THIS PLUGIN BEING USED
  bot.enabledPlugins.add("PERMISSIONS");

  // BEGIN OVERRIDING HELPER FUNCTIONS
  channels(bot);
  emojis(bot);
  guilds(bot);
  integrations(bot);
  members(bot);
  messages(bot);
  roles(bot);
  stickers(bot);
  webhooks(bot);

  // PLUGINS MUST RETURN THE BOT
  return bot;
}

export * from "./src/permissions.ts";
// DEFAULT MAKES IT SLIGHTLY EASIER TO USE
export default enablePermissionsPlugin;
