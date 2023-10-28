import fs from 'node:fs'

const dirs = ['']
try {
  fs.rmSync('bunTestsDist', { recursive: true, force: true })
} catch {
  //
}
for await (const dir of dirs) {
  await Promise.all(
    fs.readdirSync(`tests${dir}`).map(async (file) => {
      if (!file.endsWith('.ts') && !file.includes('.')) {
        dirs.push(`${dir}/${file}`)
        return
      }
      const content = await fs.promises.readFile(`tests${dir}/${file}`, 'utf-8')
      fs.mkdirSync(`bunTestsDist${dir}`, { recursive: true })
      fs.promises.writeFile(`bunTestsDist${dir}/${file}`, content.replace(/'mocha'/g, "'bun:test'"))
    }),
  )
}
