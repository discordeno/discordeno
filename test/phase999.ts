import { assertEquals } from "./deps.ts";
import { defaultTestOptions, tempData } from "./mod.ts";
import { deleteServer } from "../src/helpers/guild.ts";
import { closeWS } from "../src/ws/shard.ts";

Deno.test({
  name: "[guild] delete a guild",
  async fn() {
    await deleteServer(tempData.guildID);

    // TODO(ayntee): remove this weird shit lol
    // TODO(ayntee): check if the GUILD_DELETE event is fired
    tempData.guildID = "";
    assertEquals(tempData.guildID, "");
  },
  ...defaultTestOptions,
});

// Forcefully exit the Deno process once all tests are done.
Deno.test({
  name: "[main] exit the process forcefully",
  fn() {
    closeWS();
  },
  ...defaultTestOptions,
});
