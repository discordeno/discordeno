import type {
  DiscordEmbed,
  DiscordEmbedAuthor,
  DiscordEmbedField,
  DiscordEmbedFooter,
  DiscordEmbedImage,
  DiscordEmbedThumbnail,
  DiscordEmbedVideo,
} from '@discordeno/types'

/**
 * A builder to help create Discord embeds.
 *
 * @example
 * const embeds = new EmbedBuilder()
 *  .setTitle('My Embed')
 *  .setDescription('This is my new embed')
 *  .newEmbed()
 *  .setTitle('My Second Embed')
 */
export class EmbedsBuilder extends Array<DiscordEmbed> {
  #currentEmbedIndex: number = 0

  /**
   * Adds a new field to the embed fields array.
   *
   * @param {string} name - Field name
   * @param {string} value - Field value
   * @param {?boolean} [inline=false] - Field should be inline or not.
   * @returns {EmbedsBuilder}
   */
  addField(name: string, value: string, inline?: boolean): this {
    if (this.#currentEmbed.fields === undefined) {
      this.#currentEmbed.fields = []
    }

    this.#currentEmbed.fields.push({
      name,
      value,
      inline,
    })

    return this
  }

  /**
   * Creates a blank embed.
   *
   * @returns {EmbedsBuilder}
   */
  newEmbed(): this {
    if (this.length >= 10) {
      throw new Error('Maximum embed count exceeded. You can not have more than 10 embeds.')
    }

    this.push({})
    this.setCurrentEmbed()

    return this
  }

  /**
   * Set the current embed author.
   *
   * @param {string} name - Name of the author
   * @param {?Omit<DiscordEmbedAuthor, 'name'>} [options] - Extra author options
   * @returns {EmbedsBuilder}
   */
  setAuthor(name: string, options?: Omit<DiscordEmbedAuthor, 'name'>): this {
    this.#currentEmbed.author = {
      ...this.#currentEmbed.author,
      ...options,
      name,
    }

    return this
  }

  /**
   * Set the color on the side of the current embed.
   *
   * @param {(number | string)} color - The color, in base16 or hex color code
   * @returns {EmbedsBuilder}
   */
  setColor(color: number | string): this {
    if (typeof color === 'string') {
      const convertedValue = parseInt(color.replace('#', ''), 16)
      color = Number.isNaN(convertedValue) ? 0 : convertedValue
    }

    this.#currentEmbed.color = color

    return this
  }

  /**
   * Set the current embed to a different index.
   *
   * WARNING: Only use this method if you know what you're doing. Make sure to set it back to the latest when you're done.
   *
   * @param {?number} [index] - The index of the embed in the EmbedsBuilder array
   * @returns {EmbedsBuilder}
   */
  setCurrentEmbed(index?: number): this {
    if (index === undefined) {
      this.#currentEmbedIndex = this.length - 1

      return this
    }

    if (index >= this.length || index < 0) {
      throw new Error('Can not set the current embed to a index out of bounds.')
    }

    this.#currentEmbedIndex = index

    return this
  }

  /**
   * Set the description of the current embed.
   *
   * @param {string} description - Description
   * @returns {EmbedsBuilder}
   */
  setDescription(description: string): this {
    this.#currentEmbed.description = description

    return this
  }

  /**
   * Overwrite all fields on the current embed.
   *
   * @param {DiscordEmbedField[]} fields
   * @returns {EmbedsBuilder}
   */
  setFields(fields: DiscordEmbedField[]): this {
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
  setFooter(text: string, options?: Omit<DiscordEmbedFooter, 'text'>): this {
    this.#currentEmbed.footer = {
      ...this.#currentEmbed.footer,
      ...options,
      text,
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
  setImage(url: string, options?: Omit<DiscordEmbedImage, 'url'>): this {
    this.#currentEmbed.image = {
      ...this.#currentEmbed.image,
      ...options,
      url,
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
  setProvider(name: string, url?: string): this {
    this.#currentEmbed.provider = {
      name,
      url,
    }

    return this
  }

  /**
   * Set the color of the current embed to a random value.
   *
   * @returns {EmbedsBuilder}
   */
  setRandomColor(): this {
    return this.setColor(Math.floor(Math.random() * (0xffffff + 1)))
  }

  /**
   * Set the title of the current embed.
   *
   * @param {string} title
   * @param {?string} [url]
   * @returns {EmbedsBuilder}
   */
  setTitle(title: string, url?: string): this {
    this.#currentEmbed.title = title

    if (url) {
      this.setUrl(url)
    }

    return this
  }

  /**
   * Set the timestamp of the current embed.
   *
   * @param {?(string | number | Date)} [timestamp]
   * @returns {EmbedsBuilder}
   */
  setTimestamp(timestamp?: string | number | Date): this {
    this.#currentEmbed.timestamp = new Date(timestamp!).toISOString()

    return this
  }

  /**
   * Set the thumbnail of the current embed.
   *
   * @param {string} url - URL of the image
   * @param {?Omit<DiscordEmbedThumbnail, 'url'>} [options]
   * @returns {EmbedsBuilder}
   */
  setThumbnail(url: string, options?: Omit<DiscordEmbedThumbnail, 'url'>): this {
    this.#currentEmbed.thumbnail = {
      ...this.#currentEmbed.thumbnail,
      ...options,
      url,
    }

    return this
  }

  /**
   * Set the URL of the current embed title.
   *
   * @param {string} url
   * @returns {EmbedsBuilder}
   */
  setUrl(url: string): this {
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
  setVideo(url: string, options?: Omit<DiscordEmbedVideo, 'url'>): this {
    this.#currentEmbed.video = {
      ...this.#currentEmbed.video,
      ...options,
      url,
    }

    return this
  }

  /**
   * Validate all embeds available against current known Discord limits to help prevent bad requests.
   *
   * @returns {EmbedsBuilder}
   */
  validate(): this {
    let totalCharacters = 0

    if (this.length > 10) {
      throw new Error('You can not have more than 10 embeds on a single message.')
    }

    this.forEach(({ author, description, fields, footer, title }, index) => {
      if (title) {
        const trimmedTitle = title.trim()

        if (trimmedTitle.length > 256) {
          throw new Error(`Title of embed ${index} can not be longer than 256 characters.`)
        }

        totalCharacters += trimmedTitle.length
      }

      if (description) {
        const trimmedDescription = description.trim()

        if (trimmedDescription.length > 4096) {
          throw new Error(`Description of embed ${index} can not be longer than 4096 characters.`)
        }

        totalCharacters += trimmedDescription.length
      }

      if (fields) {
        if (fields.length > 25) {
          throw new Error(`embed ${index} can not have more than 25 fields.`)
        }

        fields.forEach(({ name, value }, fieldIndex) => {
          const trimmedName = name.trim()
          const trimmedValue = value.trim()

          if (trimmedName.length > 256) {
            throw new Error(`Name of field ${fieldIndex} on embed ${index} can not be longer than 256 characters.`)
          }

          if (trimmedValue.length > 4096) {
            throw new Error(`Value of field ${fieldIndex} on embed ${index} can not be longer than 1024 characters.`)
          }

          totalCharacters += trimmedName.length
          totalCharacters += trimmedValue.length
        })
      }

      if (footer) {
        const trimmedFooterText = footer.text.trim()

        if (trimmedFooterText.length > 2048) {
          throw new Error(`Footer text of embed ${index} can not be longer than 2048 characters.`)
        }

        totalCharacters += trimmedFooterText.length
      }

      if (author) {
        const trimmedAuthorName = author.name.trim()

        if (trimmedAuthorName.length > 256) {
          throw new Error(`Author name of embed ${index} can not be longer than 256 characters.`)
        }

        totalCharacters += trimmedAuthorName.length
      }
    })

    if (totalCharacters > 6000) {
      throw new Error('Total character length of all embeds can not exceed 6000 characters.')
    }

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
      this.setCurrentEmbed()
    }

    return this[this.#currentEmbedIndex]
  }
}
