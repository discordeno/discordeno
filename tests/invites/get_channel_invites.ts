import { cache } from "../../src/cache.ts";
import { createChannel } from "../../src/helpers/channels/create_channel.ts";
import { createInvite } from "../../src/helpers/invites/create_invite.ts";
import { getChannelInvites } from "../../src/helpers/invites/get_channel_invites.ts";
import { assertEquals, assertExists } from "../deps.ts";
import { delayUntil } from "../util/delay_until.ts";
import { defaultTestOptions, tempData } from "../ws/start_bot.ts";

Deno.test({
  name: "[invite] get channel invites",
  async fn() {
    const channel = await createChannel(tempData.guildId, {
      name: "invite-channel",
    });

    // Assertions
    assertExists(channel);

    // Delay the execution by 5 seconds to allow CHANNEL_CREATE event to be processed
    await delayUntil(10000, () => cache.channels.has(channel.id));

    if (!cache.channels.has(channel.id)) {
      throw new Error(
        "The channel seemed to be created but it was not cached.",
      );
    }

    const invite = await createInvite(channel.id, {
      maxAge: 86400,
      maxUses: 0,
      temporary: false,
      unique: false,
    });

    // Assertions
    assertExists(invite);

    const secondInvite = await createInvite(channel.id, {
      maxAge: 32400,
      maxUses: 5,
      temporary: true,
      unique: true,
    });

    // Assertions
    assertExists(secondInvite);

    assertEquals(
      (await getChannelInvites(channel.id))?.size,
      2,
    );
  },
  ...defaultTestOptions,
});
