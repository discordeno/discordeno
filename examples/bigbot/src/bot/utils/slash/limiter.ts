import COMMANDS from "../../commands/mod.js";

export async function validateSlashLimits() {
  const MAX_ALLOWED_CHARACTERS = 4000;

  const commands = await fetch("https://cmd-counter-play.deno.dev/", {
    body: JSON.stringify(COMMANDS),
    headers: {
      "content-type": "application/json",
    },
  }).then((res) => res.json()).catch(() => undefined);

  if (!commands) return;

  let invalidCommandNames: string[] = [];

  if (commands[0]?.characters > MAX_ALLOWED_CHARACTERS) {
    for (const command of commands) {
      if (command.characters <= MAX_ALLOWED_CHARACTERS) continue;

      invalidCommandNames.push(command.name);
      console.log(
        `[Invalid Command] The ${command.name} is not a valid command. It's total characters are (${command.characters}) which is more than the max allowed ${MAX_ALLOWED_CHARACTERS}.`,
      );
    }
  }

  if (invalidCommandNames.length) throw new Error(`[Startup] Invalid commands: ${invalidCommandNames.join(", ")}`);
}
