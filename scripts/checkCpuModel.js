import os from 'node:os'

const hostCpu = os.cpus()[0].model.trim()
const targetCpu = await fetch('https://raw.githubusercontent.com/discordeno/discordeno/benchies/cpu')
  .then((res) => res.text())
  .then((text) => text.slice(0, -1))
console.dir(`host cpu: ${hostCpu} target cpu: ${targetCpu}`)

process.env.GITHUB_OUTPUT += `\nmatch=${hostCpu === targetCpu}`
