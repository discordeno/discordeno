import { readdir, readFile, rm, writeFile } from 'node:fs/promises'

const files = await readdir('dist/cjs', { recursive: true })
const promises = files
  .filter((f) => f.endsWith('.js'))
  .map(async (file) => {
    const content = await readFile(`dist/cjs/${file}`, 'utf-8')
    await rm(`dist/cjs/${file}`)
    await writeFile(`dist/cjs/${file.slice(0, -3)}.cjs`, content.replace(/\.js(?!on)/g, '.cjs'))
  })

await Promise.all(promises)
