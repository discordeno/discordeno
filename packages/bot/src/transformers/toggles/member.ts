import { type DiscordMember, MemberFlags } from '@discordeno/types'
import { ToggleBitfield } from './ToggleBitfield.js'

const memberFlags = ['didRejoin', 'startedOnboarding', 'bypassesVerification', 'completedOnboarding'] as const

export const MemberToggle = {
  /** Whether the user is deafened in voice channels */
  deaf: 1 << 0,
  /** Whether the user is muted in voice channels */
  mute: 1 << 1,
  /** Whether the user has not yet passed the guild's Membership Screening requirements */
  pending: 1 << 2,

  // Member flags

  /** Member has left and rejoined the guild */
  didRejoin: 1 << 3,
  /** Member has completed onboarding */
  startedOnboarding: 1 << 4,
  /** Member is exempt from guild verification requirements */
  bypassesVerification: 1 << 5,
  /** Member has started onboarding */
  completedOnboarding: 1 << 6,
  /** Member is a guest and can only access the voice channel they were invited to */
  isGuest: 1 << 7,
  /** Member has started Server Guide new member actions */
  startedHomeActions: 1 << 8,
  /** Member has completed Server Guide new member actions */
  completedHomeActions: 1 << 9,
  /** Member's username, display name, or nickname is blocked by AutoMod */
  automodQuarantinedUsername: 1 << 10,
  /** Member has dismissed the DM settings upsell */
  dmSettingsUpsellAcknowledged: 1 << 11,
}

export class MemberToggles extends ToggleBitfield {
  constructor(memberOrTogglesInt: Partial<DiscordMember> | number) {
    super()

    if (typeof memberOrTogglesInt === 'number') this.bitfield = memberOrTogglesInt
    else {
      const member = memberOrTogglesInt

      if (member.deaf) this.add(MemberToggle.deaf)
      if (member.mute) this.add(MemberToggle.mute)
      if (member.pending) this.add(MemberToggle.pending)

      if (member.flags) {
        if (member.flags & MemberFlags.DidRejoin) this.add(MemberToggle.didRejoin)
        if (member.flags & MemberFlags.StartedOnboarding) this.add(MemberToggle.startedOnboarding)
        if (member.flags & MemberFlags.BypassesVerification) this.add(MemberToggle.bypassesVerification)
        if (member.flags & MemberFlags.CompletedOnboarding) this.add(MemberToggle.completedOnboarding)
        if (member.flags & MemberFlags.IsGuest) this.add(MemberToggle.isGuest)
        if (member.flags & MemberFlags.StartedHomeActions) this.add(MemberToggle.startedHomeActions)
        if (member.flags & MemberFlags.CompletedHomeActions) this.add(MemberToggle.completedHomeActions)
        if (member.flags & MemberFlags.AutomodQuarantinedUsername) this.add(MemberToggle.automodQuarantinedUsername)
        if (member.flags & MemberFlags.DmSettingsUpsellAcknowledged) this.add(MemberToggle.dmSettingsUpsellAcknowledged)
      }
    }
  }

  get flags(): number {
    let flags = 0

    if (this.didRejoin) flags |= MemberFlags.DidRejoin
    if (this.startedOnboarding) flags |= MemberFlags.StartedOnboarding
    if (this.bypassesVerification) flags |= MemberFlags.BypassesVerification
    if (this.completedOnboarding) flags |= MemberFlags.CompletedOnboarding
    if (this.isGuest) flags |= MemberFlags.IsGuest
    if (this.startedHomeActions) flags |= MemberFlags.StartedHomeActions
    if (this.completedHomeActions) flags |= MemberFlags.CompletedHomeActions
    if (this.automodQuarantinedUsername) flags |= MemberFlags.AutomodQuarantinedUsername
    if (this.dmSettingsUpsellAcknowledged) flags |= MemberFlags.DmSettingsUpsellAcknowledged

    return flags
  }

  /** Whether the user belongs to an OAuth2 application */
  get deaf(): boolean {
    return this.has('deaf')
  }

  /** Whether the user is muted in voice channels */
  get mute(): boolean {
    return this.has('mute')
  }

  /** Whether the user has not yet passed the guild's Membership Screening requirements */
  get pending(): boolean {
    return this.has('pending')
  }

  /** Member has left and rejoined the guild */
  get didRejoin(): boolean {
    return this.has('didRejoin')
  }

  /** Member has completed onboarding */
  get startedOnboarding(): boolean {
    return this.has('startedOnboarding')
  }

  /** Member is exempt from guild verification requirements */
  get bypassesVerification(): boolean {
    return this.has('bypassesVerification')
  }

  /** Member has started onboarding */
  get completedOnboarding(): boolean {
    return this.has('completedOnboarding')
  }

  /** Member is a guest and can only access the voice channel they were invited to */
  get isGuest(): boolean {
    return this.has('isGuest')
  }

  /** Member has started Server Guide new member actions */
  get startedHomeActions(): boolean {
    return this.has('startedHomeActions')
  }

  /** Member has completed Server Guide new member actions */
  get completedHomeActions(): boolean {
    return this.has('completedHomeActions')
  }

  /** Member's username, display name, or nickname is blocked by AutoMod */
  get automodQuarantinedUsername(): boolean {
    return this.has('automodQuarantinedUsername')
  }

  /** Member has dismissed the DM settings upsell */
  get dmSettingsUpsellAcknowledged(): boolean {
    return this.has('dmSettingsUpsellAcknowledged')
  }

  /** Checks whether or not the permissions exist in this */
  has(permissions: MemberToggleKeys | MemberToggleKeys[]): boolean {
    if (!Array.isArray(permissions)) return super.contains(MemberToggle[permissions])

    return super.contains(permissions.reduce((a, b) => (a |= MemberToggle[b]), 0))
  }

  /** Lists all the toggles for the role and whether or not each is true or false. */
  list(): Record<MemberToggleKeys, boolean> {
    const json: Record<string, boolean> = {}
    for (const [key, value] of Object.entries(MemberToggle)) {
      json[key] = super.contains(value)
    }

    return json as Record<MemberToggleKeys, boolean>
  }
}

export type MemberToggleKeys = keyof typeof MemberToggle

export type MemberFlagsKeys = (typeof memberFlags)[number]
