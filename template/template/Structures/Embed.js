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
        if(typeof author !== 'object') throw new Error('Author must be an object');
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
        if(typeof footer !== 'object') throw new Error('Footer must be an object');
        this.footer = footer;
        return this;
    }

    setURL(url) {
        this.url = url;
        return this;
    }

    addFields(fields) {
        this.fields = fields;
        return this;
    }

    toJSON() {
        return {
            title: this.title,
            type: 'rich',
            description: this.description,
            color: this.color,
            timestamp: this.timestamp ? new Date(this.timestamp) : null,
            thumbnail: this.thumbnail,
            image: this.image,
            fields: this.fields,
            url: this.url,
            author: this.author ? {
                name: this.author.name,
                url: this.author.url,
                icon_url: this.author.icon_url,
            } : null,
            footer: this.footer ? {
                text: this.footer.text,
                icon_url: this.footer.icon_url,
            } : null,
        };
    }
}
module.exports = Embed;