import { ChannelTypes } from "../../mod.ts";
import { assertEquals, assertExists, assertNotEquals, assertRejects } from "../deps.ts";
import { loadBot } from "../mod.ts";

Deno.test({
  name: "[guild] Create a guild",
  ignore: Deno.env.get("TEST_ENV") === "UNIT",
  async fn(t) {
    const bot = loadBot();

    // Delete the oldest guild(most likely to have finished tests).

    const guild = await bot.helpers.createGuild({
      name: "Discordeno-test",
    });
    assertExists(guild.id);

    try {
      await t.step("[guild] Get a guild", async () => {
        const exists = await bot.helpers.getGuild(guild.id);
        assertExists(exists);
        assertExists(exists.id);
        assertEquals(exists.name, guild.name);
      });

      await t.step("[guild] Edit a guild", async (t) => {
        const voiceChannel = await bot.helpers.createChannel(guild.id, {
          name: "edit-guild-test",
          type: ChannelTypes.GuildVoice,
        });
        assertExists(voiceChannel.id);

        const edited = await bot.helpers.editGuild(guild.id, {
          name: "Discordeno-test-edited",
          afkChannelId: voiceChannel.id,
          // afkTimeout: 5,
        }, guild.shardId);
        assertEquals(edited.name, "Discordeno-test-edited");
        assertNotEquals(guild.afkChannelId, voiceChannel.id);
        assertEquals(edited.afkChannelId, voiceChannel.id);
        // assertEquals(guild.afkTimeout, 0);
        // assertEquals(edited.afkTimeout, 5);

        await t.step("[guild] Reset a guild's afk channel id", async () => {
          const edited2 = await bot.helpers.editGuild(guild.id, { afkChannelId: null }, guild.shardId);
          assertNotEquals(edited.afkChannelId, edited2.afkChannelId);
          assertEquals(edited2.afkChannelId, undefined);
        });

        await bot.helpers.deleteChannel(voiceChannel.id);
      });

      // await t.step("[guild] Edit a guild's afk settings", async () => {

      // });

      await t.step("[guild] Get audit logs", async () => {
        const auditLogs = await bot.helpers.getAuditLog(guild.id, { limit: 1 });
        assertExists(auditLogs.auditLogEntries.length);
      });

      // Get available voice regions
      await t.step("[guild] Get available voice regions", async () => {
        const regions = await bot.helpers.getVoiceRegions(guild.id);
        assertExists(regions.size);
      });

      // Get a guild ban
      await t.step("[guild] Get a guild ban", async (t) => {
        await bot.helpers.banMember(guild.id, 379643682984296448n);

        const fetchedBan = await bot.helpers.getBan(guild.id, 379643682984296448n);

        // Assertions
        assertExists(fetchedBan);
        assertEquals(fetchedBan.user.id, 379643682984296448n);

        // Get multiple guild bans
        await t.step("[guild] Get multiple guild bans", async () => {
          await bot.helpers.banMember(guild.id, 416477607966670869n);
          await bot.helpers.banMember(guild.id, 635383782576357407n);

          const fetchedBans = await bot.helpers.getBans(guild.id);

          // Assertions
          assertExists(fetchedBans);
        });
      });

      // Get vanity URL
      await t.step("[guild] Get vanity URL", async () => {
        await assertRejects(() => bot.helpers.getVanityUrl(guild.id));
      });

      // Emoji related tests

      // Create an emoji
      await t.step({
        name: "[emoji] create an emoji",
        async fn(t) {
          const bot = loadBot();
          const emoji = await bot.helpers.createEmoji(guild.id, {
            name: "blamewolf",
            image: "https://cdn.discordapp.com/emojis/814955268123000832.png",
            roles: [],
          });

          // Assertions
          assertExists(emoji.id);

          await bot.helpers.deleteEmoji(guild.id, emoji.id);
        },
      });

      // delete an emoji without a reason
      await t.step({
        name: "[emoji] delete an emoji without a reason",
        async fn(t) {
          const bot = loadBot();
          const emoji = await bot.helpers.createEmoji(guild.id, {
            name: "blamewolf",
            image: "https://cdn.discordapp.com/emojis/814955268123000832.png",
            roles: [],
          });

          // Assertions
          assertExists(emoji.id);

          await bot.helpers.deleteEmoji(guild.id, emoji.id);

          await assertRejects(() => bot.helpers.getEmoji(guild.id, emoji.id!));
        },
      });

      // delete an emoji with a reason
      await t.step({
        name: "[emoji] delete an emoji with a reason",
        async fn(t) {
          const bot = loadBot();
          const emoji = await bot.helpers.createEmoji(guild.id, {
            name: "blamewolf",
            image: "https://cdn.discordapp.com/emojis/814955268123000832.png",
            roles: [],
          });

          // Assertions
          assertExists(emoji.id);

          await bot.helpers.deleteEmoji(guild.id, emoji.id, "with a reason");

          await assertRejects(() => bot.helpers.getEmoji(guild.id, emoji.id!));
        },
      });

      // edit an emoji name
      await t.step({
        name: "[emoji] Edit an emoji name",
        async fn(t) {
          const bot = loadBot();
          const emoji = await bot.helpers.createEmoji(guild.id, {
            name: "blamewolf",
            image: "https://cdn.discordapp.com/emojis/814955268123000832.png",
            roles: [],
          });

          // Assertions
          assertExists(emoji.id);
          assertEquals(emoji.name, "blamewolf");

          await bot.helpers.editEmoji(guild.id, emoji.id, {
            name: "edited",
          });

          const edited = await bot.helpers.getEmoji(guild.id, emoji.id);

          assertEquals(edited.name, "edited");

          await bot.helpers.deleteEmoji(guild.id, emoji.id);
        },
      });

      // edit an emoji roles
      await t.step({
        name: "[emoji] Edit an emoji's roles",
        async fn(t) {
          const bot = loadBot();
          const emoji = await bot.helpers.createEmoji(guild.id, {
            name: "blamewolf",
            image: "https://cdn.discordapp.com/emojis/814955268123000832.png",
            roles: [],
          });

          // Assertions
          assertExists(emoji.id);
          assertEquals(emoji.name, "blamewolf");

          const role = await bot.helpers.createRole(guild.id, {
            name: "dd-test-emoji",
          });
          await bot.helpers.editEmoji(guild.id, emoji.id, {
            roles: [role.id],
          });

          const edited = await bot.helpers.getEmoji(guild.id, emoji.id);

          assertEquals(edited.roles?.length, 1);

          await bot.helpers.deleteEmoji(guild.id, emoji.id);
          await bot.helpers.deleteRole(guild.id, role.id);
        },
      });

      // get an emoji
      await t.step({
        name: "[emoji] get an emoji",
        async fn(t) {
          const bot = loadBot();
          const emoji = await bot.helpers.createEmoji(guild.id, {
            name: "blamewolf",
            image: "https://cdn.discordapp.com/emojis/814955268123000832.png",
            roles: [],
          });

          // Assertions
          assertExists(emoji.id);

          const exists = await bot.helpers.getEmoji(guild.id, emoji.id);
          assertExists(exists.id);
          assertEquals(emoji.id, exists.id);

          await bot.helpers.deleteEmoji(guild.id, emoji.id);
        },
      });

      await t.step({
        name: "[emoji] get all guild emojis",
        async fn(t) {
          const bot = loadBot();
          const emoji = await bot.helpers.createEmoji(guild.id, {
            name: "blamewolf",
            image: "https://cdn.discordapp.com/emojis/814955268123000832.png",
            roles: [],
          });

          const emoji2 = await bot.helpers.createEmoji(guild.id, {
            name: "blamewolf2",
            image: "https://cdn.discordapp.com/emojis/814955268123000832.png",
            roles: [],
          });

          // Assertions
          assertExists(emoji.id);
          assertExists(emoji2.id);

          const exists = await bot.helpers.getEmojis(guild.id);
          assertEquals(exists.size > 1, true);

          await bot.helpers.deleteEmoji(guild.id, emoji.id);
          await bot.helpers.deleteEmoji(guild.id, emoji2.id);
        },
      });

      // Delete a guild
      await t.step("[guild] Delete a guild", async () => {
        await bot.helpers.deleteGuild(guild.id);
        // Make sure the guild was deleted
        await assertRejects(() => bot.helpers.getGuild(guild.id));
      });
    } catch (error) {
      // If any errors arise, delete the guild
      await bot.helpers.deleteGuild(guild.id);
      // then throw the error
      throw error;
    }
  },
});
