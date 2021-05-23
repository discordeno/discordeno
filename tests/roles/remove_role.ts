import { defaultTestOptions, tempData } from "../ws/start_bot.ts";
import { assertEquals, assertExists } from "../deps.ts";
import { cache } from "../../src/cache.ts";
import { delayUntil } from "../util/delay_until.ts";
import { addRole } from "../../src/helpers/roles/add_role.ts";
import { createRole } from "../../src/helpers/roles/create_role.ts";
import { botId } from "../../src/bot.ts";
import { removeRole } from "../../src/helpers/roles/remove_role.ts";

async function ifItFailsBlameWolf(type: "getter" | "raw", reason?: string) {
  const role = await createRole(tempData.guildId, {
    name: "hoti",
  });

  assertExists(role);

  // Delay the execution by 5 seconds to allow GUILD_ROLE_CREATE event to be processed
  await delayUntil(10000, () => cache.guilds.get(tempData.guildId)?.roles.has(role.id));

  if (!cache.guilds.get(tempData.guildId)?.roles.has(role.id)) {
    throw new Error(`The role seemed to be created but it was not cached.`);
  }

  if (type === "raw") {
    await addRole(tempData.guildId, botId, role.id, reason);
  } else {
    await cache.members.get(botId)!.addRole(tempData.guildId, role.id, reason);
  }

  // Delay the execution by 5 seconds to allow GUILD_MEMBER_UPDATE event to be processed
  await delayUntil(10000, () => cache.members.get(botId)?.guilds.get(tempData.guildId)!.roles.includes(role.id));

  if (type === "raw") {
    await removeRole(tempData.guildId, botId, role.id, reason);
  } else {
    await cache.members.get(botId)!.removeRole(tempData.guildId, role.id, reason);
  }

  // Delay the execution by 5 seconds to allow GUILD_MEMBER_UPDATE event to be processed
  await delayUntil(10000, () => !cache.members.get(botId)?.guilds.get(tempData.guildId)!.roles.includes(role.id));

  assertEquals(cache.members.get(botId)?.guilds.get(tempData.guildId)!.roles.includes(role.id), false);
}

Deno.test({
  name: "[role] remove a role without a reason",
  async fn() {
    await ifItFailsBlameWolf("raw");
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[role] remove a role with a reason",
  async fn() {
    await ifItFailsBlameWolf("raw", "with a reason");
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[role] member.removeRole() without a reason",
  async fn() {
    await ifItFailsBlameWolf("getter");
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[role] member.removeRole() with a reason",
  async fn() {
    await ifItFailsBlameWolf("getter", "with a reason");
  },
  ...defaultTestOptions,
});
