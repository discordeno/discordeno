import { defaultTestOptions, tempData } from "../ws/start_bot.ts";
import {assertEquals, assertExists} from "../deps.ts";
import { cache } from "../../src/cache.ts";
import { delayUntil } from "../util/delay_until.ts";
import {addRole} from "../../src/helpers/roles/add_role.ts";
import {createRole} from "../../src/helpers/roles/create_role.ts";
import {botId} from "../../src/bot.ts";
import {swapRoles} from "../../src/helpers/roles/swap_roles.ts";
import {delay} from "../../src/util/utils.ts";

Deno.test({
  name: "[role] swap roles",
  async fn() {
    const role = await createRole(tempData.guildId, {
      name: "hoti",
    });

    assertExists(role);

    const secondRole = await createRole(tempData.guildId, {
      name: "not hoti",
    });

    assertExists(secondRole);

    // Delay the execution by 5 seconds to allow GUILD_ROLE_CREATE event to be processed
    await delayUntil(10000, () => cache.guilds.get(tempData.guildId)?.roles.has(role.id) && cache.guilds.get(tempData.guildId)?.roles.has(secondRole.id));

    if (!cache.guilds.get(tempData.guildId)?.roles.has(role.id) || !cache.guilds.get(tempData.guildId)?.roles.has(secondRole.id)) {
      throw new Error(`The role seemed to be created but it was not cached.`);
    }

    const result = await swapRoles(tempData.guildId, [
      {
        id: role.id,
      },
      {
        id: secondRole.id,
      },
    ]);

    assertExists(result);
  },
  ...defaultTestOptions,
});
