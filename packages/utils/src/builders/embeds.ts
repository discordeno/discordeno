import type { DiscordEmbed, DiscordEmbedAuthor, DiscordEmbedField, DiscordEmbedFooter, DiscordEmbedImage, DiscordEmbedThumbnail, DiscordEmbedVideo } from "@discordeno/types";

export class EmbedsBuilder extends Array<DiscordEmbed> {
  // TODO: Maybe make all interfaces camelcase and use cameltosnakecase?
  // TODO: add timestamp method

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

  newEmbed(): EmbedsBuilder {
    if (this.length >= 10) {
      throw new EmbedBuilderError("Maximum embed count exceeded. You can not have more than 10 embeds.")
    }

    this.push({})

    return this
  }

  setAuthor(name: string, options?: Omit<DiscordEmbedAuthor, 'name'>): EmbedsBuilder {
    this.#currentEmbed.author = {
      ...this.#currentEmbed.author,
      ...options,
      name
    }

    return this
  }

  setColor(color: number | string): EmbedsBuilder {
    if (typeof color === 'string') {
      const convertedValue = parseInt(color.replace('#', ''), 16)
      color = Number.isNaN(convertedValue) ? 0 : convertedValue
    }

    this.#currentEmbed.color = color

    return this
  }

  setDescription(description: string): EmbedsBuilder {
    this.#currentEmbed.description = description

    return this
  }

  setFields(fields: DiscordEmbedField[]): EmbedsBuilder {
    if (this.#currentEmbed.fields === undefined) {
      this.#currentEmbed.fields = fields

      return this
    }

    this.#currentEmbed.fields.push(...fields)

    return this
  }

  setFooter(text: string, options?: Omit<DiscordEmbedFooter, 'text'>): EmbedsBuilder {
    this.#currentEmbed.footer = {
      ...this.#currentEmbed.footer,
      ...options,
      text
    }

    return this
  }

  setImage(url: string, options?: Omit<DiscordEmbedImage, 'url'>): EmbedsBuilder {
    this.#currentEmbed.image = {
      ...this.#currentEmbed.image,
      ...options,
      url
    }

    return this
  }

  setProvider(name: string, url?: string): EmbedsBuilder {
    this.#currentEmbed.provider = {
      name,
      url
    }

    return this
  }

  setRandomColor(): EmbedsBuilder {
    return this.setColor(Math.floor(Math.random() * (0xffffff + 1)))
  }

  setTitle(title: string, url?: string): EmbedsBuilder {
    this.#currentEmbed.title = title

    if (url) {
      this.#currentEmbed.url = url
    }

    return this
  }

  setThumbnail(url: string, options?: Omit<DiscordEmbedThumbnail, 'url'>): EmbedsBuilder {
    this.#currentEmbed.thumbnail = {
      ...this.#currentEmbed.thumbnail,
      ...options,
      url
    }

    return this
  }

  setUrl(url: string): EmbedsBuilder {
    this.#currentEmbed.url = url

    return this
  }

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

  get #currentEmbed(): DiscordEmbed {
    if (this.length === 0) {
      this.newEmbed()

      return this.at(0)!
    }
 
    return this.at(-1)!
  }
}

class EmbedBuilderError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "EmbedBuilderError"
  }
}