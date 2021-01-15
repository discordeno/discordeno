import { defaultTestOptions, tempData } from "./01_main.ts";
import {
  assertEquals,
  assertExists,
  createGuildRole,
  editRole,
  Role,
} from "./deps.ts";

Deno.test({
  name: "[role] create a role in a guild",
  async fn() {
    if (!tempData.guildID) {
      throw new Error("guildID not present in temporary data");
    }

    const name = "Discordeno Test";
    const role = await createGuildRole(tempData.guildID, {
      name,
    });

    // Assertions
    assertExists(role);
    assertEquals(role.name, name);

    tempData.roleID = role.id;
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[role] edit a role in a guild",
  async fn() {
    const name = "Discordeno Test Edited";
    const color = 4320244;
    const role = await editRole(tempData.guildID, tempData.roleID, {
      name,
      color,
      hoist: false,
      mentionable: false,
    }) as Role;

    // Assertions
    assertExists(role);
    assertEquals(role.name, name);
    assertEquals(role.color, color);
    assertEquals(role.hoist, false);
    assertEquals(role.mentionable, false);

    tempData.roleID = role.id;
  },
  ...defaultTestOptions,
});
