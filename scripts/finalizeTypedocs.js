import { writeFile } from 'node:fs/promises'
import typedocConfig from '../typedoc.json' with { type: 'json' }

const typedocOutPath = typedocConfig.out

await writeFile(
  `${typedocOutPath}/README.md`,
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
