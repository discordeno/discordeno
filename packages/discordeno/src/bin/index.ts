import { Command } from 'commander'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { readPackageUp } from 'read-package-up'
import { messageTypeGenerator } from './generators/messageTypeGenerator.js'
import { readConfig } from './utils/readConfig.js'
const program = new Command()

program.name('discordeno').description('CLI to discordeno utilities').version('0.1.0')

program
  .command('generate')
  .description('Generate types/schema for discordeno')
  .action(async () => {
    const config = await readConfig()
    const packagePath = await readPackageUp({ cwd: process.cwd() })
    const transformerPath = path.join(path.dirname(packagePath!.path), 'node_modules/.discordeno/transformer')
    await mkdir(path.join(transformerPath, 'src'), { recursive: true })

    // @ts-expect-error should check before, TODO later
    await writeFile(path.join(transformerPath, 'src', 'message.ts'), messageTypeGenerator(config.desiredProps.message))
  })

program.parse()
