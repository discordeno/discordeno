import { deleteChannelOverwriteTests } from "./helpers/channels/deleteChannelOverwrite.ts";
import { editChannelTests } from "./helpers/channels/editChannel.ts";

Deno.test({
  name: "[channel] delete a channel overwrite",
  async fn(t) {
    await deleteChannelOverwriteTests(guild.id);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[channel] edit a channel w/o a reason",
  async fn(t) {
    await editChannelTests(guild.id, {});
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[channel] edit a channel w/ a reason",
  async fn(t) {
    await editChannelTests(guild.id, { reason: "Blame wolf" });
  },
  ...sanitizeMode,
});

// import "./channels/connectToVoice.ts";
// import "./misc/editBotStatus.ts";

// import "./messages/reactions.ts";

// webhooks
import "./webhooks/deleteWebhook.ts";
import "./webhooks/deleteWebhookWithToken.ts";
// import "./webhooks/sendWebhook.ts";
// import "./webhooks/webhooks.ts";

// BENCHMARK TESTING
// import "./benchmark.ts";
