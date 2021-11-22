import { assertExists, assertNotEquals } from "../deps.ts";
import { bot, channel, guild } from "../mod.ts";

Deno.test({
  name: "[invite] get invites",
  async fn(t) {
    const invite = await bot.helpers.createInvite(channel.id, {
      maxAge: 86400,
      maxUses: 0,
      temporary: false,
      unique: false,
    });

    // Assertions
    assertExists(invite);

    const fetchedInvites = await bot.helpers.getInvites(guild.id);

    assertExists(fetchedInvites);
    assertNotEquals(fetchedInvites.size, 0);
  },
});
