import { readdir } from 'node:fs/promises'
import { bot } from '../bot.js'

export default async function importDirectory(folder: string): Promise<void> {
  const files = await readdir(folder, { recursive: true })

  for (const filename of files) {
    if (!filename.endsWith('.js')) continue

    // Using `file://` and `process.cwd()` to avoid weird issues with relative paths and/or Windows
    await import(`file://${folder}/${filename}`).catch((x) => bot.logger.fatal(`Cannot import file (${folder}/${filename}) for reason:`, x))
  }
}
