import type { DiscordEmbed, DiscordEmbedAuthor, DiscordEmbedField, DiscordEmbedFooter, DiscordEmbedImage, DiscordEmbedThumbnail, DiscordEmbedVideo } from "@discordeno/types";


/**
 * A builder to help create Discord embeds.
 *
 * @export
 * @class EmbedsBuilder
 * @typedef {EmbedsBuilder}
 * @extends {Array<DiscordEmbed>}
 */
export class EmbedsBuilder extends Array<DiscordEmbed> {
  // TODO: Maybe make all interfaces camelcase and use cameltosnakecase?
  // TODO: add timestamp method
  
  /**
   * Adds a new field to the embed fields array.
   *
   * @param {string} name - Field name
   * @param {string} value - Field value
   * @param {?boolean} [inline=false] - Field should be inline or not. 
   * @returns {EmbedsBuilder}
   */
  addField(name: string, value: string, inline?: boolean): EmbedsBuilder {
    if (this.#currentEmbed.fields === undefined) {
      this.#currentEmbed.fields = []
    }

    this.#currentEmbed.fields.push({
      name,
      value,
      inline
    })

    return this
  }

  
  /**
   * Creates a blank embed.
   *
   * @returns {EmbedsBuilder}
   */
  newEmbed(): EmbedsBuilder {
    if (this.length >= 10) {
      throw new EmbedsBuilderError("Maximum embed count exceeded. You can not have more than 10 embeds.")
    }

    this.push({})

    return this
  }

  
  /**
   * Set the current embed author.
   *
   * @param {string} name - Name of the author
   * @param {?Omit<DiscordEmbedAuthor, 'name'>} [options] - Extra author options
   * @returns {EmbedsBuilder}
   */
  setAuthor(name: string, options?: Omit<DiscordEmbedAuthor, 'name'>): EmbedsBuilder {
    this.#currentEmbed.author = {
      ...this.#currentEmbed.author,
      ...options,
      name
    }

    return this
  }

  
  /**
   * Set the color on the side of the current embed.
   *
   * @param {(number | string)} color - The color, in base16 or hex color code
   * @returns {EmbedsBuilder}
   */
  setColor(color: number | string): EmbedsBuilder {
    if (typeof color === 'string') {
      const convertedValue = parseInt(color.replace('#', ''), 16)
      color = Number.isNaN(convertedValue) ? 0 : convertedValue
    }

    this.#currentEmbed.color = color

    return this
  }

  
  /**
   * Set the description of the current embed.
   *
   * @param {string} description - Description
   * @returns {EmbedsBuilder}
   */
  setDescription(description: string): EmbedsBuilder {
    this.#currentEmbed.description = description

    return this
  }

  
  /**
   * Overwrite all fields on the current embed.
   *
   * @param {DiscordEmbedField[]} fields 
   * @returns {EmbedsBuilder}
   */
  setFields(fields: DiscordEmbedField[]): EmbedsBuilder {
    this.#currentEmbed.fields = fields

    return this
  }

  
  /**
   * Set the footer in the current embed.
   *
   * @param {string} text - The text to display in the footer
   * @param {?Omit<DiscordEmbedFooter, 'text'>} [options]
   * @returns {EmbedsBuilder}
   */
  setFooter(text: string, options?: Omit<DiscordEmbedFooter, 'text'>): EmbedsBuilder {
    this.#currentEmbed.footer = {
      ...this.#currentEmbed.footer,
      ...options,
      text
    }

    return this
  }

  
  /**
   * Set the image in the current embed.
   *
   * @param {string} url - URL of the image
   * @param {?Omit<DiscordEmbedImage, 'url'>} [options]
   * @returns {EmbedsBuilder}
   */
  setImage(url: string, options?: Omit<DiscordEmbedImage, 'url'>): EmbedsBuilder {
    this.#currentEmbed.image = {
      ...this.#currentEmbed.image,
      ...options,
      url
    }

    return this
  }

  
  /**
   * Set the provider of the current embed.
   *
   * @param {string} name
   * @param {?string} [url]
   * @returns {EmbedsBuilder}
   */
  setProvider(name: string, url?: string): EmbedsBuilder {
    this.#currentEmbed.provider = {
      name,
      url
    }

    return this
  }

  
  /**
   * Set the color of the current embed to a random value.
   *
   * @returns {EmbedsBuilder}
   */
  setRandomColor(): EmbedsBuilder {
    return this.setColor(Math.floor(Math.random() * (0xffffff + 1)))
  }

  
  /**
   * Set the title of the current embed.
   *
   * @param {string} title
   * @param {?string} [url]
   * @returns {EmbedsBuilder}
   */
  setTitle(title: string, url?: string): EmbedsBuilder {
    this.#currentEmbed.title = title

    if (url) {
      this.setUrl(url)
    }

    return this
  }

  
  /**
   * Set the thumbnail of the current embed.
   *
   * @param {string} url - URL of the image
   * @param {?Omit<DiscordEmbedThumbnail, 'url'>} [options]
   * @returns {EmbedsBuilder}
   */
  setThumbnail(url: string, options?: Omit<DiscordEmbedThumbnail, 'url'>): EmbedsBuilder {
    this.#currentEmbed.thumbnail = {
      ...this.#currentEmbed.thumbnail,
      ...options,
      url
    }

    return this
  }

  
  /**
   * Set the URL of the current embed title.
   *
   * @param {string} url
   * @returns {EmbedsBuilder}
   */
  setUrl(url: string): EmbedsBuilder {
    this.#currentEmbed.url = url

    return this
  }

  
  /**
   * Set the video of the current embed.
   *
   * @param {string} url
   * @param {?Omit<DiscordEmbedVideo, 'url'>} [options]
   * @returns {EmbedsBuilder}
   */
  setVideo(url: string, options?: Omit<DiscordEmbedVideo, 'url'>): EmbedsBuilder {
    this.#currentEmbed.video = {
      ...this.#currentEmbed.video,
      ...options,
      url
    }

    return this
  }

  // TODO: This method
  validate(): EmbedsBuilder {
    return this
  }

  
  /**
   * Returns the current embed.
   *
   * @readonly
   * @type {DiscordEmbed}
   */
  get #currentEmbed(): DiscordEmbed {
    if (this.length === 0) {
      this.newEmbed()

      return this.at(0)!
    }
 
    return this.at(-1)!
  }
}


/**
 * Custom EmbedsBuilder error.
 *
 * @class EmbedsBuilderError
 * @typedef {EmbedsBuilderError}
 * @extends {Error}
 */
class EmbedsBuilderError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "EmbedBuilderError"
  }
}