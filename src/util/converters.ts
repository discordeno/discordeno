import { OverwritePayload } from "../../mod.ts";
import { Overwrite, OverwriteTypes } from "../api/types/mod.ts";
import { calculateBits, calculatePermissions } from "./permissions.ts";

export function toPermissionOverwritesPayload(
  overwrites: Overwrite[] | undefined,
): OverwritePayload[] | undefined {
  if (!overwrites) return undefined;
  return overwrites.map((overwrite) => ({
    ...overwrite,
    type: OverwriteTypes[overwrite.type],
    allow: calculateBits(overwrite.allow),
    deny: calculateBits(overwrite.deny),
  }));
}

export function toPermissionOverwrites(
  overwrites: OverwritePayload[] | undefined,
): Overwrite[] | undefined {
  if (!overwrites) return undefined;
  return overwrites.map((overwrite) => ({
    ...overwrite,
    type: overwrite.type ? "ROLE" : "MEMBER",
    allow: calculatePermissions(BigInt(overwrite.allow)),
    deny: calculatePermissions(BigInt(overwrite.deny)),
  }));
}
