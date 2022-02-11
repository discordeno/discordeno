const Constants = {
  PRIMARY: 1,
  SECONDARY: 2,
  SUCCESS: 3,
  DANGER: 4,
  LINK: 5,
  SHORT: 1,
  PARAGRAPH: 2,

  ACTION_ROW: 1,
  BUTTON: 2,
  SELECT_MENU: 3,
  TEXT_INPUT: 4,
};
class Component {
  constructor(options = {}) {
    this.type = options.type;
    this.custom_id = options.custom_id ?? options.customId;
    this.disabled = options.disabled;
    this.style = options.style;
    this.label = options.label;
    this.emoji = options.emoji;
    this.url = options.url;

    //Select Menu
    this.options = options.options;
    this.placeholder = options.placeholder;
    this.min_values = options.min_values ?? options.minValues;
    this.max_values = options.max_values ?? options.maxValues;

    //Action Row
    this.components = options.components;

    //Modal
    this.value = options.value;
    this.min_length = options.min_length ?? options.minLength;
    this.max_length = options.max_length ?? options.maxLength;
    this.required = options.required;
  }

  setType(type) {
    if (typeof type === "string") {
      this.type = Constants[type.toUpperCase()];
      if (!this.type) throw new Error(`Invalid Component Type: ${type}`);
    } else this.type = type;
    return this;
  }

  setCustomId(custom_id) {
    if (!this.url) this.custom_id = custom_id;
    return this;
  }

  setDisabled(disabled) {
    this.disabled = disabled;
    return this;
  }

  setRequired(required) {
    this.required = required;
    return this;
  }

  setStyle(style) {
    if (!this.url) {
      if (typeof style === "string") {
        this.style = Constants[style.toUpperCase()];
        if (!this.style) throw new Error(`Invalid Button Style Type: ${type}`);
      } else this.style = style;
    }
    return this;
  }

  setLabel(label) {
    this.label = label;
    return this;
  }

  setEmoji(emoji) {
    this.emoji = emoji;
    return this;
  }

  setUrl(url) {
    this.url = url;
    this.style = 5;
    this.custom_id = undefined;
    return this;
  }

  setOptions(options) {
    this.options = options;
    return this;
  }

  setValue(value) {
    this.value = value;
    return this;
  }

  setPlaceholder(placeholder) {
    this.placeholder = placeholder;
    return this;
  }

  setMinValues(min_values) {
    this.min_values = min_values;
    return this;
  }

  setMaxValues(max_values) {
    this.max_values = max_values;
    return this;
  }

  setMinLength(min_values) {
    this.min_length = min_values;
    return this;
  }

  setMaxLength(max_values) {
    this.max_length = max_values;
    return this;
  }

  setComponents(...components) {
    this.components = components;
    return this;
  }

  toJSON() {
    if (!this.type) throw new Error("Component must have a type");
    const json = {
      type: this.type,
    };
    if (this.type === 1) {
      json.components = this.components;
    }

    if (this.type === 2) {
      json.customId = this.custom_id;
      json.style = this.style;
      json.label = this.label;
      json.emoji = this.emoji;
      json.url = this.url;
      json.disabled = this.disabled;
    }

    if (this.type === 3) {
      json.customId = this.custom_id;
      json.options = this.options;
      json.placeholder = this.placeholder;
      json.minValues = this.min_values;
      json.maxValues = this.max_values;
      json.disabled = this.disabled;
    }

    if (this.type === 4) {
      json.customId = this.custom_id;
      json.style = this.style;
      json.label = this.label;
      json.minLength = this.min_length;
      json.maxLength = this.max_length;
      json.required = this.required;
      json.value = this.value;
      json.placeholder = this.placeholder;
    }
    return json;
  }
}
module.exports = Component;
