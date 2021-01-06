import { Overwrite } from "../api/types/mod.ts";
import { calculateBits } from "./permissions.ts";

export function toPermissionOverwritesPayload(
  overwrites: Overwrite[] | undefined,
) {
  if (!overwrites) return undefined;
  return overwrites.map((perm) => ({
    ...perm,
    allow: calculateBits(perm.allow),
    deny: calculateBits(perm.deny),
  }));
}
