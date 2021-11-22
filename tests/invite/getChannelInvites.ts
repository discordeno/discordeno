import { assertEquals, assertExists } from "../deps.ts";
import { bot, channel } from "../mod.ts";

Deno.test({
  name: "[invite] get channels invites",
  async fn(t) {
    const invite = await bot.helpers.createInvite(channel.id, {
      maxAge: 86400,
      maxUses: 0,
      temporary: false,
      unique: true,
    });

    // Assertions
    assertExists(invite);

    const secondInvite = await bot.helpers.createInvite(channel.id, {
      maxAge: 0,
      maxUses: 2,
      temporary: true,
      unique: true,
    });

    // Assertions
    assertExists(secondInvite);

    const invites = await bot.helpers.getChannelInvites(channel.id);

    assertEquals(invites.size > 1, true);
  },
});
