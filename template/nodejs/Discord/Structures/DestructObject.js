class DestructObject {
  constructor(message = {}, removeFields = {}) {
    this._raw = message;
    this.destructObject(message, removeFields);
  }
  destructObject(message, removeFields) {
    for (let [key, value] of Object.entries(message)) {
      if (!removeFields[key]) {
        this[key] = value;
      } else {
        this[`_${key}`] = value;
      }
    }
    return this;
  }

  toJSON() {
    return { ...this };
  }
}
module.exports = DestructObject;
