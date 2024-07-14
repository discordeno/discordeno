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
      }
    }
  }

  get flags(): number {
    let flags = 0

    if (this.didRejoin) flags |= MemberFlags.DidRejoin
    if (this.startedOnboarding) flags |= MemberFlags.StartedOnboarding
    if (this.bypassesVerification) flags |= MemberFlags.BypassesVerification
    if (this.completedOnboarding) flags |= MemberFlags.CompletedOnboarding

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
