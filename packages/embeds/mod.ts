// The order of the import is important
import { DiscordEmbed, Embed, formatImageURL, iconBigintToHash, ImageFormat, ImageSize, User } from "./deps.ts";

import { routes } from "../../util/routes.ts";

export const embedLimits = {
  title: 256,
  description: 4096,
  fieldName: 256,
  fieldValue: 1024,
  footerText: 2048,
  authorName: 256,
  fields: 25,
  total: 6000,
};

// COPIED FROM DISCORDENO AS A TEMP SOLUTION
// TODO: remove when DD has improved utils
function avatarURL(
  userId: bigint,
  discriminator: string,
  options?: {
    avatar: bigint | undefined;
    size?: ImageSize;
    format?: ImageFormat;
  },
) {
  return options?.avatar
    ? formatImageURL(
      routes.USER_AVATAR(
        userId,
        typeof options?.avatar === "string" ? options.avatar : iconBigintToHash(options?.avatar),
      ),
      options?.size || 128,
      options?.format,
    )
    : routes.USER_DEFAULT_AVATAR(Number(discriminator) % 5);
}

export class Embeds extends Array<Embed> {
  /** The amount of characters in the embed. */
  currentTotal = 0;
  /** Whether the limits should be enforced or not. */
  enforceLimits = true;
  /** If a file is attached to the message it will be added here. */
  file?: EmbedFile;

  constructor(enforceLimits = true) {
    super();
    // By default, always enforce discord limits but this allows bypass for any reason.
    if (!enforceLimits) this.enforceLimits = false;

    return this;
  }

  fitData(data: string, max: number) {
    // If the string is bigger then the allowed max shorten it.
    if (data.length > max) data = data.substring(0, max);
    // Check the amount of characters left for this embed
    const availableCharacters = embedLimits.total - this.currentTotal;
    // If it is maxed out already return empty string as nothing can be added anymore
    if (!availableCharacters) return ``;
    // If the string breaks the maximum embed limit then shorten it.
    if (this.currentTotal + data.length > embedLimits.total) {
      return data.substring(0, availableCharacters);
    }
    // Return the data as is with no changes.
    return data;
  }

  setAuthor(name: string, iconUrl?: string | User, url?: string) {
    const embed = this.getLastEmbed();
    const finalName = this.enforceLimits ? this.fitData(name, embedLimits.authorName) : name;

    if (typeof iconUrl === "string") {
      embed.author = { name: finalName, iconUrl, url };
    } else if (iconUrl) {
      embed.author = {
        name: finalName,
        iconUrl: avatarURL(iconUrl.id, iconUrl?.discriminator, {
          avatar: iconUrl.avatar!,
        }),
        url,
      };
    } else {
      embed.author = { name: finalName, url };
    }

    return this;
  }

  setColor(color: string) {
    this.getLastEmbed().color = color.toLowerCase() === `random`
      // Random color
      ? Math.floor(Math.random() * (0xffffff + 1))
      // Convert the hex to a acceptable color for discord
      : parseInt(color.replace("#", ""), 16);

    return this;
  }

  setDescription(description: string | string[]) {
    if (Array.isArray(description)) description = description.join("\n");
    this.getLastEmbed().description = this.fitData(description, embedLimits.description);

    return this;
  }

  addField(name: string, value: string, inline = false) {
    const embed = this.getLastEmbed();

    if (embed.fields!.length >= 25) return this;

    embed.fields!.push({
      name: this.fitData(name, embedLimits.fieldName),
      value: this.fitData(value, embedLimits.fieldValue),
      inline,
    });

    return this;
  }

  addBlankField(inline = false) {
    return this.addField("\u200B", "\u200B", inline);
  }

  attachFile(file: unknown, name: string) {
    this.file = {
      blob: file,
      name,
    };
    this.setImage(`attachment://${name}`);

    return this;
  }

  setFooter(text: string, icon?: string) {
    this.getLastEmbed().footer = {
      text: this.fitData(text, embedLimits.footerText),
      iconUrl: icon,
    };

    return this;
  }

