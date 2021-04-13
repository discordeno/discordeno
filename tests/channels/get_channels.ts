import { cache } from "../../src/cache.ts";
import { createChannel } from "../../src/helpers/channels/create_channel.ts";
import { deleteChannel } from "../../src/helpers/channels/delete_channel.ts";
import { defaultTestOptions, tempData } from "../ws/start_bot.ts";
import { delayUntil } from "../util/delay_until.ts";
import { editChannel } from "../../src/helpers/channels/edit_channel.ts";
import { assertEquals } from "../deps.ts";
import { getChannel } from "../../src/helpers/channels/get_channel.ts";
import { botId } from "../../src/bot.ts";
import { getChannels } from "../../src/helpers/channels/get_channels.ts";

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
