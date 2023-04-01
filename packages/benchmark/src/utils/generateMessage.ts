import fs from 'fs/promises'

const benchmarkData = await fetch(`https://raw.githubusercontent.com/discordeno/discordeno/benchies/benchmarksResult/data.js`)
  .then(async (res) => await res.text())
  .then((text) => JSON.parse(text.slice(24)))

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const commitSha = await fs.readFile('./sha', 'utf-8')
const results = JSON.parse(await fs.readFile('./data.json', 'utf-8'))

interface BenchmarksData {
  commit: {
    author: { email: string; name: string; username: string }
    committer: { email: string; name: string; username: string }
    distinct: boolean
    id: string
    message: string
    timestamp: string
    tree_id: string
    url: string
  }
  date: number
  tool: string
  benches: Array<{ name: string; value: number; unit: string; range: string }>
}

type CompareTable = Record<
  string,
  {
    current:
      | { name: string; value: number; unit: string; range: string }
      | {
          name?: string
          value?: number
          unit?: string
          range?: string
        }
    previous:
      | { name: string; value: number; unit: string; range: string }
      | {
          name?: string
          value?: number
          unit?: string
          range?: string
        }
  }
>

const benchmarks = results.entries.Benchmark.slice(-2) as BenchmarksData[]
const latestHeadBenchmarks = benchmarks.length === 2 ? benchmarks[1] : benchmarks[0]
const lastHeadBenchmarks = benchmarks.length === 2 ? benchmarks[0] : undefined
const latestBaseBenchmarks = JSON.parse(JSON.stringify(benchmarkData.entries.Benchmark)).slice(-1)[0] as BenchmarksData

const compareWithHead: CompareTable = {}
const compareWithBase: CompareTable = {}

if (lastHeadBenchmarks) {
  for (const benchmark of lastHeadBenchmarks.benches) {
    compareWithHead[benchmark.name] = {
      previous: benchmark,
      current: {},
    }
  }
}
for (const benchmark of latestBaseBenchmarks.benches) {
  compareWithBase[benchmark.name] = {
    previous: benchmark,
    current: {},
  }
}
for (const benchmark of latestHeadBenchmarks.benches) {
  compareWithBase[benchmark.name] = {
    // @ts-expect-error it should work
    previous: {},
    ...compareWithBase[benchmark.name],
    current: benchmark,
  }
  compareWithHead[benchmark.name] = {
    // @ts-expect-error it should work
    previous: {},
    ...compareWithHead[benchmark.name],
    current: benchmark,
  }
}

let message = '<!-- benchmark comment by ci -->\n'

const compareTableInfo = [
  { name: 'last head', commit: lastHeadBenchmarks ? lastHeadBenchmarks.commit.id : '' },
  {
    name: 'base',
    commit: latestBaseBenchmarks.commit.id,
  },
]
for (const benchmarkType of ['Performance', 'Memory']) {
  message += `# ${benchmarkType} Benchmark\n\n`
  for (const [index, compare] of [compareWithHead, compareWithBase].entries()) {
    message += `## Compared with ${compareTableInfo[index].name}\n`
    message += '<details><summary>Detail results of benchmarks</summary>\n\n'
    message += `| Benchmark suite | Current: ${latestHeadBenchmarks.commit.id} | Previous: ${compareTableInfo[index].commit} | Ratio |\n | -| -| -| -|\n`
    for (const field of Object.keys(compare).filter((key) =>
      benchmarkType === 'Performance' ? !key.startsWith('[Cache Plugin]') : key.startsWith('[Cache Plugin]'),
    )) {
      message += `| \`${field}\` | ${compare[field].current.value ? `\`${compare[field].current.value!}\`` : ''} ${
        compare[field].current.unit ?? ''
      } ${compare[field].current.range ? `(\`${compare[field].current.range ?? ''}\`)` : ''} | ${
        compare[field].previous.value ? `\`${compare[field].previous.value!}\`` : ''
      } ${compare[field].previous.unit ?? ''} ${compare[field].previous.range ? `(\`${compare[field].previous.range ?? ''}\`)` : ''} | ${
        compare[field].previous.value && compare[field].current.value
          ? `\`${
              // @ts-expect-error it work
              Math.round((parseFloat(compare[field].previous.value) / parseFloat(compare[field].current.value)) * 100) / 100
            }\``
          : ''
      } |\n`
    }
    message += '</details>\n\n'
  }
}

console.log(message.replaceAll('`', '\\`'))