  setImage(url: string | User) {
    if (typeof url === "string") this.getLastEmbed().image = { url };
    else {
      this.getLastEmbed().image = {
        url: avatarURL(url.id, url.discriminator, {
          avatar: url.avatar!,
          size: 2048,
        }),
      };
    }

    return this;
  }

  setTimestamp(time = Date.now()) {
    this.getLastEmbed().timestamp = time;

    return this;
  }

  setTitle(title: string, url?: string) {
    this.getLastEmbed().title = this.fitData(title, embedLimits.title);
    if (url) this.getLastEmbed().url = url;

    return this;
  }

  setURL(url: string) {
    this.getLastEmbed().url = url;

    return this;
  }

  setThumbnail(url: string) {
    this.getLastEmbed().thumbnail = { url };

    return this;
  }

  addEmbed(embed?: Embed) {
    if (this.length === 10) return this;

    this.push({ ...embed, fields: embed?.fields ?? [] });

    return this;
  }

  /** Get the last DiscordEmbed, if there is no it will create one */
  getLastEmbed() {
    if (this.length) return this[this.length - 1];

    this.push({
      fields: [],
    });

    return this[0];
  }

  setFromJson(json: Record<string, any>) {
    if (json.author?.name) this.setAuthor(json.author.name, json.author.icon_url, json.url);
    if (json.title) this.setTitle(json.title, json.url);
    if (json.description) this.setDescription(json.description);
    if (json.color) this.setColor(json.color);
    if (json.timestamp) this.setTimestamp();
    if (json.footer?.text) this.setFooter(json.footer.text, json.footer.icon_url);
    if (json.thumbnail) this.setThumbnail(json.thumbnail?.url ?? json.thumbnail);
    if (json.image) this.setImage(json.image?.url ?? json.image);
    if (json.fields && Array.isArray(json.fields)) {
      for (const field of json.fields) {
        if (field.name && field.value) {
          this.addField(field.name, field.value, field.inline);
        }
      }
    }

    return this;
  }

  setFromEmbed(embed: Embed) {
    if (embed.author?.name) this.setAuthor(embed.author.name, embed.author.iconUrl, embed.url);
    if (embed.title) this.setTitle(embed.title, embed.url);
    if (embed.description) this.setDescription(embed.description);
    if (embed.color) this.getLastEmbed().color = embed.color;
    if (embed.timestamp) this.setTimestamp(embed.timestamp);
    if (embed.footer?.text) this.setFooter(embed.footer.text, embed.footer.iconUrl);
    if (embed.thumbnail?.url) this.setThumbnail(embed.thumbnail?.url);
    if (embed.image?.url) this.setImage(embed.image?.url);
    if (embed.fields && Array.isArray(embed.fields)) {
      for (const field of embed.fields) {
        if (field.name && field.value) {
          this.addField(field.name, field.value, field.inline);
        }
      }
    }

    return this;
  }

  showEmbedCode(): DiscordEmbed[] {
    return this.map((embed) => ({
      ...embed,
      timestamp: embed.timestamp ? new Date(embed.timestamp).toISOString() : undefined,
      author: embed.author
        ? {
          name: embed.author.name,
          url: embed.author.url,
          proxy_icon_url: embed.author.proxyIconUrl,
          icon_url: embed.author.iconUrl,
        }
        : undefined,
      footer: embed.footer
        ? {
          text: embed.footer.text,
          proxy_icon_url: embed.footer.proxyIconUrl,
          icon_url: embed.footer.iconUrl,
        }
        : undefined,
      image: embed.image
        ? {
          url: embed.image.url,
          height: embed.image.height,
          width: embed.image.width,
          proxy_url: embed.image.proxyUrl,
        }
        : undefined,
      thumbnail: embed.thumbnail
        ? {
          url: embed.thumbnail.url,
          height: embed.thumbnail.height,
          width: embed.thumbnail.width,
          proxy_url: embed.thumbnail.proxyUrl,
        }
        : undefined,
    }));
  }
}

export interface EmbedFile {
  blob: unknown;
  name: string;
}

export default Embeds;
