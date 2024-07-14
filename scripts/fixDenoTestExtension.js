import fs from 'node:fs'

const dirs = ['']
for await (const dir of dirs) {
  await Promise.all(
    fs.readdirSync(`denoTestsDist${dir}`).map(async (file) => {
      if (!file.endsWith('.js') && !file.endsWith('.map') && !file.endsWith('.ts')) {
        dirs.push(`${dir}/${file}`)
        return
      }
      const content = await fs.promises.readFile(`denoTestsDist${dir}/${file}`, 'utf-8')
      await fs.promises.rm(`denoTestsDist${dir}/${file}`)
      fs.promises.writeFile(
        `denoTestsDist${dir}/${file.slice(-8) === '.spec.js' ? `${file.slice(0, -7)}test.js` : file}`,
        content
          .replace(/src\//g, 'dist/esm/')
          .replace(/describe\.skip/g, 'describe.ignore')
          .replace(/it\.skip/g, 'it.ignore'),
      )
    }),
  )
}
