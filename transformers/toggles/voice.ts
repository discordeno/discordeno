import { DiscordUser, DiscordVoiceState } from "../../types/discord.ts";
import { ToggleBitfield } from "./ToggleBitfield.ts";

export const VoiceStateToggle = {
  /** Whether this user is deafened by the server */
  deaf: 1 << 0,
  /** Whether this user is muted by the server */
  mute: 1 << 1,
  /** Whether this user is locally deafened */
  selfDeaf: 1 << 2,
  /** Whether this user is locally muted */
  selfMute: 1 << 3,
  /** Whether this user is streaming using "Go Live" */
  selfStream: 1 << 4,
  /** Whether this user's camera is enabled */
  selfVideo: 1 << 5,
  /** Whether this user is muted by the current user */
  suppress: 1 << 6,
};

export class VoiceStateToggles extends ToggleBitfield {
  constructor(voice: DiscordVoiceState) {
    super();

    if (voice.deaf) this.add(VoiceStateToggle.deaf);
    if (voice.mute) this.add(VoiceStateToggle.mute);
    if (voice.self_deaf) this.add(VoiceStateToggle.selfDeaf);
    if (voice.self_mute) this.add(VoiceStateToggle.selfMute);
    if (voice.self_stream) this.add(VoiceStateToggle.selfStream);
    if (voice.self_video) this.add(VoiceStateToggle.selfVideo);
    if (voice.suppress) this.add(VoiceStateToggle.suppress);
  }

  /** Whether this user is deafened by the server */
  get deaf() {
    return this.has("deaf");
  }

  /** Whether this user is muted by the server */
  get mute() {
    return this.has("mute");
  }

  /** Whether this user is locally deafened */
  get selfDeaf() {
    return this.has("selfDeaf");
  }

  /** Whether this user is locally muted */
  get selfMute() {
    return this.has("selfMute");
  }

  /** Whether this user is streaming using "Go Live" */
  get selfStream() {
    return this.has("selfStream");
  }

  /** Whether this user's camera is enabled */
  get selfVideo() {
    return this.has("selfVideo");
  }

  /** Whether this user is muted by the current user */
  get suppress() {
    return this.has("suppress");
  }

  /** Checks whether or not the permissions exist in this */
  has(permissions: VoiceStateToggleKeys | VoiceStateToggleKeys[]) {
    if (!Array.isArray(permissions)) return super.contains(VoiceStateToggle[permissions]);

    return super.contains(permissions.reduce((a, b) => (a |= VoiceStateToggle[b]), 0));
  }

  /** Lists all the toggles for the role and whether or not each is true or false. */
  list() {
    const json: Record<string, boolean> = {};
    for (const [key, value] of Object.entries(VoiceStateToggle)) {
      json[key] = super.contains(value);
    }

    return json as Record<VoiceStateToggleKeys, boolean>;
  }
}

export type VoiceStateToggleKeys = keyof typeof VoiceStateToggle;
