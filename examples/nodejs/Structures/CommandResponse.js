class Responses {
  constructor(data) {
    this.manager = data.manager
    this.args = this._validateArguments(data.args)
    this.replied = false
  }

  async reply(content) {
    // When just a string is passed, we assume it's the content -> transform to correct formatted payload
    if (typeof content === 'string') content = { content }
    if (this.interaction) {
      if (this.replied) return this.followUp(content)
      await this.interaction.reply(content)
      this.replied = true
      return {}
    }
    if (this.message) {
      if (this.replied) return this.followUp(content)

      const msg = await this.message.channel.send(content)

      // Assign properties to the response
      const response = this.client.messages.forge(msg)
      this.replied = true
      return response
    }
  }

  async followUp(content) {
    if (this.interaction) {
      await this.interaction.followUp(content)
      return {}
    }
    if (this.message) {
      const msg = await this.message.channel.send(content)
      const response = this.client.messages.forge(msg)
      return response
    }
  }

  onError(error) {
    return this.reply({ content: `A unknown Error happend: \n> ${error}` })
  }

  _validateArguments(args) {
    this.args = args
    return args
  }
}
module.exports = Responses
