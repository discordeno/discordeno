import fs from 'node:fs'
import path from 'node:path'

// these two paths may vary depending on where you place this script, and your project structure including where typedoc generates its output files.
const typedocOutPath = await import('../typedoc.json', {
  assert: { type: 'json' },
}).then((module) => module.default.out)

async function* walk(dir) {
  for await (const d of await fs.promises.opendir(dir)) {
    const entry = path.join(dir, d.name)
    if (d.isDirectory()) yield* walk(entry)
    else if (d.isFile()) yield entry
  }
}

for await (let filepath of walk(typedocOutPath)) {
  if (filepath.endsWith('.json')) continue
  let file = fs.readFileSync(filepath, 'utf-8')

  if (filepath.endsWith('generated/README.md')) {
    file = [
      'discordeno-monorepo / [Modules](modules.md)',
      '',
      '# Discordeno',
      '',
      'Thank you for using Discordeno. These docs are generated automatically. If you see any issues please contact us on [Discord](https://discord.gg/ddeno)',
    ].join('\n')
  }

  // Removes the old file in case it had ugly name, will be recreated below
  fs.rmSync(filepath)

  // add all the words we need to replace here for invalid jsx errors
  const words = ['internal']
  for (const word of words) {
    file = file.replace(new RegExp(`<${word}>`, 'gi'), word)
  }

  // Converts ugly names to clean names for example discordeno_types.ActionRow becomes ActionRow
  const cleanForms = [
    { ugly: 'discordeno_bot.md', clean: 'Bot.md'},
    { ugly: 'discordeno_client.md', clean: 'Client.md'},
    { ugly: 'discordeno_gateway.md', clean: 'Gateway.md'},
    { ugly: 'discordeno_rest.md', clean: 'Rest.md'},
    { ugly: 'discordeno_types.md', clean: 'Types.md'},
    { ugly: 'discordeno_utils.md', clean: 'Utils.md'},
    { ugly: 'discordeno_bot.' },
    { ugly: 'discordeno_client.' },
    { ugly: 'discordeno_gateway.' },
    { ugly: 'discordeno_rest.' },
    { ugly: 'discordeno_types.' },
    { ugly: 'discordeno_utils.' },
  ]

  for (const form of cleanForms) {
    // Clean the file of the ugly forms
    file = file.replace(new RegExp(form.ugly, 'gi'), form.clean || '')
    const lastIndex = filepath.lastIndexOf('/')
    // Clean the file name of the ugly forms
    if (!filepath.endsWith(`${form.ugly}md`)) filepath = filepath.replace(new RegExp(form.ugly, 'gi'), form.clean || '')
  }

  file = file.replace(/Promise<([^>]+)>/gi, 'Promise{$1}')

  if (file.includes('Promise<')) console.log('Removing Promise< failed')

  if (filepath.endsWith('/md')) {
    filepath = filepath.replace('/md', '/README.md')
  }

  // if (filepath.includes('/generated/classes')) console.log('file in classes 2', filepath)
  if (filepath.includes('/generated/modules/discordeno_')) {
    const mod = filepath.substring(filepath.lastIndexOf('_') + 1)
    filepath = filepath.substring(0, filepath.lastIndexOf('/')) + `/${mod[0].toUpperCase()}${mod.substring(1)}`
  }

  fs.writeFileSync(filepath, file, function (err, result) {
    if (err) throw err
  })
}
