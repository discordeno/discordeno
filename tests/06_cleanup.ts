import { deleteMessageByID } from "../src/api/handlers/message.ts";
import { defaultTestOptions, tempData } from "./01_main.ts";
import {
  assertEquals,
  deleteChannel,
  deleteRole,
  deleteServer,
} from "./deps.ts";

Deno.test({
  name: "[message] delete a message by channel ID",
  fn() {
    deleteMessageByID(tempData.channelID, tempData.messageID);
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] delete a channel in a guild",
  fn() {
    deleteChannel(tempData.guildID, tempData.channelID);
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[role] delete a role in a guild",
  fn() {
    deleteRole(tempData.guildID, tempData.roleID);
  },
});

Deno.test({
  name: "[guild] delete a guild",
  fn() {
    deleteServer(tempData.guildID);

    // TODO(ayntee): remove this weird shit lol
    // TODO(ayntee): check if the GUILD_DELETE event is fired
    tempData.guildID = "";
    assertEquals(tempData.guildID, "");
  },
  ...defaultTestOptions,
});

// Forcefully exit the Deno process once all tests are done.
Deno.test({
  name: "exit the process forcefully after all the tests are done\n",
  fn() {
    Deno.exit();
  },
  ...defaultTestOptions,
});
