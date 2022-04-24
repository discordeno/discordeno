import { DiscordMember, DiscordUser } from "../../types/discord.ts";
import { ToggleBitfield } from "./ToggleBitfield.ts";

export const MemberToggle = {
  /** Whether the user is deafened in voice channels */
  deaf: 1 << 0,
  /** Whether the user is muted in voice channels */
  mute: 1 << 1,
  /** Whether the user has not yet passed the guild's Membership Screening requirements */
  pending: 1 << 2,
};

export class MemberToggles extends ToggleBitfield {
  constructor(member: Partial<DiscordMember>) {
    super();

    if (member.deaf) this.add(MemberToggle.deaf);
    if (member.mute) this.add(MemberToggle.mute);
    if (member.pending) this.add(MemberToggle.pending);
  }

  /** Whether the user belongs to an OAuth2 application */
  get deaf() {
    return this.has("deaf");
  }

  /** Whether the user is muted in voice channels */
  get mute() {
    return this.has("mute");
  }

  /** Whether the user has not yet passed the guild's Membership Screening requirements */
  get pending() {
    return this.has("pending");
  }

  /** Checks whether or not the permissions exist in this */
  has(permissions: MemberToggleKeys | MemberToggleKeys[]) {
    if (!Array.isArray(permissions)) return super.contains(MemberToggle[permissions]);

    return super.contains(permissions.reduce((a, b) => (a |= MemberToggle[b]), 0));
  }

  /** Lists all the toggles for the role and whether or not each is true or false. */
  list() {
    const json: Record<string, boolean> = {};
    for (const [key, value] of Object.entries(MemberToggle)) {
      json[key] = super.contains(value);
    }

    return json as Record<MemberToggleKeys, boolean>;
  }
}

export type MemberToggleKeys = keyof typeof MemberToggle;
