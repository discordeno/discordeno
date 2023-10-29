import type { DiscordRole } from '@discordeno/types'
import { ToggleBitfield } from './ToggleBitfield.js'

export const RoleToggle = {
  /** If this role is showed separately in the user listing */
  hoist: 1 << 0,
  /** Whether this role is managed by an integration */
  managed: 1 << 1,
  /** Whether this role is mentionable */
  mentionable: 1 << 2,
  /** Whether this is the guilds premium subscriber role */
  premiumSubscriber: 1 << 3,
  /** Whether this role is available for purchase. */
  availableForPurchase: 1 << 4,
  /** Whether this role is available for guild connections. */
  guildConnections: 1 << 5,
}

export class RoleToggles extends ToggleBitfield {
  constructor(roleOrTogglesInt: DiscordRole | number) {
    super()

    if (typeof roleOrTogglesInt === 'number') this.bitfield = roleOrTogglesInt
    else {
      const role = roleOrTogglesInt

      if (role.hoist) this.add(RoleToggle.hoist)
      if (role.managed) this.add(RoleToggle.managed)
      if (role.mentionable) this.add(RoleToggle.mentionable)
      if (role.tags?.premium_subscriber === null) this.add(RoleToggle.premiumSubscriber)
      if (role.tags?.available_for_purchase === null) this.add(RoleToggle.availableForPurchase)
      if (role.tags?.guild_connections === null) this.add(RoleToggle.guildConnections)
    }
  }

  /** If this role is showed separately in the user listing */
  get hoist(): boolean {
    return this.has('hoist')
  }

  /** Whether this role is managed by an integration */
  get managed(): boolean {
    return this.has('managed')
  }

  /** Whether this role is mentionable */
  get mentionable(): boolean {
    return this.has('mentionable')
  }

  /** Whether this is the guilds premium subscriber role */
  get premiumSubscriber(): boolean {
    return this.has('premiumSubscriber')
  }

  /** Whether this role is available for purchase. */
  get availableForPurchase(): boolean {
    return this.has('availableForPurchase')
  }

  /** Whether this is a guild's linked role. */
  get guildConnections(): boolean {
    return this.has('guildConnections')
  }

  /** Checks whether or not the permissions exist in this */
  has(permissions: RoleToggleKeys | RoleToggleKeys[]): boolean {
    if (!Array.isArray(permissions)) return super.contains(RoleToggle[permissions])

    return super.contains(permissions.reduce((a, b) => (a |= RoleToggle[b]), 0))
  }

  /** Lists all the toggles for the role and whether or not each is true or false. */
  list(): Record<RoleToggleKeys, boolean> {
    const json: Record<string, boolean> = {}
    for (const [key, value] of Object.entries(RoleToggle)) {
      json[key] = super.contains(value)
    }

    return json as Record<RoleToggleKeys, boolean>
  }
}

export type RoleToggleKeys = keyof typeof RoleToggle
