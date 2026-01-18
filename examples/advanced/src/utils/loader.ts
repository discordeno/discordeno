import { readdir } from 'node:fs/promises';
import { logger } from '@discordeno/bot';

export default async function importDirectory(folder: string): Promise<void> {
  const files = await readdir(folder, { recursive: true });

  for (const filename of files) {
    if (!filename.endsWith('.js')) continue;

    // Using `file://` and `process.cwd()` to avoid weird issues with relative paths and/or Windows
    await import(`file://${process.cwd()}/${folder}/${filename}`).catch((x) =>
      logger.fatal(`Cannot import file (${folder}/${filename}) for reason:`, x),
    );
  }
}
