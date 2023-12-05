import fs from 'node:fs'

const dirs = ['']
for await (const dir of dirs) {
  await Promise.all(
    fs.readdirSync(`dist/cjs${dir}`).map(async (file) => {
      if (!file.endsWith('.js') && !file.endsWith('.map') && !file.endsWith('.ts') && !file.endsWith('.cjs')) {
        dirs.push(`${dir}/${file}`)
        return
      }
      const content = await fs.promises.readFile(`dist/cjs${dir}/${file}`, 'utf-8')
      await fs.promises.rm(`dist/cjs${dir}/${file}`)
      fs.promises.writeFile(`dist/cjs${dir}/${file.slice(0, -3)}.cjs`, content.replace(/\.js/g, '.cjs'))
    }),
  )
}
