import { ChannelTypes } from "../../../mod.ts";
import { assertExists, assertNotEquals } from "../../deps.ts";
import { loadBot } from "../../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../../utils.ts";

Deno.test({
  name: "[invite] create an invite",
  ignore: Deno.env.get("TEST_ENV") === "UNIT",
  async fn(t) {
    const bot = loadBot();
    const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, {
      name: "Discordeno-test",
      type: ChannelTypes.GuildAnnouncement,
    });

    // Assertions
    assertExists(channel.id);

    const invite = await bot.helpers.createInvite(channel.id, {
      maxAge: 86400,
      maxUses: 0,
      temporary: false,
      unique: false,
    });

    // Assertions
    assertExists(invite.code);

    await t.step("[invite] Get an invite", async () => {
      const inv = await bot.helpers.getInvite(invite.code);
      assertExists(inv.code);
    });

    await t.step("[invite] Get an invite with counts", async () => {
      const inv = await bot.helpers.getInvite(invite.code, { withCounts: true });
      assertExists(inv.code);
      assertExists(inv.approximateMemberCount);
      assertExists(inv.approximatePresenceCount);
    });

    await t.step("[invite] Get an invite with expiration", async () => {
      const inv = await bot.helpers.getInvite(invite.code, { withExpiration: true });
      assertExists(inv.code);
      assertExists(invite.expiresAt);
    });

    await t.step("[invite] Get an invite with everything", async () => {
      const inv = await bot.helpers.getInvite(invite.code, { withCounts: true, withExpiration: true });
      assertExists(inv.code);
      assertExists(inv.approximateMemberCount);
      assertExists(inv.approximatePresenceCount);
      assertExists(invite.expiresAt);
    });

    await t.step("[invite] Get all guild invites.", async () => {
      const fetchedInvites = await bot.helpers.getInvites(CACHED_COMMUNITY_GUILD_ID);

      assertExists(fetchedInvites);
      assertNotEquals(fetchedInvites.size, 0);
    });

    await t.step("[invite] Get all channel invites.", async () => {
      const fetchedInvites = await bot.helpers.getChannelInvites(channel.id);

      assertExists(fetchedInvites);
      assertNotEquals(fetchedInvites.size, 0);
    });

    await t.step("[invite] Delete an invite", async () => {
      await bot.helpers.deleteInvite(invite.code);

      // THERE IS NO WAY TO VALIDATE IT DELETED SO WE JUST ASSUME IT DID
      // If you fetched a deleted invite, you get a full invite object. Thx discord.
    });

    // Delete the channel once test is done
    await bot.helpers.deleteChannel(channel.id);
  },
});
