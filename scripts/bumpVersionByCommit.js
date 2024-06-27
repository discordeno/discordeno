import childProcess from 'node:child_process'
import fs from 'node:fs/promises'
import { argv } from 'node:process'

const packageName = argv[2]

if (!packageName) {
  throw new Error('No package name specified')
}

const commitHash = childProcess.execSync('git rev-parse HEAD').toString().trim().slice(0, 7)

const file = JSON.parse(await fs.readFile(`packages/${packageName}/package.json`, 'utf-8'))

const oldVersion = file.version
file.version = `${oldVersion.split('-')[0]}-next.${commitHash}`

if (file.dependencies) {
  Object.keys(file.dependencies).forEach((dependency) => {
    if (dependency.startsWith('@discordeno/')) file.dependencies[dependency] = file.version
  })
}

await fs.writeFile(`packages/${packageName}/package.json`, JSON.stringify(file, null, 2))

console.log(`Bumped ${packageName} to ${file.version.split('-')[0]}-next.${commitHash}`)
