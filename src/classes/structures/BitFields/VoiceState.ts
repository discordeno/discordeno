import { voiceStateToggles } from "../../../structures/voice_state.ts";
import { BitField } from "./BitField.ts";

export class VoiceStateBitField extends BitField {
  constructor(bits: bigint) {
    super(bits);
  }

  /** Whether this user is deafened by the server */
  get deaf() {
    return this.has(voiceStateToggles.deaf);
  }

  /** Sets whether this user is deafened by the server */
  set deaf(value: boolean) {
    this.set(voiceStateToggles.deaf, value);
  }

  /** Whether this user is muted by the server */
  get mute() {
    return this.has(voiceStateToggles.mute);
  }

  /** Sets whether this user is muted by the server */
  set mute(value: boolean) {
    this.set(voiceStateToggles.mute, value);
  }

  /** Whether this user is locally deafened */
  get selfDeaf() {
    return this.has(voiceStateToggles.selfDeaf);
  }

  /** Sets whether this user is locally deafened */
  set selfDeaf(value: boolean) {
    this.set(voiceStateToggles.selfDeaf, value);
  }

  /** Whether this user is locally muted */
  get selfMute() {
    return this.has(voiceStateToggles.selfMute);
  }

  /** Sets whether this user is locally muted */
  set selfMute(value: boolean) {
    this.set(voiceStateToggles.selfMute, value);
  }

  /** Whether this user is streaming using "Go Live" */
  get selfStream() {
    return this.has(voiceStateToggles.selfStream);
  }

  /** Sets whether this user is streaming using "Go Live" */
  set selfStream(value: boolean) {
    this.set(voiceStateToggles.selfStream, value);
  }

  /** Whether this user's camera is enabled */
  get selfVideo() {
    return this.has(voiceStateToggles.selfVideo);
  }

  /** Sets whether this user's camera is enabled */
  set selfVideo(value: boolean) {
    this.set(voiceStateToggles.selfVideo, value);
  }

  /** Whether this user is muted by the current user */
  get suppress() {
    return this.has(voiceStateToggles.suppress);
  }

  /** Sets whether this user is muted by the current user */
  set suppress(value: boolean) {
    this.set(voiceStateToggles.suppress, value);
  }
}

export default VoiceStateBitField;
