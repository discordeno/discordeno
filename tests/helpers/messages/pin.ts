import { Bot } from "../../../src/bot.ts";
import { assertEquals } from "../../deps.ts";
import { delayUntil } from "../../utils.ts";

export async function pinMessageTests(bot: Bot, channelId: bigint, messageId: bigint, t: Deno.TestContext) {
  let pinned = false;

  bot.events.channelPinsUpdate = function (bot, payload) {
    if (payload.channelId === channelId) pinned = !pinned;
  };

  await bot.helpers.pinMessage(channelId, messageId);

  await delayUntil(10000, () => pinned);

  assertEquals(true, pinned);

  await bot.helpers.unpinMessage(channelId, messageId);

  await delayUntil(10000, () => !pinned);

  assertEquals(false, pinned);
}
