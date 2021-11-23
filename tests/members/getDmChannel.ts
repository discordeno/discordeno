import { bot } from "../mod.ts";

Deno.test("[member] get dm channel and send a message", async () => {
  // Skillz ID
  const channel = await bot.helpers.getDmChannel(130136895395987456n);
  await bot.helpers.sendMessage(channel.id, "https://i.imgur.com/doG55NR.png");
});
