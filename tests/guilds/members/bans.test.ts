import { assertEquals, assertExists, assertRejects } from "../../deps.ts";
import { loadBot } from "../../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../../utils.ts";

// THIS IS WOLF, IF ANYTHING BREAKS BLAME HIM!
const wolfID = 270273690074087427n;
// THIS IS IAN, HE PLAY GOLDEN SUN. BAN HIM BEFORE HE MAKES US ADDICTED TO IT!!!
const ianID = 90339695967350784n;
// THIS IS LTS, HE PLAY TETRIS EFFECT: CONNECTED. BAN HIM BEFORE HE MAKES US ADDICTED TO IT!!!
const ltsID = 379643682984296448n;

// THESE BAN TESTS SHOULD BE DONE ONE BY ONE
Deno.test({
  name: "[member] ban member test group",
  ignore: Deno.env.get("TEST_ENV") === "UNIT",
  async fn(t) {
    const bot = loadBot();

    // ban user from guild without reason
    await t.step({
      name: "[member] ban user from guild without reason",
      ignore: Deno.env.get("TEST_ENV") === "INTEGRATION",
      async fn(t) {
        await bot.helpers.banMember(CACHED_COMMUNITY_GUILD_ID, wolfID);

        // get a single user's ban
        await t.step({
          name: "[member] get a single user's ban",
          async fn(t) {
            assertExists(await bot.helpers.getBan(CACHED_COMMUNITY_GUILD_ID, wolfID));
          },
        });
      },
    });

    // ban member from guild with a reason
    await t.step({
      name: "[member] ban member from guild with a reason",
      ignore: Deno.env.get("TEST_ENV") === "INTEGRATION",
      async fn(t) {
        await bot.helpers.banMember(CACHED_COMMUNITY_GUILD_ID, ianID, { reason: "Blame Wolf" });
        assertExists(await bot.helpers.getBan(CACHED_COMMUNITY_GUILD_ID, ianID));
      },
    });

    // ban member from guild and delete messages
    await t.step("[member] ban member from guild and delete messages", async () => {
      await bot.helpers.banMember(CACHED_COMMUNITY_GUILD_ID, ltsID, { deleteMessageSeconds: 604800 });
      assertExists(await bot.helpers.getBan(CACHED_COMMUNITY_GUILD_ID, ltsID));
    });

    // get bans on a server
    await t.step({
      name: "[member] get bans on a server",
      ignore: Deno.env.get("TEST_ENV") === "INTEGRATION",
      async fn(t) {
        const bans = await bot.helpers.getBans(CACHED_COMMUNITY_GUILD_ID);
        assertEquals(bans.size > 1, true);
      },
    });

    // fetch a single member by id
    await t.step({
      name: "[member] fetch a single member by id",
      ignore: Deno.env.get("TEST_ENV") === "INTEGRATION",
      async fn(t) {
        const member = await bot.helpers.getMember(CACHED_COMMUNITY_GUILD_ID, bot.id);

        assertExists(member?.id);
      },
    });

    // unban member from guild
    await t.step({
      name: "[member] unban member from guild",
      ignore: Deno.env.get("TEST_ENV") === "INTEGRATION",
      async fn(t) {
        await Promise.all([
          bot.helpers.unbanMember(CACHED_COMMUNITY_GUILD_ID, wolfID),
          bot.helpers.unbanMember(CACHED_COMMUNITY_GUILD_ID, ianID),
        ]);

        await assertRejects(() => bot.helpers.getBan(CACHED_COMMUNITY_GUILD_ID, wolfID));
      },
    });
  },
});
