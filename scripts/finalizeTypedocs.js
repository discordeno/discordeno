import { readdir, stat, writeFile } from 'node:fs/promises'
import typedocConfig from '../typedoc.json' with { type: 'json' }

const typedocOutPath = typedocConfig.out

for await (const rawFilepath of await readdir(typedocOutPath, { recursive: true })) {
  // Instead of dealing with / or \ as path separator, just use UNIX path separators
  const filePath = `${typedocOutPath}/${rawFilepath}`.replaceAll('\\', '/')

  const fileStat = await stat(filePath)
  if (fileStat.isDirectory()) continue
  if (filePath.endsWith('.json')) continue

  if (filePath.endsWith(`generated/README.md`)) {
    await writeFile(
      filePath,
      [
        '[**Documentation**](README.md) • **Docs**',
        '',
        '***',
        '',
        '# Discordeno',
        '',
        'Thank you for using Discordeno. These docs are generated automatically. If you see any issues please contact us on [Discord](https://discord.gg/ddeno)',
        '',
      ].join('\n'),
    )
  }
}
