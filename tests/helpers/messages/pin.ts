import { assertEquals } from "../../deps.ts";
import { bot } from "../../mod.ts";
import { delayUntil } from "../../utils.ts";

export async function pinMessageTests(channelId: bigint, messageId: bigint) {
  let pinned = false;

  bot.events.channelPinsUpdate = function (_, payload) {
    if (payload.channelId === channelId) pinned = !pinned;
  };

  await bot.helpers.pinMessage(channelId, messageId);

  await delayUntil(10000, () => pinned);

  assertEquals(true, pinned);

  await bot.helpers.unpinMessage(channelId, messageId);

  await delayUntil(10000, () => !pinned);

  assertEquals(false, pinned);
}
