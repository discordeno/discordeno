import { bot, guild } from "../mod.ts";
import { assertEquals } from "../deps.ts";

Deno.test("[member] fetches the bot and compares the bot's id with the fetched member's id", async () => {
    const member = await bot.helpers.getMember(guild.id,bot.id);
    assertEquals(member.id, bot.id);
});
