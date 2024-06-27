import { startBot } from './deps.ts.js'
import { fileLoader, importDirectory } from './src/utils/loader.ts.js'
import log from './src/utils/logger.ts.js'
import { updateApplicationCommands } from './src/utils/updateCommands.ts.js'
// setup db
import './src/database/mod.ts.js'
import { Bot } from './bot.ts.js'

log.info('Starting bot...')

// Forces deno to read all the files which will fill the commands/inhibitors cache etc.
await Promise.all(
  [
    './src/commands',
    './src/events',
    // "./src/tasks",
  ].map((path) => importDirectory(Deno.realPathSync(path))),
)
await fileLoader()

// UPDATES YOUR COMMANDS TO LATEST COMMANDS
await updateApplicationCommands()

// STARTS THE CONNECTION TO DISCORD
await startBot(Bot)
