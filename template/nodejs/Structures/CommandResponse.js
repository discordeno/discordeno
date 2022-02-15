const Message = require("./Message");

class Responses {
  constructor(data) {
    this.manager = data.manager;
    this.args = this._validateArguments(data.args);
    this.replied = false;
  }

  async reply(content) {
    // When just a string is passed, we assume it's the content -> transform to correct formatted payload
    if (typeof content === "string") content = { content };
    if (this.interaction) {
      if (this.replied) return this.followUp(content);
      const reply = await this.interaction.reply(content);

      //Assign properties to the response
      const response = new Message(this.client, reply);

      this.replied = true;
      return response;
    }
    if (this.message) {
      if (this.replied) return this.followUp(content);

      const msg = await this.message.channel.send(content);

      //Assign properties to the response
      const response = new Message(this.client, msg);
      this.replied = true;
      return response;
    }
  }

  async followUp(content) {
    if (this.interaction) {
      const reply = await this.interaction.followUp(content);
      const response = new Message(this.client, reply);
      return response;
    }
    if (this.message) {
      const msg = await this.message.channel.send(content);
      const response = new Message(this.client, msg);
      return response;
    }
  }

  onError(error) {
    return this.reply({ content: `A unknown Error happend: \n> ${error}` });
  }

  _validateArguments(args) {
    this.args = args;
    return args;
  }
}
module.exports = Responses;
