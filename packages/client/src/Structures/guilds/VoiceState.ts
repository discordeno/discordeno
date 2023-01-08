/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { DiscordVoiceState } from '@discordeno/types'
import Base from '../../Base.js'
import { VoiceStateToggle, VoiceStateToggles } from '../toggles/Voice.js'

export class VoiceState extends Base {
  channelID: string | null = null
  requestToSpeakTimestamp: number | null
  sessionID!: string | null

  bitfield: VoiceStateToggles

  constructor(data: DiscordVoiceState & { id: string }) {
    super(data.id)

    this.requestToSpeakTimestamp = null
    this.bitfield = new VoiceStateToggles(data)

    this.update(data)
  }

  /** Whether or not the user is deafened by the server. */
  get deaf(): boolean {
    return this.bitfield.deaf
  }

  /** Set whether or not the user is deafened by the server. */
  set deaf(value: boolean) {
    if (value) this.bitfield.add(VoiceStateToggle.deaf)
    else this.bitfield.remove(VoiceStateToggle.deaf)
  }

  /** Whether or not the user is muted by the server. */
  get mute(): boolean {
    return this.bitfield.mute
  }

  /** Set whether or not the user is muted by the server. */
  set mute(value: boolean) {
    if (value) this.bitfield.add(VoiceStateToggle.mute)
    else this.bitfield.remove(VoiceStateToggle.mute)
  }

  /** Whether or not the user has deafened themself. */
  get selfDeaf(): boolean {
    return this.bitfield.selfDeaf
  }

  /** Set whether or not the user has deafened themself. */
  set selfDeaf(value: boolean) {
    if (value) this.bitfield.add(VoiceStateToggle.selfDeaf)
    else this.bitfield.remove(VoiceStateToggle.selfDeaf)
  }

  /** Whether or not the user has muted themself. */
  get selfMute(): boolean {
    return this.bitfield.selfMute
  }

  /** Set whether or not the user has muted themself. */
  set selfMute(value: boolean) {
    if (value) this.bitfield.add(VoiceStateToggle.selfMute)
    else this.bitfield.remove(VoiceStateToggle.selfMute)
  }

  /** Whether or not the user is streaming. */
  get selfStream(): boolean {
    return this.bitfield.selfStream
  }

  /** Set whether or not the user is streaming. */
  set selfStream(value: boolean) {
    if (value) this.bitfield.add(VoiceStateToggle.selfStream)
    else this.bitfield.remove(VoiceStateToggle.selfStream)
  }

  /** Whether or not the user is video calling. */
  get selfVideo(): boolean {
    return this.bitfield.selfVideo
  }

  /** Set whether or not the user is video calling. */
  set selfVideo(value: boolean) {
    if (value) this.bitfield.add(VoiceStateToggle.selfVideo)
    else this.bitfield.remove(VoiceStateToggle.selfVideo)
  }

  /** Whether or not the user is suppressed from speaking. */
  get suppress(): boolean {
    return this.bitfield.suppress
  }

  /** Set whether or not the user is suppressed from speaking. */
  set suppress(value: boolean) {
    if (value) this.bitfield.add(VoiceStateToggle.suppress)
    else this.bitfield.remove(VoiceStateToggle.suppress)
  }

  update(data: DiscordVoiceState) {
    if (data.channel_id !== undefined) {
      this.channelID = data.channel_id
      this.sessionID = data.channel_id === null ? null : data.session_id
    } else if (this.channelID === undefined) {
      this.channelID = this.sessionID = null
    }

    if (data.mute !== undefined) this.mute = data.mute
    if (data.deaf !== undefined) this.deaf = data.deaf
    if (data.request_to_speak_timestamp) this.requestToSpeakTimestamp = Date.parse(data.request_to_speak_timestamp)
    if (data.self_mute !== undefined) this.selfMute = data.self_mute
    if (data.self_deaf !== undefined) this.selfDeaf = data.self_deaf
    if (data.self_video !== undefined) this.selfVideo = data.self_video
    if (data.self_stream !== undefined) this.selfStream = data.self_stream
    if (data.suppress !== undefined) this.suppress = data.suppress
  }

  toJSON(props: string[] = []): Record<string, any> {
    return super.toJSON([
      'channelID',
      'deaf',
      'mute',
      'requestToSpeakTimestamp',
      'selfDeaf',
      'selfMute',
      'selfStream',
      'selfVideo',
      'sessionID',
      'suppress',
      ...props,
    ])
  }
}
