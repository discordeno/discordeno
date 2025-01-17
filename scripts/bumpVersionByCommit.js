import { execSync } from 'node:child_process'
import { readFile, writeFile } from 'node:fs/promises'

const packageName = process.argv[2]

if (!packageName) {
  throw new Error('No package name specified')
}

const commitHash = execSync('git rev-parse HEAD').toString().slice(0, 7)

const file = JSON.parse(await readFile(`packages/${packageName}/package.json`, 'utf-8'))

file.version = `${file.version.split('-')[0]}-next.${commitHash}`

if (file.dependencies) {
  Object.keys(file.dependencies).forEach((dependency) => {
    if (dependency.startsWith('@discordeno/')) file.dependencies[dependency] = file.version
  })
}

await writeFile(`packages/${packageName}/package.json`, JSON.stringify(file, null, 2))

console.log(`Bumped ${packageName} to ${file.version.split('-')[0]}-next.${commitHash}`)
