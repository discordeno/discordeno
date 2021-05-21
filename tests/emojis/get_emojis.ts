import { defaultTestOptions, tempData } from "../ws/start_bot.ts";
import { assertEquals } from "../deps.ts";
import { cache } from "../../src/cache.ts";
import { delayUntil } from "../util/delay_until.ts";
import { getEmojis } from "../../src/helpers/mod.ts";

Deno.test({
  name: "[emoji] get emojis",
  async fn() {
    cache.guilds.get(tempData.guildId)?.emojis?.clear();

    await getEmojis(tempData.guildId);

    await delayUntil(10000, () => (cache.guilds.get(tempData.guildId)?.emojis?.size || 0) > 0);

    assertEquals((cache.guilds.get(tempData.guildId)?.emojis?.size || 0) > 0, true);
  },
  ...defaultTestOptions,
});
