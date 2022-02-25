class DestructObject {
  constructor(message = {}) {
    this.destructObject(message);
  }
  destructObject(message) {
    for (let [key, value] of Object.entries(message)) {
      this[key] = value;
    }
    return this;
  }

  toJSON() {
    return { ...this };
  }
}
module.exports = DestructObject;
