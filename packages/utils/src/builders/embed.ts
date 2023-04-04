import type { Camelize, DiscordEmbed, DiscordEmbedField, DiscordEmbedProvider } from '@discordeno/types'

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
export interface EmbedBuilderAuthorOptions {
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
 *     .title("Square boxes are great")
 *     .image("https://placehold.co/512.png", imageOptions);
 *
 * await sendMessage(channelId, { embeds });
 * ```
 *
 * `proxyUrl` is not available since Discord does not allow this property to be send.
 */
export interface EmbedBuilderImageOptions {
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
  constructor(data?: Camelize<DiscordEmbed>[]) {
    super()

    data?.forEach((embed) => this.addEmbed(embed))
  }

  /**
   * Add an empty embed.
   *
   * @returns {EmbedsBuilder} EmbedsBuilder instance, allowing for method chaining.
   *
   * @example
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
   */
  addEmbed(data?: Camelize<DiscordEmbed>): EmbedsBuilder {
    if (this.length === 10) throw new Error('Maximum Embed count reached. Cannot have more than 10 Embeds.')

    this.push({ type: 'rich' })

    if (data !== undefined) {
      if (data.author) this.author(data.author.name, data.author)
      if (data.color) this.color(data.color)
      if (data.description) this.description(data.description)
      if (data.fields) this.fields(data.fields)
      if (data.footer) this.footer(data.footer.text, data.footer.iconUrl)
      if (data.image) this.image(data.image.url, data.image)
      if (data.thumbnail) this.thumbnail(data.thumbnail.url, data.thumbnail)
      if (data.timestamp) this.timestamp(data.timestamp)
      if (data.title) this.title(data.title, data.url)
    }

    return this
  }

  /**
   * Set the author of the current Embed.
   *
   * @param {string} name - Name of the author.
   * @param {EmbedBuilderAuthorOptions} [options] - Author URL and image options.
   * @returns {EmbedsBuilder} EmbedsBuilder instance, allowing for method chaining.
   *
   * @example
   * ```ts
   * const embeds = new EmbedsBuilder()
   *     .title("Meet Pikachu")
   *     .author("Skillz4Killz", {
   *         url: "https://discord.gg/ddeno",
   *         iconUrl: "https://placehold.co/512.png",
   *     });
   *
   * await sendMessage(channelId, { embeds });
   * ```
   */
  author(name: string, options?: EmbedBuilderAuthorOptions): EmbedsBuilder {
    const embed = this.getCurrentEmbed()
    embed.author = {
      name,
      url: options?.url,
      icon_url: options?.iconUrl,
    }

    return this
  }

  /**
   * Sets the color of the current embed.
   * You can provide a color for a function in three ways:
   *   - Use a string in hexadecimal format (HEX)
   *   - Use a number which represents a color
   *   - Use the word "RANDOM" which will randomly generate a color for you.
   *
   * @param {number | string} color - Color to set.
   * @returns {EmbedsBuilder} EmbedsBuilder instance, allowing for method chaining.
   *
   * @example
   * ```ts
   * const embeds = new EmbedsBuilder()
   *     .title("Colors make the world beatiful")
   *     .color("#348C31")
   *     .addEmbed()
   *     .title("Discord loves numbers")
   *     .color(5793266)
   *     .title("Randomness adds a touch of excitement and surprise to life")
   *     .color("RANDOM")
   *
   * await sendMessage(channelId, { embeds });
   * ```
   */
  color(color: number | string): EmbedsBuilder {
    if (typeof color === 'string') {
      color = color.toUpperCase() === 'RANDOM' ? Math.floor(Math.random() * (0xffffff + 1)) : parseInt(color.replace('#', ''), 16)
    }

    const embed = this.getCurrentEmbed()
    embed.color = color

    return this
  }

  /**
   * Sets the description of the embed.
   * @param {string} description - Text to set as the description.
   * @returns {EmbedsBuilder} This EmbedsBuilder instance, allowing for method chaining.
   *
   * @example
   * ```ts
   * const embed = new EmbedsBuilder()
   *     .setTitle("Example Embed")
   *     .setDescription("This is an example embed.")
   *     .setColor("#FF0000");
   *
   * await sendMessage(channelId, { embeds });
   *```
   */
  description(description: string): EmbedsBuilder {
    const embed = this.getCurrentEmbed()
    embed.description = description

    return this
  }

  /**
   * Sets the fields of the embed.
   * @param {Array.<DiscordEmbedField>} fields - An array of field objects to add to the embed.
   * @returns {EmbedsBuilder} This EmbedsBuilder instance, allowing for method chaining.
   *
   * @example
   * ```ts
   * const embed = new EmbedsBuilder()
   *     .setTitle("World of Fields Craft")
   *     .fields([
   *           {
   *               name: "Wheat Field",
   *               value: "Golden wheat sways in the breeze, its rustling a soothing melody. Freshly baked bread fills the air.",
   *               inline: true,
   *           },
   *           {
   *               name: "Avocado Grove",
   *               value: "A grove of creamy, green avocados ripe for the picking.",
   *               inline: true,
   *           },
   *           {
   *               name: "Peach Orchard",
   *               value: "Lush trees filled with juicy, sun-ripened peaches, a fragrant sweetness lingering in the air.",
   *               inline: false,
   *           }
   *           {
   *               name: "Rice Paddy",
   *               value: "Lush green fields, flooded with crystal-clear water reflecting the sun's rays. Dragonflies hum and water flows, a serene oasis.",
   *               inline: false,
   *           }
   *       ]);
   *
   * await sendMessage(channelId, { embeds });
   *```
   */
  fields(fields: DiscordEmbedField[]): EmbedsBuilder {
    const embed = this.getCurrentEmbed()
    if (embed.fields !== undefined) {
      embed.fields.push(...fields)

      return this
    }

    embed.fields = fields

    return this
  }

  /**
   * Add a field to the embed.
   * @param {string} name - Name of the field.
   * @param {string} value - Value of the field.
   * @param {boolean} [inline=false] - Whether the field should be inline or not. Defaults to false.
   * @returns {EmbedsBuilder} This EmbedsBuilder instance, allowing for method chaining.
   *
   * @example
   * ```ts
   * const embed = new EmbedsBuilder()
   *     .setTitle("World of Fields Craft")
   *     .field();
   *
   * await sendMessage(channelId, { embeds });
   *```
   */
  field(name: string, value: string, inline?: boolean): EmbedsBuilder {
    const embed = this.getCurrentEmbed()
    if (embed.fields !== undefined) {
      embed.fields.push({ name, value, inline })
    }

    embed.fields = [{ name, value, inline }]

    return this
  }

  /**
   * Sets the footer of the embed.
   *
   * @param {string} text - The text to display in the footer.
   * @param {string} [iconUrl] - The URL of the icon to display next to the text.
   * @returns {EmbedsBuilder} This EmbedsBuilder instance, allowing for method chaining.
   *
   * @example
   * ```ts
   * const embed = new EmbedsBuilder()
   *     .setTitle("Example Embed")
   *     .setDescription("This is an example embed.")
   *     .setColor("#FF0000");
   *
   * await sendMessage(channelId, { embeds });
   *```
   */
  footer(text: string, iconUrl?: string): EmbedsBuilder {
    const embed = this.getCurrentEmbed()
    embed.footer = { text, icon_url: iconUrl }

    return this
  }

  /**
   * Sets the image of the embed.
   *
   * @param {string} url - URL of the image.
   * @param {EmbedBuilderImageOptions} [options] - Set the `height` and `width` of the image.
   * @returns {EmbedsBuilder} This EmbedsBuilder instance, allowing for method chaining.
   *
   * @example
   * ```ts
   * const embeds = new EmbedsBuilder()
   *      .title("Square boxes are great")
   *      .image("https://placehold.co/512.png", {
   *           height: 512,
   *           width: 512,
   *       });
   *
   * await sendMessage(channelId, { embeds });
   * ```
   */
  image(url: string, options?: EmbedBuilderImageOptions): EmbedsBuilder {
    const embed = this.getCurrentEmbed()
    embed.image = {
      url,
      height: options?.height,
      width: options?.width,
    }

    return this
  }

  /**
   * Sets the provider of the embed.
   *
   * @param {DiscordEmbedProvider} provider - Set the `name` and `url` of the provider.
   * @returns {EmbedsBuilder} This EmbedsBuilder instance, allowing for method chaining.
   *
   * @example
   * ```ts
   * const embeds = new EmbedsBuilder()
   *      .title("External services")
   *      .provider({
   *          name: "Discordeno",
   *          url: "https://discordeno.js.org/",
   *      });
   *
   * await sendMessage(channelId, { embeds });
   * ```
   */
  // TODO: check if u can even send this
  provider(provider: DiscordEmbedProvider): EmbedsBuilder {
    const embed = this.getCurrentEmbed()
    embed.provider = provider

    return this
  }

  /**
   * Sets the thumbnail of the embed.
   *
   * @param {string} url - URL of the thumbnail image.
   * @param {EmbedBuilderImageOptions} [options] - Set the `height` and `width` of the image.
   * @returns {EmbedsBuilder} This EmbedsBuilder instance, allowing for method chaining.
   *
   * @example
   * ```ts
   * const embeds = new EmbedsBuilder()
   *     .title("Add some pizzazz to your embeds.")
   *     .thumbnail("https://placehold.co/1024x512.png", {
   *         height: 512,
   *         width: 1024,
   *     });
   *
   *  await sendMessage(channelId, { embeds });
   * ```
   */
  thumbnail(url: string, options?: EmbedBuilderImageOptions): EmbedsBuilder {
    const embed = this.getCurrentEmbed()
    embed.thumbnail = {
      url,
      height: options?.height,
      width: options?.width,
    }

    return this
  }

  /**
   * Sets the timestamp of the embed.
   *
   * @param {string | number | Date} [timestamp=new Date()] - Timestamp to set. If not provided, defaults to the current date and time.
   * @returns {EmbedsBuilder} This EmbedsBuilder instance, allowing for method chaining.
   *
   * @example
   * ```ts
   * const embeds = new EmbedsBuilder()
   *     .title("Don't have a clock? Don't worry! Here's the time:")
   *     .timestamp();
   *
   * await sendMessage(channelId, { embeds });
   * ```
   */
  timestamp(timestamp?: string | number | Date): EmbedsBuilder {
    const embed = this.getCurrentEmbed()
    // TS does not allow `undefined` to be passed as an argument, but it's totally fine.
    embed.timestamp = new Date(timestamp!).toISOString()

    return this
  }

  /**
   * Sets the title of the embed.
   *
   * @param {string} title - Title to set.
   * @param {string} [url] - Set the URL of the title.
   * @returns {EmbedsBuilder} This EmbedsBuilder instance, allowing for method chaining.
   *
   * @example
   * ```ts
   * const embeds = new EmbedsBuilder()
   *     .title("Title It Like You Mean It!", "https://discordeno.js.org/");
   *
   * await sendMessage(channelId, { embeds });
   * ```
   */
  title(title: string, url?: string): EmbedsBuilder {
    const embed = this.getCurrentEmbed()
    embed.title = title
    embed.url = url

    return this
  }

  /**
   * Sets the video of the embed.
   *
   * @param {string} url - URL to set.
   * @returns {EmbedsBuilder} This EmbedsBuilder instance, allowing for method chaining.
   *
   * @example
   * ```ts
   * const embeds = new EmbedsBuilder()
   *     .title("Link Me Up, Scotty")
   *     .url("https://discordeno.js.org/")
   *
   * await sendMessage(channelId, { embeds });
   * ```
   */
  video(url: string, options?: EmbedBuilderImageOptions): EmbedsBuilder {
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
