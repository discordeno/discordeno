const BaseCommand = require("../../../Structures/BaseCommand.js");
const Embed = require("../../../Structures/Embed.js");
class evalcommand extends BaseCommand {
  static name = "eval";
  static description = "danger !!!";
  static category = "Developer";
  static slash = { name: "eval", category: "dev" };
  constructor(data) {
    super(data);
  }
  async execute() {
    if (!this.client.config.owners.includes(String(this.user.id))) return;
    if (!(this.args.length > 0)) return this.reply({ content: "**You must provide something to eval!**" });

    let inputOfEval = this.args.join(" ");
    let outputOfEval;
    let typeOfEval;

    try {
      if (this.args.includes("await")) {
        outputOfEval = await eval("(async () => {" + inputOfEval + "})()");
      } else {
        outputOfEval = await eval(inputOfEval);
      }
    } catch (e) {
      outputOfEval = e.message;
      typeOfEval = e.name;
    }

    var seen = [];
    outputOfEval = typeof outputOfEval === "object"
      ? JSON.stringify(outputOfEval, (_, value) => {
        if (value == `Bot ${this.client.config.token}`) return `BOT_TOKEN`;
        if (typeof value === "bigint") value = value.toString();
        if (typeof value === "object" && value !== null) {
          if (seen.indexOf(value) !== -1) return;
          else seen.push(value);
        }
        return value;
      }, 1)
      : outputOfEval;

    const embed = new Embed()
      .addField({ name: "Input", value: "```js\n" + inputOfEval + "```" })
      .addField({ name: "Output", value: "```json\n" + `${outputOfEval}`.slice(0, 1000) + "```" });
    this.reply({ embeds: [embed] });
  }
}
module.exports = evalcommand;
