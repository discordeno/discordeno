import { assertEquals } from "../deps.ts";
import { bot } from "../mod.ts";

Deno.test({
  name: "[member] format a members avatar url",
  fn: async (t) => {
    assertEquals(
      bot.helpers.avatarURL(130136895395987456n, "8840", {
        avatar: 4055337350987360625717955448021200177333n,
      }),
      "https://cdn.discordapp.com/avatars/130136895395987456/eae5905ad2d18d7c8deca20478b088b5.jpg?size=128",
    );
  },
});
