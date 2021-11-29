import { assertExists } from "../deps.ts";
import { bot } from "../mod.ts";
import { ActivityTypes } from "../../src/types/activity/activityTypes.ts";
import { delayUntil } from "../utils.ts";

Deno.test("[misc] edit the bot's status", async function () {
  bot.events.presenceUpdate = function (_bot, presense, _oldPresense) {
    console.log('in pu')
    console.log('in pu')
    assertExists(presense);
  };

  bot.events.botUpdate = function (bot, user) {
    console.log('in bu')
    console.log('in bu')
  }
  
  bot.helpers.editBotStatus({
    status: "dnd",
    activities: [{ name: "lts20050703", type: ActivityTypes.Game, createdAt: Date.now() }],
  });

  await delayUntil(10000, () => false)
});
