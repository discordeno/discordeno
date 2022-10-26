import { assertEquals, assertExists } from "../deps.ts";
import { loadBot } from "../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../utils.ts";

Deno.test({
  name: "[role] role unit tests",
  ignore: Deno.env.get("TEST_ENV") === "UNIT",
  async fn(t) {
    const bot = loadBot();
    const role = await bot.helpers.createRole(CACHED_COMMUNITY_GUILD_ID, {
      name: "test role",
    });

    assertExists(role.id);

    // Create a role with a reason
    await t.step("[role] Create a role with a reason", async () => {
      const role = await bot.helpers.createRole(CACHED_COMMUNITY_GUILD_ID, {
        name: "test role 2",
      }, "test reason");

      assertExists(role.id);

      await bot.helpers.deleteRole(CACHED_COMMUNITY_GUILD_ID, role.id);
    });

    // Create a role without a reason
    await t.step("[role] Create a role without a reason", async () => {
      const role = await bot.helpers.createRole(CACHED_COMMUNITY_GUILD_ID, {
        name: "test role 3",
      });

      assertExists(role.id);

      await bot.helpers.deleteRole(CACHED_COMMUNITY_GUILD_ID, role.id);
    });

    // Edit a role
    await t.step("[role] Edit a role", async (t) => {
      // Edit the roles name
      await t.step("[role] Edit the roles name", async () => {
        const edited = await bot.helpers.editRole(CACHED_COMMUNITY_GUILD_ID, role.id, {
          name: "test role 4",
        });
        assertEquals(edited.name, "test role 4");
      });

      // Edit the roles color
      await t.step("[role] Edit the roles color", async () => {
        const edited = await bot.helpers.editRole(CACHED_COMMUNITY_GUILD_ID, role.id, {
          color: 0x0000ff,
        });
        assertEquals(edited.color, 0x0000ff);
      });

      // Edit the roles hoist
      await t.step("[role] Edit the roles hoist", async (t) => {
        const edited = await bot.helpers.editRole(CACHED_COMMUNITY_GUILD_ID, role.id, {
          hoist: true,
        });
        assertEquals(edited.toggles.hoist, true);

        // Make hoist false
        await t.step("[role] Make hoist false", async () => {
          const edited = await bot.helpers.editRole(CACHED_COMMUNITY_GUILD_ID, role.id, {
            hoist: false,
          });
          assertEquals(edited.toggles.hoist, false);
        });
      });

      // Edit the roles mentionable
      await t.step("[role] Edit the roles mentionable", async (t) => {
        const edited = await bot.helpers.editRole(CACHED_COMMUNITY_GUILD_ID, role.id, {
          mentionable: true,
        });
        assertEquals(edited.toggles.mentionable, true);

        // Make mentionable false
        await t.step("[role] Make mentionable false", async () => {
          const edited = await bot.helpers.editRole(CACHED_COMMUNITY_GUILD_ID, role.id, {
            mentionable: false,
          });
          assertEquals(edited.toggles.mentionable, false);
        });
      });

      // Edit the roles permissions
      await t.step("[role] Edit the roles permissions", async (t) => {
        const edited = await bot.helpers.editRole(CACHED_COMMUNITY_GUILD_ID, role.id, {
          permissions: [
            "SEND_MESSAGES",
            "VIEW_CHANNEL",
          ],
        });
        assertEquals(
          edited.permissions.toString(),
          bot.utils.calculateBits([
            "SEND_MESSAGES",
            "VIEW_CHANNEL",
          ]),
        );
      });
    });

    // Assign a role to a user
    await t.step("[role] Assign a role to a user without a reason.", async (t) => {
      // Assign the role to the user
      await bot.helpers.addRole(CACHED_COMMUNITY_GUILD_ID, 130136895395987456n, role.id);
      const member = await bot.helpers.getMember(CACHED_COMMUNITY_GUILD_ID, 130136895395987456n);
      assertEquals(member?.roles.includes(role.id), true);

      // Remove the role from the user without a reason
      await t.step("[role] Remove the role from the user without a reason", async () => {
        await bot.helpers.removeRole(CACHED_COMMUNITY_GUILD_ID, 130136895395987456n, role.id);
        const member = await bot.helpers.getMember(CACHED_COMMUNITY_GUILD_ID, 130136895395987456n);
        assertEquals(member?.roles.includes(role.id), false);
      });

      // Add the role to the user with a reason
      await t.step("[role] Add the role to the user with a reason", async () => {
        await bot.helpers.addRole(CACHED_COMMUNITY_GUILD_ID, 130136895395987456n, role.id, "test reason");
        const member = await bot.helpers.getMember(CACHED_COMMUNITY_GUILD_ID, 130136895395987456n);
        assertEquals(member?.roles.includes(role.id), true);
      });

      // Remove the role from the user with a reason
      await t.step("[role] Remove the role from the user with a reason", async () => {
        await bot.helpers.removeRole(CACHED_COMMUNITY_GUILD_ID, 130136895395987456n, role.id, "test reason");
        const member = await bot.helpers.getMember(CACHED_COMMUNITY_GUILD_ID, 130136895395987456n);
        assertEquals(member?.roles.includes(role.id), false);
      });
    });

    // Delete a role
    await t.step("[role] Delete a role", async () => {
      await bot.helpers.deleteRole(CACHED_COMMUNITY_GUILD_ID, role.id);
      const deletedRoles = await bot.helpers.getRoles(CACHED_COMMUNITY_GUILD_ID);
      assertEquals(deletedRoles.has(role.id), false);
    });
  },
});
