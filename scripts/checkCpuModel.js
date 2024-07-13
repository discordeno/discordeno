import fs from 'node:fs'
import os from 'node:os'

const hostCpu = os.cpus()[0].model.trim()
const targetCpu = await fetch('https://raw.githubusercontent.com/discordeno/discordeno/benchies/cpu')
  .then(async (res) => await res.text())
  .then((text) => text.slice(0, -1))
console.dir(`host cpu: ${hostCpu} target cpu: ${targetCpu}`)

let outputFile = fs.readFileSync(process.env.GITHUB_OUTPUT, 'utf8')
outputFile += `\nmatch=${hostCpu === targetCpu}`
fs.writeFileSync(process.env.GITHUB_OUTPUT, outputFile, 'utf8')
