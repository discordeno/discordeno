import { PermissionStrings } from "../../src/types/permissions/permission_strings.ts";
import { calculateBits } from "../../src/util/permissions.ts";
import { assertEquals } from "../deps.ts";
const permissionStrins: PermissionStrings[] = [
  "CREATE_INSTANT_INVITE",
  "KICK_MEMBERS",
  "BAN_MEMBERS",
  "ADMINISTRATOR",
  "MANAGE_CHANNELS",
  "MANAGE_GUILD",
  "ADD_REACTIONS",
  "VIEW_AUDIT_LOG",
  "PRIORITY_SPEAKER",
  "STREAM",
  "VIEW_CHANNEL",
  "SEND_MESSAGES",
  "SEND_TTS_MESSAGES",
  "MANAGE_MESSAGES",
  "EMBED_LINKS",
  "ATTACH_FILES",
  "READ_MESSAGE_HISTORY",
  "MENTION_EVERYONE",
  "USE_EXTERNAL_EMOJIS",
  "VIEW_GUILD_INSIGHTS",
  "CONNECT",
  "SPEAK",
  "MUTE_MEMBERS",
  "DEAFEN_MEMBERS",
  "MOVE_MEMBERS",
  "USE_VAD",
  "CHANGE_NICKNAME",
  "MANAGE_NICKNAMES",
  "MANAGE_ROLES",
  "MANAGE_WEBHOOKS",
  "MANAGE_EMOJIS",
  "USE_SLASH_COMMANDS",
  "REQUEST_TO_SPEAK",
  "MANAGE_THREADS",
  "USE_PUBLIC_THREADS",
  "USE_PRIVATE_THREADS",
  "USE_EXTERNAL_STICKERS",
];
const permissionString = "266287972351";
Deno.test({
  name: "[utils] calculate bits",
  fn() {
    assertEquals(calculateBits(permissionStrins), permissionString);
  },
});
