import { voiceStateToggles } from "../../../structures/voice_state.ts";
import { VoiceState } from "../../../types/voice/voice_state.ts";
import { snowflakeToBigint } from "../../../util/bigint.ts";
import Client from "../../Client.ts";
import VoiceStateBitField from "../BitFields/VoiceState.ts";

export class DDVoiceState {
  /** The client itself */
  client: Client;
  /** The guild id this voice state is for */
  guildId: bigint;
  /** The channel id this user is connected to */
  channelId?: bigint;
  /** The member id this voice state is for */
  memberId!: bigint;
  /** The session id for this voice state */
  sessionId!: string;
  /** The time at which the user requested to speak */
  requestToSpeakTimestamp?: number;
  /** The bitfield holding the toggles for this voice state. */
  bitfield!: VoiceStateBitField;

  constructor(client: Client, guildId: bigint, data: VoiceState) {
    this.client = client;
    this.guildId = guildId;
    this.update(data);
  }

  update(data: VoiceState) {
    this.memberId = snowflakeToBigint(data.userId);
    this.channelId = data.channelId ? snowflakeToBigint(data.channelId) : undefined;
    this.sessionId = data.sessionId;
    this.requestToSpeakTimestamp = data.requestToSpeakTimestamp ? Date.parse(data.requestToSpeakTimestamp) : undefined;
    this.bitfield.deaf = data.deaf;
    this.bitfield.mute = data.mute;
    this.bitfield.selfDeaf = data.selfDeaf;
    this.bitfield.selfMute = data.selfMute;
    this.bitfield.selfVideo = data.selfVideo;
    this.bitfield.selfStream = data.selfStream || false;
    this.bitfield.suppress = data.suppress;
  }

  /** Whether this user is deafened by the server */
  get deaf() {
    return this.bitfield.has(voiceStateToggles.deaf);
  }

  /** Sets whether this user is deafened by the server */
  set deaf(value: boolean) {
    this.bitfield.set(voiceStateToggles.deaf, value);
  }

  /** Whether this user is muted by the server */
  get mute() {
    return this.bitfield.has(voiceStateToggles.mute);
  }

  /** Sets whether this user is muted by the server */
  set mute(value: boolean) {
    this.bitfield.set(voiceStateToggles.mute, value);
  }

  /** Whether this user is locally deafened */
  get selfDeaf() {
    return this.bitfield.has(voiceStateToggles.selfDeaf);
  }

  /** Sets whether this user is locally deafened */
  set selfDeaf(value: boolean) {
    this.bitfield.set(voiceStateToggles.selfDeaf, value);
  }

  /** Whether this user is locally muted */
  get selfMute() {
    return this.bitfield.has(voiceStateToggles.selfMute);
  }

  /** Sets whether this user is locally muted */
  set selfMute(value: boolean) {
    this.bitfield.set(voiceStateToggles.selfMute, value);
  }

  /** Whether this user is streaming using "Go Live" */
  get selfStream() {
    return this.bitfield.has(voiceStateToggles.selfStream);
  }

  /** Sets whether this user is streaming using "Go Live" */
  set selfStream(value: boolean) {
    this.bitfield.set(voiceStateToggles.selfStream, value);
  }

  /** Whether this user's camera is enabled */
  get selfVideo() {
    return this.bitfield.has(voiceStateToggles.selfVideo);
  }

  /** Sets whether this user's camera is enabled */
  set selfVideo(value: boolean) {
    this.bitfield.set(voiceStateToggles.selfVideo, value);
  }

  /** Whether this user is muted by the current user */
  get suppress() {
    return this.bitfield.has(voiceStateToggles.suppress);
  }

  /** Sets whether this user is muted by the current user */
  set suppress(value: boolean) {
    this.bitfield.set(voiceStateToggles.suppress, value);
  }

  /** Get the guild object for this voice state */
  get guild() {
    return this.client.guilds.get(this.guildId!);
  }

  /** The member that this voice state belongs to */
  get member() {
    return this.guild?.members.get(this.memberId);
  }

  /** The member that this voice state belongs to */
  get guildMember() {
    return this.member?.guilds.get(this.guildId);
  }

  /** The channel that the member is connected to */
  get channel() {
    return this.client.channels.get(this.channelId!);
  }

  /** Whether this member is either self-deafened or server-deafened */
  get isDeafened() {
    return this.deaf || this.selfDeaf;
  }

  /** Whether this member is either self-muted or server-muted */
  get isMuted() {
    return this.mute || this.selfMute;
  }

  toJSON() {
    return {
      guildId: this.guildId.toString(),
      channelId: this.channelId?.toString(),
      userId: this.memberId?.toString(),
      member: this.member,
      sessionId: this.sessionId,
      deaf: this.deaf,
      mute: this.mute,
      selfDeaf: this.selfDeaf,
      selfMute: this.selfMute,
      selfStream: this.selfStream,
      selfVideo: this.selfVideo,
      suppress: this.suppress,
      requestToSpeakTimestamp: this.requestToSpeakTimestamp
        ? new Date(this.requestToSpeakTimestamp).toISOString()
        : null,
    } as VoiceState & { guildId: string };
  }
}

export default DDVoiceState;
