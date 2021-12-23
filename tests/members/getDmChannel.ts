import { bot } from "../mod.ts";

Deno.test("[member] get dm channel and send a message", async () => {
  // Itoh Alt ID
  const channel = await bot.helpers.getDmChannel(750661528360845322n);
  await bot.helpers.sendMessage(channel.id, {content: "https://i.imgur.com/doG55NR.png"});
});
