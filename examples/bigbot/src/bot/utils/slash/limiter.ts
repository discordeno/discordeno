import COMMANDS from '../../commands/mod.js'

export async function validateSlashLimits(): Promise<void> {
  const MAX_ALLOWED_CHARACTERS = 4000

  const commands = await fetch('https://cmd-counter-play.deno.dev/', {
    body: JSON.stringify(COMMANDS),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then(async (res) => await res.json())
    .catch(() => undefined)

  if (!commands) return

  const invalidCommandNames: string[] = []

  if (commands[0]?.characters > MAX_ALLOWED_CHARACTERS) {
    for (const command of commands) {
      if (command.characters <= MAX_ALLOWED_CHARACTERS) continue

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      invalidCommandNames.push(command.name)
      console.log(
        `[Invalid Command] The ${command.name} is not a valid command. It's total characters are (${command.characters}) which is more than the max allowed ${MAX_ALLOWED_CHARACTERS}.`,
      )
    }
  }

  if (invalidCommandNames.length) throw new Error(`[Startup] Invalid commands: ${invalidCommandNames.join(', ')}`)
}
