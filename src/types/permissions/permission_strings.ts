import { DiscordBitwisePermissionFlags } from "./bitwise_permission_flags.ts";

export type PermissionStrings = keyof typeof DiscordBitwisePermissionFlags;
export type Permission = PermissionStrings;
