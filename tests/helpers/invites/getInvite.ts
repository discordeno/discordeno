import { Bot } from "../../../bot.ts";
import { assertEquals, assertExists } from "../../deps.ts";

export async function getInviteTest(channelId: bigint) {
  const invite = await bot.helpers.createInvite(channelId, {
    maxAge: 86400,
    maxUses: 0,
    temporary: false,
    unique: false,
  });

  // Assertions
  assertExists(invite);

  const fetchedInvite = await bot.helpers.getInvite(invite.code);

  assertExists(fetchedInvite);
  assertEquals(fetchedInvite.code, invite.code);
}
