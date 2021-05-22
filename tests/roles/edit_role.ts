import { defaultTestOptions, tempData } from "../ws/start_bot.ts";
import { assertEquals, assertExists } from "../deps.ts";
import { cache } from "../../src/cache.ts";
import { delayUntil } from "../util/delay_until.ts";
import { createRole } from "../../src/helpers/roles/create_role.ts";
import { editRole } from "../../src/helpers/roles/edit_role.ts";

Deno.test({
  name: "[role] edit a role",
  async fn() {
    const role = await createRole(tempData.guildId, {
      name: "hoti",
    });

    assertExists(role);

    // Delay the execution by 5 seconds to allow GUILD_ROLE_CREATE event to be processed
    await delayUntil(10000, () => cache.guilds.get(tempData.guildId)?.roles.has(role.id));

    if (!cache.guilds.get(tempData.guildId)?.roles.has(role.id)) {
      throw new Error(`The role seemed to be created but it was not cached.`);
    }

    await editRole(tempData.guildId, role.id, {
      name: "#rememberAyntee",
    });

    // Delay the execution by 5 seconds to allow GUILD_ROLE_UPDATE event to be processed
    await delayUntil(10000, () => cache.guilds.get(tempData.guildId)?.roles.get(role.id)?.name === "#rememberAyntee");

    assertEquals(cache.guilds.get(tempData.guildId)?.roles.get(role.id)?.name === "#rememberAyntee", true);
  },
  ...defaultTestOptions,
});
