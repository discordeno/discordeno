class Options {
  constructor(components) {
    this.components = components;
  }

  get(customId) {
    return this.components.map((x) => x.components).flat().find((x) => x.custom_id === customId);
  }
}
module.exports = Options;
