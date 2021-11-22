import { assertExists } from "../deps.ts";
import { bot, channel } from "../mod.ts";

Deno.test({
  name: "[invite] delete an invite",
  async fn(t) {
    const invite = await bot.helpers.createInvite(channel.id, {
      maxAge: 86400,
      maxUses: 0,
      temporary: false,
      unique: false,
    });

    // Assertions
    assertExists(invite);

    const deletedInvite = await bot.helpers.deleteInvite(invite.code);

    // Assertions
    assertExists(deletedInvite);
  },
});
