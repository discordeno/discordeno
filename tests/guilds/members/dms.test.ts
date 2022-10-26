import { assertExists } from "../../deps.ts";
import { loadBot } from "../../mod.ts";

Deno.test({
  name: "[member] get dm channel and send a message",
  async fn() {
    const bot = loadBot();
    // Itoh Alt ID
    const channel = await bot.helpers.getDmChannel(750661528360845322n);
    assertExists(channel?.id);

    const message = await bot.helpers.sendMessage(channel.id, { content: "https://i.imgur.com/doG55NR.png" });
    assertExists(message?.content);
  },
});
