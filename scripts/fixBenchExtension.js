import fs from 'node:fs'

const dirs = ['']
for await (const dir of dirs) {
  await Promise.all(
    fs.readdirSync(`dist${dir}`).map(async (file) => {
      if (!file.endsWith('.js') && !file.endsWith('.map') && !file.endsWith('.ts')) {
        dirs.push(`${dir}/${file}`)
        return
      }
      const content = await fs.promises.readFile(`dist${dir}/${file}`, 'utf-8')
      fs.promises.writeFile(`dist${dir}/${file}`, content.replace(/src\//g, 'dist/').replace(/\.ts/g, '.js'))
    }),
  )
}
