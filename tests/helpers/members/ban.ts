import { Bot } from "../../../src/bot.ts";
import { CreateGuildBan } from "../../../src/types/mod.ts";

export async function banTest(bot: Bot, t: Deno.TestContext, guildId: bigint, id: bigint, options?: CreateGuildBan) {
    await bot.helpers.ban(guildId, 456226577798135808n)
}

export async function getBansTest(bot: Bot, t: Deno.TestContext, guildId: bigint) {
    await bot.helpers.getBans(guildId)
}

export async function banTestWReason(bot: Bot, t: Deno.TestContext, guildId: bigint, id: bigint, options?: CreateGuildBan) {
    await bot.helpers.ban(guildId, 456226577798135808n, {reason: "Blame Wolf"})
}

export async function unbanTest(bot: Bot, t: Deno.TestContext, guildId: bigint, id: bigint) {
    await bot.helpers.unban(guildId, 456226577798135808n)
}