import type { DiscordEmoji, DiscordGuildPreview } from '@discordeno/types'
import Base from '../../Base.js'
import type Client from '../../Client.js'
import type { ImageFormat, ImageSize } from '../../Client.js'
import { GUILD_DISCOVERY_SPLASH, GUILD_ICON, GUILD_SPLASH } from '../../Endpoints.js'
import { GuildToggles } from '../toggles/Guild.js'

export class GuildPreview extends Base {
  /** The client object */
  client: Client
  /** The name of the guild. */
  name: string
  /** The description of the guild. */
  description: string | null
  /** An array of guild emojis. */
  emojis: DiscordEmoji[]
  /** The approximate number of members in the guild. */
  approximateMemberCount: number
  /** The approximate number of presences in the guild. */
  approximatePresenceCount: number

  /** The guild's icon image url. */
  _icon: bigint | null
  /** The guild's splash image url. */
  _splash: bigint | null
  /** The guild's discovery splash image url. */
  _discoverySplash: bigint | null
  /** The guild's features. */
  _features: GuildToggles

  constructor(data: DiscordGuildPreview, client: Client) {
    super(data.id)

    this.client = client
    this.name = data.name
    this.description = data.description
    this._icon = data.icon ? client.iconHashToBigInt(data.icon) : null
    this._splash = data.splash ? client.iconHashToBigInt(data.splash) : null
    this._discoverySplash = data.discovery_splash ? client.iconHashToBigInt(data.discovery_splash) : null
    this.approximateMemberCount = data.approximate_member_count
    this.approximatePresenceCount = data.approximate_presence_count
    this.emojis = data.emojis
    // TODO: make dd version accept a specific subset of discord guild here
    // @ts-expect-error this should not cause an issue
    this._features = new GuildToggles(data)
  }

  /**
   * @deprecated Use .client
   */
  get _client(): Client {
    return this.client
  }

  get icon(): string | undefined {
    return this._icon ? this.client.iconBigintToHash(this._icon) : undefined
  }

  get iconURL(): string | null {
    return this.icon ? this.client._formatImage(GUILD_ICON(this.id, this.icon)) : null
  }

  get splash(): string | undefined {
    return this._splash ? this.client.iconBigintToHash(this._splash) : undefined
  }

  get splashURL(): string | null {
    return this.splash ? this.client._formatImage(GUILD_SPLASH(this.id, this.splash)) : null
  }

  get discoverySplash(): string | undefined {
    return this._discoverySplash ? this.client.iconBigintToHash(this._discoverySplash) : undefined
  }

  get discoverySplashURL(): string | null {
    return this.discoverySplash ? this.client._formatImage(GUILD_DISCOVERY_SPLASH(this.id, this.discoverySplash)) : null
  }

  get features(): string[] {
    return this._features.features.map((feature) => feature.replace(/([a-z])([A-Z])/, '$1_$2').toUpperCase())
  }

  /** Get the guild's splash with the given format and size */
  dynamicDiscoverySplashURL(format?: ImageFormat, size?: ImageSize): string | null {
    return this.discoverySplash ? this.client._formatImage(GUILD_DISCOVERY_SPLASH(this.id, this.discoverySplash), format, size) : null
  }

  /** Get the guild's icon with the given format and size */
  dynamicIconURL(format?: ImageFormat, size?: ImageSize): string | null {
    return this.icon ? this.client._formatImage(GUILD_ICON(this.id, this.icon), format, size) : null
  }

  /** Get the guild's splash with the given format and size */
  dynamicSplashURL(format?: ImageFormat, size?: ImageSize): string | null {
    return this.splash ? this.client._formatImage(GUILD_SPLASH(this.id, this.splash), format, size) : null
  }

  toJSON(props: string[] = []): Record<string, any> {
    return super.toJSON([
      'approximateMemberCount',
      'approximatePresenceCount',
      'description',
      'discoverySplash',
      'emojis',
      'features',
      'icon',
      'name',
      'splash',
      ...props,
    ])
  }
}

export default GuildPreview
