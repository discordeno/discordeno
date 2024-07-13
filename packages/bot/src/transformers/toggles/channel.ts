import type { DiscordChannel } from '@discordeno/types'
import { ToggleBitfield } from './ToggleBitfield.js'

export const ChannelToggle = {
  /** Whether the channel is nsfw */
  nsfw: 1 << 0,
  /** When a thread is locked, only users with `MANAGE_THREADS` can unarchive it */
  locked: 1 << 1,
  /** whether non-moderators can add other non-moderators to a thread; only available on private threads */
  invitable: 1 << 2,
  /** Whether the thread is archived */
  archived: 1 << 3,
  /** When a thread is created this will be true on that channel payload for the thread. */
  newlyCreated: 1 << 4,
  /** for group DM channels: whether the channel is managed by an application via the `gdm.join` OAuth2 scope */
  managed: 1 << 5,
}

export class ChannelToggles extends ToggleBitfield {
  constructor(channelOrBitfield: DiscordChannel | number) {
    super()

    if (typeof channelOrBitfield === 'number') this.bitfield = channelOrBitfield
    else {
      const channel = channelOrBitfield
      if (channel.nsfw) this.add(ChannelToggle.nsfw)
      if (channel.thread_metadata?.locked) this.add(ChannelToggle.locked)
      if (channel.thread_metadata?.invitable) this.add(ChannelToggle.invitable)
      if (channel.thread_metadata?.archived) this.add(ChannelToggle.archived)
      if (channel.newly_created) this.add(ChannelToggle.newlyCreated)
      if (channel.managed) this.add(ChannelToggle.managed)
    }
  }

  /** Whether or not this channel is an nsfw channel. */
  get nsfw(): boolean {
    return this.has('nsfw')
  }

  /** Whether or not this thread channel is locked. */
  get locked(): boolean {
    return this.has('locked')
  }

  /** Whether or not this thread channel is invitable. */
  get invitable(): boolean {
    return this.has('invitable')
  }

  /** Whether or not this thread channel is archived. */
  get archived(): boolean {
    return this.has('archived')
  }

  /** Whether or not this thread channel is newly created. */
  get newlyCreated(): boolean {
    return this.has('newlyCreated')
  }

  get managed(): boolean {
    return this.has('managed')
  }

  /** Checks whether or not the permissions exist in this */
  has(permissions: ChannelToggleKeys | ChannelToggleKeys[]): boolean {
    if (!Array.isArray(permissions)) return super.contains(ChannelToggle[permissions])

    return super.contains(permissions.reduce((a, b) => (a |= ChannelToggle[b]), 0))
  }

  /** Lists all the toggles for the role and whether or not each is true or false. */
  list(): Record<ChannelToggleKeys, boolean> {
    const json: Record<string, boolean> = {}
    for (const [key, value] of Object.entries(ChannelToggle)) {
      json[key] = super.contains(value)
    }

    return json as Record<ChannelToggleKeys, boolean>
  }
}

export type ChannelToggleKeys = keyof typeof ChannelToggle
