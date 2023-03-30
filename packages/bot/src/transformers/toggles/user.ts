import type { DiscordUser } from '@discordeno/types'
import { ToggleBitfield } from './ToggleBitfield.js'

export const UserToggle = {
  /** Whether the user belongs to an OAuth2 application */
  bot: 1 << 0,
  /** Whether the user is an Official Discord System user (part of the urgent message system) */
  system: 1 << 1,
  /** Whether the user has two factor enabled on their account */
  mfaEnabled: 1 << 2,
  /** Whether the email on this account has been verified */
  verified: 1 << 3,
}

export class UserToggles extends ToggleBitfield {
  constructor(userOrTogglesInt: DiscordUser | number) {
    super()

    if (typeof userOrTogglesInt === 'number') this.bitfield = userOrTogglesInt
    else {
      const user = userOrTogglesInt

      if (user.bot) this.add(UserToggle.bot)
      if (user.system) this.add(UserToggle.system)
      if (user.mfa_enabled) this.add(UserToggle.mfaEnabled)
      if (user.verified) this.add(UserToggle.verified)
    }
  }

  /** Whether the user belongs to an OAuth2 application */
  get bot(): boolean {
    return this.has('bot')
  }

  /** Whether the user is an Official Discord System user (part of the urgent message system) */
  get system(): boolean {
    return this.has('system')
  }

  /** Whether the user has two factor enabled on their account */
  get mfaEnabled(): boolean {
    return this.has('mfaEnabled')
  }

  /** Whether the email on this account has been verified */
  get verified(): boolean {
    return this.has('verified')
  }

  /** Checks whether or not the permissions exist in this */
  has(permissions: UserToggleKeys | UserToggleKeys[]): boolean {
    if (!Array.isArray(permissions)) return super.contains(UserToggle[permissions])

    return super.contains(permissions.reduce((a, b) => (a |= UserToggle[b]), 0))
  }

  /** Lists all the toggles for the role and whether or not each is true or false. */
  list(): Record<UserToggleKeys, boolean> {
    const json: Record<string, boolean> = {}
    for (const [key, value] of Object.entries(UserToggle)) {
      json[key] = super.contains(value)
    }

    return json as Record<UserToggleKeys, boolean>
  }
}

export type UserToggleKeys = keyof typeof UserToggle
