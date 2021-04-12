import { botId, startBot } from "../../src/bot.ts";
import { cache } from "../../src/cache.ts";
import { deleteServer } from "../../src/helpers/guilds/delete_server.ts";
import { delay } from "../../src/util/utils.ts";
import { ws } from "../../src/ws/ws.ts";
import { assertExists } from "../deps.ts";
import { delayUntil } from "../util/delay_until.ts";

// Set necessary settings
// Disables the logger which logs everything
ws.log = function (_x: string, _d: unknown) {
  // if (["RAW", "GUILD_CREATE", "HEARTBEATING_DETAILS"].includes(_x))
  //   return console.log(_x);
  // console.log(_x, _d);
};

// Default options for tests
export const defaultTestOptions: Partial<Deno.TestDefinition> = {
  sanitizeOps: false,
  sanitizeResources: false,
};

// Temporary data
export const tempData = {
  guildId: "",
  roleId: "",
  channelId: "",
  messageId: "",
};

Deno.test({
  name: "[ws] connect to gateway",
  async fn() {
    const token = Deno.env.get("DISCORD_TOKEN");
    if (!token) throw new Error("Token is not provided");

    await startBot({
      token,
      intents: [
        "GUILD_MESSAGES",
        "GUILDS",
        "GUILD_EMOJIS",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_EMOJIS",
      ],
    });

    // Delay the execution by 5 seconds
    await delay(3000);

    // DELETE GUILDS IF LESS THAN 10 SERVERS AS SAFETY MEASURE
    if (cache.guilds.size <= 10) {
      for (const guild of cache.guilds.values()) await deleteServer(guild.id);
    }

    // Assertions
    assertExists(botId);
  },
  ...defaultTestOptions,
});

// // Role

// Deno.test({
//   name: "[role] create a role in a guild",
//   async fn() {
//     if (!tempData.guildId) {
//       throw new Error("guildId not present in temporary data");
//     }

//     const name = "Discordeno Test";
//     const role = await createRole(tempData.guildId, {
//       name,
//     });

//     // Assertions
//     assertExists(role);
//     assertEquals(role.name, name);

//     tempData.roleId = role.id;
//   },
//   ...defaultTestOptions,
// });

// Deno.test({
//   name: "[role] edit a role in a guild",
//   async fn() {
//     const name = "Discordeno Test Edited";
//     const color = 4320244;
//     const role = await editRole(tempData.guildId, tempData.roleId, {
//       name,
//       color,
//       hoist: false,
//       mentionable: false,
//     }) as Role;

//     // Assertions
//     assertExists(role);
//     assertEquals(role.name, name);
//     assertEquals(role.color, color);
//     assertEquals(role.hoist, false);
//     assertEquals(role.mentionable, false);

//     tempData.roleId = role.id;
//   },
//   ...defaultTestOptions,
// });

// // Channel

// Deno.test({
//   name: "[channel] create a channel in a guild",
//   async fn() {
//     const channel = await createChannel(tempData.guildId, "test");

//     // Assertions
//     assertExists(channel);

//     tempData.channelId = channel.id;
//   },
//   ...defaultTestOptions,
// });

// Deno.test({
//   name: "[channel] get a channel in a guild",
//   async fn() {
//     const channel = await getChannel(tempData.channelId);

//     // Assertions
//     assertExists(channel);
//     assertEquals(channel.id, tempData.channelId);
//   },
//   ...defaultTestOptions,
// });

// Deno.test({
//   name: "[channel] edit a channel in a guild",
//   async fn() {
//     const channel = await editChannel(tempData.channelId, {
//       name: "discordeno-test-edited",
//       overwrites: [
//         {
//           id: tempData.roleId,
//           type: OverwriteType.ROLE,
//           allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
//           deny: ["USE_EXTERNAL_EMOJIS"],
//         },
//       ],
//     }) as Channel;

//     // Wait 5s for CHANNEL_UPDATE to fire
//     await delay(3000);

//     // Assertions
//     assertExists(channel);
//     assertEquals(channel.name, "discordeno-test-edited");
//   },
//   ...defaultTestOptions,
// });

// Deno.test({
//   name: "[channel] channel overwrite has permission",
//   fn() {
//     const channel = cache.channels.get(tempData.channelId);
//     if (!channel) throw new Error("Channel not found");
//     if (!channel.permissionOverwrites) {
//       throw new Error("permissionOverwrites not found");
//     }

//     const hasPerm = channelOverwriteHasPermission(
//       tempData.guildId,
//       tempData.roleId,
//       channel.permissionOverwrites,
//       ["VIEW_CHANNEL", "SEND_MESSAGES"],
//     );
//     const missingPerm = channelOverwriteHasPermission(
//       tempData.guildId,
//       tempData.roleId,
//       channel.permissionOverwrites,
//       ["USE_EXTERNAL_EMOJIS"],
//     );

//     assertEquals(hasPerm, true);
//     assertEquals(missingPerm, false);
//   },
//   ...defaultTestOptions,
// });

// // Message

// Deno.test({
//   name: "[message] send a message in a text channel",
//   async fn() {
//     const message = await sendMessage(tempData.channelId, {
//       embed: {
//         title: "Discordeno Test",
//       },
//     });

//     // Assertions
//     assertExists(message);
//     assertEquals(message.embeds[0].title, "Discordeno Test");

//     tempData.messageId = message.id;
//   },
//   ...defaultTestOptions,
// });

// Deno.test({
//   name: "[message] get a message in a guild",
//   async fn() {
//     const message = await getMessage(tempData.channelId, tempData.messageId);

//     // Assertions
//     assertExists(message);
//     assertEquals(message.embeds[0].title, "Discordeno Test");
//   },
//   ...defaultTestOptions,
// });

// Deno.test({
//   name: "[message] pin a message in a channel",
//   async fn() {
//     await pinMessage(tempData.channelId, tempData.messageId);
//   },
//   ...defaultTestOptions,
// });

// Deno.test({
//   name: "[message] get pinned message in a channel",
//   async fn() {
//     const [msg] = await getPins(tempData.channelId);

//     // Assertions
//     assertExists(msg);
//     assertEquals(msg.id, tempData.messageId);
//     assertEquals(msg.pinned, true);
//   },
//   ...defaultTestOptions,
// });

// Deno.test({
//   name: "[message] unpin a message",
//   async fn() {
//     await unpinMessage(tempData.channelId, tempData.messageId);
//   },
//   ...defaultTestOptions,
// });

// Deno.test({
//   name: "[message] add a reaction to a message",
//   async fn() {
//     // TODO: add tests for a guild emoji ― <:name:id>

//     await addReaction(tempData.channelId, tempData.messageId, "👍");
//   },
//   ...defaultTestOptions,
// });

// // TODO(ayntee): add unit tests for getReactions()

// Deno.test({
//   name: "[message] remove a reaction to a message",
//   async fn() {
//     await removeReaction(tempData.channelId, tempData.messageId, "👍");
//   },
//   ...defaultTestOptions,
// });

// // Cleanup

// Deno.test({
//   name: "[message] delete a message by channel Id",
//   async fn() {
//     await deleteMessage(tempData.channelId, tempData.messageId);
//   },
//   ...defaultTestOptions,
// });

// Deno.test({
//   name: "[channel] delete a channel in a guild",
//   async fn() {
//     await deleteChannel(tempData.guildId, tempData.channelId);
//   },
//   ...defaultTestOptions,
// });

// Deno.test({
//   name: "[role] delete a role in a guild",
//   async fn() {
//     await deleteRole(tempData.guildId, tempData.roleId);
//   },
//   ...defaultTestOptions,
// });
