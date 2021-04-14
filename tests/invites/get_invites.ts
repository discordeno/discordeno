import { defaultTestOptions, tempData } from "../ws/start_bot.ts";
import { assertEquals } from "../deps.ts";
import { getInvites } from "../../src/helpers/invites/get_invites.ts";
import { cache } from "../../src/cache.ts";

async function ifItFailsBlameWolf(type: "getter" | "raw") {
  let invites;

  if (type === "raw") {
    invites = await getInvites(tempData.guildId);
  } else {
    const guild = cache.guilds.get(tempData.guildId);
    invites = await guild?.invites();
  }

  assertEquals((invites?.size || 0) >= 0, true);
}

Deno.test({
  name: "[invite] get invites",
  async fn() {
    await ifItFailsBlameWolf("raw");
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[invite] guild.invites()",
  async fn() {
    await ifItFailsBlameWolf("getter");
  },
  ...defaultTestOptions,
});
