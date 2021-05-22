import { defaultTestOptions, tempData } from "../ws/start_bot.ts";
import { assertEquals, assertExists } from "../deps.ts";
import { cache } from "../../src/cache.ts";
import { createEmoji } from "../../src/helpers/emojis/create_emoji.ts";
import { delayUntil } from "../util/delay_until.ts";

Deno.test({
  name: "[emoji] create an emoji",
  async fn() {
    const emoji = await createEmoji(
      tempData.guildId,
      "blamewolf",
      "https://cdn.discordapp.com/emojis/814955268123000832.png",
      {
        name: "blamewolf",
        image: "https://cdn.discordapp.com/emojis/814955268123000832.png",
        roles: [],
      }
    );

    assertExists(emoji);

    await delayUntil(10000, () => cache.guilds.get(tempData.guildId)?.emojis?.has(emoji.id!));

    assertEquals(cache.guilds.get(tempData.guildId)?.emojis?.has(emoji.id!), true);
  },
  ...defaultTestOptions,
});
