import { cache } from "../../src/cache.ts";
import { getChannels } from "../../src/helpers/channels/get_channels.ts";
import { assertEquals } from "../deps.ts";
import { delayUntil } from "../util/delay_until.ts";
import { defaultTestOptions, tempData } from "../ws/start_bot.ts";

Deno.test({
  name: "[channel] get channels.",
  async fn() {
    cache.channels.clear();

    // Delete the channel now without a reason
    await getChannels(tempData.guildId);
    await delayUntil(3000, () => cache.channels.size > 0);

    assertEquals(
      cache.channels.size > 0,
      true,
    );
  },
  ...defaultTestOptions,
});
