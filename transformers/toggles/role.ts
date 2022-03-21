import { DiscordRole } from "../../types/discord.ts";
import { ToggleBitfield } from "./ToggleBitfield.ts";

export const RoleToggle = {
  /** If this role is showed seperately in the user listing */
  hoist: 1 << 0,
  /** Whether this role is managed by an integration */
  managed: 1 << 1,
  /** Whether this role is mentionable */
  mentionable: 1 << 2,
};

export class RoleToggles extends ToggleBitfield {
  constructor(role: DiscordRole) {
    super();

    if (role.hoist) this.add(RoleToggle.hoist);
    if (role.managed) this.add(RoleToggle.managed);
    if (role.mentionable) this.add(RoleToggle.mentionable);
  }

  /** If this role is showed seperately in the user listing */
  get hoist() {
    return this.has("hoist");
  }

  /** Whether this role is managed by an integration */
  get managed() {
    return this.has("managed");
  }

  /** Whether this role is mentionable */
  get mentionable() {
    return this.has("mentionable");
  }

  /** Checks whether or not the permissions exist in this */
  has(permissions: RoleToggleKeys | RoleToggleKeys[]) {
    if (!Array.isArray(permissions)) return super.contains(RoleToggle[permissions]);

    return super.contains(permissions.reduce((a, b) => (a |= RoleToggle[b]), 0));
  }

  /** Lists all the toggles for the role and whether or not each is true or false. */
  list() {
    const json: Record<string, boolean> = {};
    for (const [key, value] of Object.entries(RoleToggle)) {
      json[key] = super.contains(value);
    }

    return json as Record<RoleToggleKeys, boolean>;
  }
}

export type RoleToggleKeys = keyof typeof RoleToggle;
