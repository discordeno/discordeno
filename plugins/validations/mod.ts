import { Bot } from "./deps.ts";
import setupChannelPermChecks from "./src/channels/mod.ts";
import setupEditMember from "./src/editMember.ts";
import setupGuildPermChecks from "./src/guilds/mod.ts";
import setupInteractionPermChecks from "./src/interactions/mod.ts";
import setupInvitesPermChecks from "./src/invites.ts";
import setupMessagePermChecks from "./src/messages/mod.ts";
import setupMiscPermChecks from "./src/misc/mod.ts";
import setupWebhooksPermChecks from "./src/webhooks/mod.ts";

// PLUGINS MUST TAKE A BOT ARGUMENT WHICH WILL BE MODIFIED
export function enableValidationsPlugin(bot: Bot) {
  // MARK THIS PLUGIN BEING USED
  bot.enabledPlugins.add("VALIDATIONS");

  // BEGIN OVERRIDING HELPER FUNCTIONS
  setupChannelPermChecks(bot);
  setupEditMember(bot);
  setupGuildPermChecks(bot);
  setupInteractionPermChecks(bot);
  setupInvitesPermChecks(bot);
  setupMessagePermChecks(bot);
  setupMiscPermChecks(bot);
  setupWebhooksPermChecks(bot);

  // PLUGINS MUST RETURN THE BOT
  return bot;
}

// DEFAULT MAKES IT SLIGHTLY EASIER TO USE
export default enableValidationsPlugin;
