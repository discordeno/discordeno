import fs from 'node:fs'

const dirs = ['']
for await (const dir of dirs) {
  await Promise.all(
    fs.readdirSync(`denoTestsDist${dir}`).map(async (file) => {
      if (!file.endsWith('.js')) {
        dirs.push(`${dir}/${file}`)
        return
      }
      const content = await fs.promises.readFile(
        `denoTestsDist${dir}/${file}`,
        'utf-8'
      )
      fs.promises.writeFile(
        `denoTestsDist${dir}/${file.slice(0, -7)}test.js`,
        content.replace(/src\//g, 'dist/').replace(/\.ts/g, '.js')
      )
      fs.promises.rm(`denoTestsDist${dir}/${file}`)
    })
  )
}
