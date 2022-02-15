class Embed {
  constructor(options = {}) {
    this.title = options.title;
    this.description = options.description;
    this.fields = options.fields;
    this.thumbnail = options.thumbnail;
    this.image = options.image;
    this.author = options.author;
    this.color = options.color;
    this.timestamp = options.timestamp;
    this.footer = options.footer;
    this.url = options.url;
    this.fields = options.fields ?? [];
  }
  setTitle(title) {
    this.title = title;
    return this;
  }

  setDescription(description) {
    this.description = description;
    return this;
  }

  setThumbnail(thumbnail) {
    this.thumbnail = thumbnail;
    return this;
  }

  setImage(image) {
    this.image = image;
    return this;
  }

  setAuthor(author) {
    if (typeof author !== "object") throw new Error("Author must be an object");
    this.author = author;
    return this;
  }

  setColor(color) {
    this.color = color;
    return this;
  }

  setTimestamp(timestamp) {
    this.timestamp = timestamp ?? Date.now();
    return this;
  }

  setFooter(footer) {
    if (typeof footer !== "object") throw new Error("Footer must be an object");
    this.footer = footer;
    return this;
  }

  setURL(url) {
    this.url = url;
    return this;
  }

  addField(field) {
    this.fields.push(field);
    return this;
  }

  addFields(...fields) {
    fields.map((x) => this.addField(x));
    return this;
  }

  toJSON() {
    return {
      title: this.title,
      type: "rich",
      description: this.description,
      color: this.color,
      timestamp: this.timestamp ? new Date(this.timestamp).toISOString() : null,
      thumbnail: this.thumbnail,
      image: this.image,
      fields: this.fields,
      url: this.url,
      author: this.author
        ? {
          name: this.author.name,
          url: this.author.url,
          iconUrl: this.author.icon_url || this.author.iconUrl,
        }
        : null,
      footer: this.footer
        ? {
          text: this.footer.text,
          iconUrl: this.footer.icon_url || this.footer.iconUrl,
        }
        : null,
    };
  }
}
module.exports = Embed;
