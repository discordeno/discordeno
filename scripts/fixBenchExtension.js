import fs from 'node:fs'

const dirs = ['']
for await (const dir of dirs) {
  await Promise.all(
    fs.readdirSync(`benchDist${dir}`).map(async (file) => {
      if (!file.endsWith('.js')) {
        dirs.push(`${dir}/${file}`)
        return
      }
      const content = await fs.promises.readFile(
        `benchDist${dir}/${file}`,
        'utf-8'
      )
      fs.promises.writeFile(
        `benchDist${dir}/${file}`,
        content.replace(/src\//g, 'dist/').replace(/\.ts/g, '.js')
      )
    })
  )
}
