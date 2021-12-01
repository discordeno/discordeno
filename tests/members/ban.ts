import { banCounters } from "../constants.ts";
import { assertExists, assertEquals } from "../deps.ts";
import { bot, guild } from "../mod.ts";
import { delayUntil } from "../utils.ts";

// THIS IS WOLF, IF ANYTHING BREAKS BLAME HIM!
const wolfID = 270273690074087427n;
// THIS IS IAN, HE PLAY'S GOLDEN SUN. BAN BEFORE HE MAKES US ADDICTED TO IT!!!
const ianID = 90339695967350784n;

// THESE BAN TESTS SHOULD BE DONE ONE BY ONE
Deno.test({
  name: "[member] ban member test group",
  fn: async (t) => {
    await t.step({
      name: "[member] ban user from guild without reason",
      fn: async () => {
        bot.events.guildBanAdd = function (_, user) {
          banCounters.set(user.id, true);
        };

        await bot.helpers.banMember(guild.id, wolfID);

        await delayUntil(10000, () => banCounters.get(wolfID));

        assertEquals(banCounters.get(wolfID), true);
      },
    });

    await t.step({
      name: "[member] get a single user's ban",
      fn: async () => {
        assertExists(await bot.helpers.getBan(guild.id, 270273690074087427n));
      },
    });

    await t.step({
      name: "[member] ban member from guild with reason",
      fn: async () => {
        bot.events.guildBanAdd = function (_, user) {
          banCounters.set(user.id, true);
        };
    
        await bot.helpers.banMember(guild.id, ianID, { reason: "Blame Wolf" });
    
        await delayUntil(10000, () => banCounters.get(ianID));
    
        assertEquals(banCounters.get(wolfID), true);
      },
    });

    await t.step({
      name: "[member] get bans on a server",
      fn: async () => {
        const bans = await bot.helpers.getBans(guild.id);
        assertEquals(bans.size > 1, true);
      },
    });
    
    await t.step({
      name: "[member] fetch a single member by id",
      fn: async () => {
        await bot.helpers.fetchMembers(guild.id, 0, {
          userIds: [bot.id],
          limit: 1,
        });
    
        // Assertions
        assertExists(bot.members.get(BigInt(`${bot.id}${guild.id}`)));
      },
    });
    
    await t.step({
      name: "[member] unban member from guild",
      fn: async () => {
        bot.events.guildBanRemove = function (bot, user, guildId) {
          banCounters.set(user.id, false);
        };
    
        await Promise.all([bot.helpers.unbanMember(guild.id, wolfID), bot.helpers.unbanMember(guild.id, ianID)]);
    
        await delayUntil(10000, () => !banCounters.get(wolfID) && !banCounters.get(ianID));
    
        assertEquals(banCounters.get(wolfID), false);
        assertEquals(banCounters.get(ianID), false);
      },
    });
  },
});




