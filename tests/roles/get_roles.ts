import { defaultTestOptions, tempData } from "../ws/start_bot.ts";
import { assertEquals } from "../deps.ts";
import { cache } from "../../src/cache.ts";
import { delayUntil } from "../util/delay_until.ts";
import { botId } from "../../src/bot.ts";
import { getRoles } from "../../src/helpers/roles/get_roles.ts";

Deno.test({
  name: "[role] get roles",
  async fn() {
    cache.guilds.get(tempData.guildId)?.roles.clear();

    await getRoles(tempData.guildId);

    await delayUntil(10000, () => cache.members.get(botId)?.guilds.get(tempData.guildId).roles.length > 0);

    assertEquals(cache.members.get(botId)?.guilds.get(tempData.guildId).roles.length > 0, true);
  },
  ...defaultTestOptions,
});
