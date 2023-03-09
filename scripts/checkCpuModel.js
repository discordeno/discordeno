import os from 'node:os'

const hostCpu = os.cpus()[0].model.trim()
const targetCpu = await fetch('https://raw.githubusercontent.com/discordeno/discordeno/benchies/cpu').then((res) => res.text())
console.dir(`host cpu: ${hostCpu} target cpu: ${targetCpu}`)

if (hostCpu !== targetCpu) process.exit(1)
