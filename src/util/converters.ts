import { Overwrite, OverwriteTypes } from "../api/types/mod.ts";
import { calculateBits } from "./permissions.ts";

export function toPermissionOverwritesPayload(
  overwrites: Overwrite[] | undefined,
) {
  if (!overwrites) return undefined;
  return overwrites.map((overwrite) => ({
    ...overwrite,
    type: OverwriteTypes[overwrite.type],
    allow: calculateBits(overwrite.allow),
    deny: calculateBits(overwrite.deny),
  }));
}
