class Responses {
    constructor(data) {
        this.manager = data.manager;
        this.message = data.message;
        this.interaction = data.interaction;
        this.client = data.client;
        this.settings = data.settings ?? {}

    /*     this.args = this._validateArguments(data.args);
        this.commandName = this._setCommandName(data.commandName); */
        this.replied = false;
    }

    async reply(content) {
        if (this.interaction) {
            if (this.replied) return (await this.followUp(content))
            let reply = await this.interaction.reply(content);
            if (!reply) reply = {};
            reply.delete = (() => { });

            this.replied = true;
            return reply;
        }
        if (this.message) {
            if (this.replied) return this.followUp(content)
            this.replied = true;
            return this.message.channel.send(content)
        }
    }

    async followUp(content) {
        if (this.interaction) {
            let reply = await this.interaction.followUp(content);
            if (!reply) reply = {};
            reply.delete = (() => { });
            return reply;
        }
        if (this.message) return this.message.channel.send(content)
    }

}
module.exports = Responses;