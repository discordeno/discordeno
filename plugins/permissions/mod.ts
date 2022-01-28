import { BotWithCache } from "./deps.ts";
import setupChannelPermChecks from "./src/channels/mod.ts";
import setupDiscoveryPermChecks from "./src/discovery.ts";
import setupEditMember from "./src/editMember.ts";
import setupEmojiPermChecks from "./src/emojis.ts";
import setupGuildPermChecks from "./src/guilds/mod.ts";
import setupIntegrationPermChecks from "./src/integrations.ts";
import setupInteractionPermChecks from "./src/interactions/mod.ts";
import setupInvitesPermChecks from "./src/invites.ts";
import setupMemberPermChecks from "./src/members/mod.ts";
import setupMessagePermChecks from "./src/messages/mod.ts";
import setupMiscPermChecks from "./src/misc/mod.ts";
import setupRolePermChecks from "./src/roles/mod.ts";
import setupWebhooksPermChecks from "./src/webhooks/mod.ts";

// PLUGINS MUST TAKE A BOT ARGUMENT WHICH WILL BE MODIFIED
export function enablePermissionsPlugin(bot: BotWithCache) {
  // PERM CHECKS REQUIRE CACHE DUH!
  if (!bot.enabledPlugins?.has("CACHE")) {
    throw new Error("The PERMISSIONS plugin requires the CACHE plugin first.");
  }

  // MARK THIS PLUGIN BEING USED
  bot.enabledPlugins.add("PERMISSIONS");

  // BEGIN OVERRIDING HELPER FUNCTIONS
  setupChannelPermChecks(bot);
  setupDiscoveryPermChecks(bot);
  setupEmojiPermChecks(bot);
  setupEditMember(bot);
  setupGuildPermChecks(bot);
  setupIntegrationPermChecks(bot);
  setupInteractionPermChecks(bot);
  setupInvitesPermChecks(bot);
  setupMemberPermChecks(bot);
  setupMessagePermChecks(bot);
  setupMiscPermChecks(bot);
  setupRolePermChecks(bot);
  setupWebhooksPermChecks(bot);

  // PLUGINS MUST RETURN THE BOT
  return bot;
}

// EXPORT ALL UTIL FUNCTIONS
export * from "./src/permissions.ts";
// DEFAULT MAKES IT SLIGHTLY EASIER TO USE
export default enablePermissionsPlugin;
