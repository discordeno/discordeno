import { assertExists } from "../deps.ts";
import { bot } from "../mod.ts";
import { ActivityTypes } from "../../src/types/activity/activityTypes.ts";
Deno.test("editBotStatus", function () {
  bot.helpers.editBotStatus({
    status: "dnd",
    activities: [{ name: "lts20050703", type: ActivityTypes.Game, createdAt: Date.now() }],
  });
  bot.events.presenceUpdate = function (_bot, presense, _oldPresense) {
    assertExists(presense);
  };
});
