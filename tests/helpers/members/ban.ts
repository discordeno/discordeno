import { Bot } from "../../../bot.ts";
import { CreateGuildBan } from "../../../types/mod.ts";
import { assertEquals } from "../../deps.ts";
import { delayUntil } from "../../utils.ts";

export async function banTest(bot: Bot, t: Deno.TestContext, guildId: bigint, id: bigint, options?: CreateGuildBan) {
}

export async function getBansTest(bot: Bot, t: Deno.TestContext, guildId: bigint) {
}

export async function unbanTest(bot: Bot, t: Deno.TestContext, guildId: bigint, id: bigint) {
}
