import type { DiscordEmbed, DiscordEmbedField, DiscordEmbedProvider } from '@discordeno/types'

/**
 * Embed Author Options
 *
 * # Example
 * ```ts
 * const authorOption: EmbedBuilderAuthorOptions = {
 *     url: "https://discord.gg/ddeno",
 *     iconUrl: "https://placehold.co/512.png",
 * };
 *
 * const embeds = new EmbedsBuilder()
 *     .title("Meet Pikachu")
 *     .author("Skillz4Killz", authorOptions);
 *
 * await sendMessage(channelId, { embeds });
 * ```
 *
 * `proxyIconUrl` is not available since Discord does not allow this property to be send.
 */
export type EmbedBuilderAuthorOptions = {
  url?: string
  iconUrl?: string
}

/**
 * Embed Image Options
 *
 * # Example
 * ```ts
 * const imageOptions: EmbedBuilderImageOptions = {
 *   height: 512,
 *   width: 512,
 * };
 *
 * const embeds = new EmbedsBuilder()
 *     .title("Meet Pikachu")
 *     .image("https://placehold.co/512.png", imageOptions);
 *
 * await sendMessage(channelId, { embeds });
 * ```
 *
 * `proxyUrl` is not available since Discord does not allow this property to be send.
 */
export type EmbedBuilderImageOptions = {
  height?: number
  width?: number
}

/**
 * Discord Embeds Builder.
 *
 * This Builder goes a different approach. Instead of just building one single Embed, this builder creates an Array of Embeds.
 * This makes it easy to construct multiple Embeds at once and even just a single one.
 *
 * # Example
 * ```ts
 * const embeds = new EmbedsBuilder()
 *     .title("Introducing Light Mode")
 *     .description("We're excited to announce the arrival of our new White Mode theme! This highly requested theme is now available for all users. Switch to White Mode today to reduce eye strain and enjoy a sleek new look.")
 *     .addEmbed()
 *     .title("Performance Enhancements and Bug Fixes")
 *     .description("We've been hard at work improving Discordeno and fixing bugs. In this week's update, we're introducing several performance enhancements that will make your experience smoother and more efficient. We've also fixed several bugs reported by you amazing people. Thank you for your feedback and support!")
 *
 * await sendMessage(channelId, { embeds });
 * ```
 *
 */
export class EmbedsBuilder extends Array<DiscordEmbed> {
  constructor() {
    super()
  }

  /**
   *
   */
  addEmbed() {
    if (this.length === 10) throw new Error('Maximum Embed count reached. Cannot have more than 10 Embeds.')

    this.push({ type: 'rich' })

    return this
  }

  author(name: string, options?: EmbedBuilderAuthorOptions) {
    const embed = this.getCurrentEmbed()
    embed.author = {
      name,
      url: options?.url,
      icon_url: options?.iconUrl,
    }
  }

  // TODO: should hex strings be allowed?
  color(color: number) {
    const embed = this.getCurrentEmbed()
    embed.color = color

    return this
  }

  description(description: string) {
    const embed = this.getCurrentEmbed()
    embed.description = description

    return this
  }

  // TODO: should fields check for existing and push if so?
  fields(fields: DiscordEmbedField[]) {
    const embed = this.getCurrentEmbed()
    embed.fields = fields

    return this
  }

  footer(text: string, iconUrl?: string) {
    const embed = this.getCurrentEmbed()
    embed.footer = { text, icon_url: iconUrl }

    return this
  }

  image(url: string, options?: EmbedBuilderImageOptions) {
    const embed = this.getCurrentEmbed()
    embed.image = {
      url,
      height: options?.height,
      width: options?.width,
    }

    return this
  }

  provider(provider: DiscordEmbedProvider) {
    const embed = this.getCurrentEmbed()
    embed.provider = provider

    return this
  }

  thumbnail(url: string, options?: EmbedBuilderImageOptions) {
    const embed = this.getCurrentEmbed()
    embed.thumbnail = {
      url,
      height: options?.height,
      width: options?.width,
    }

    return this
  }

  timestamp(timestamp?: number) {
    const embed = this.getCurrentEmbed()
    // TS does not allow `undefined` to be passed as an argument, but it's totally fine.
    embed.timestamp = new Date(timestamp as number).toISOString()

    return this
  }

  title(title: string) {
    const embed = this.getCurrentEmbed()
    embed.title = title

    return this
  }

  url(url: string) {
    const embed = this.getCurrentEmbed()
    embed.url = url

    return this
  }

  video(url: string, options?: EmbedBuilderImageOptions) {
    const embed = this.getCurrentEmbed()
    embed.video = {
      url,
      height: options?.height,
      width: options?.width,
    }

    return this
  }

  private getCurrentEmbed(): DiscordEmbed {
    if (this.length === 0) {
      this.addEmbed()

      return this[0]
    }

    return this[this.length - 1]
  }
}
