import { assertEquals, assertExists, assertNotEquals } from "../deps.ts";
import { bot, channel, guild } from "../mod.ts";

Deno.test({
  name: "[invite] get invite",
  async fn(t) {
    const invite = await bot.helpers.createInvite(channel.id, {
      maxAge: 86400,
      maxUses: 0,
      temporary: false,
      unique: false,
    });

    // Assertions
    assertExists(invite);

    const fetchedInvite = await bot.helpers.getInvite(invite.code);

    assertExists(fetchedInvite);
    assertEquals(fetchedInvite.code, invite.code);

    await t.step({
      name: "[invite] get invites",
      async fn() {
        const fetchedInvites = await bot.helpers.getInvites(guild.id);

        assertExists(fetchedInvites);
        assertNotEquals(fetchedInvites.size, 0);
      },
    });
  },
});
