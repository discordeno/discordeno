import { BitwisePermissionFlags } from "./bitwisePermissionFlags.ts";

export type PermissionStrings = keyof typeof BitwisePermissionFlags;
export type Permission = PermissionStrings;
