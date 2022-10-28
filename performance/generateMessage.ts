const repo = Deno.readTextFile('./repo')

await import(`https://raw.githubusercontent.com/${repo}/benchies/benchmarksResult/MemoryBenchmark/data.js`)

if (window.BENCHMARK_DATA) {
  const benchmarks = JSON.parse(JSON.stringify(window.BENCHMARK_DATA.entries.Benchmark)).slice(-2) as {
    commit: {
      author: { email: string, name: string, username: string },
      committer: { email: string, name: string, username: string },
      distinct: boolean,
      id: string,
      message: string,
      timestamp: string,
      tree_id: string,
      url: string
    },
    date: number,
    tool: string,
    benches: { name: string, value: number, unit: string, range: string }[]
  }[]

  const compare: {
    [index: string]: {
      current: { name: string, value: number, unit: string, range: string } | { name?: string, value?: number, unit?: string, range?: string }
      previous: { name: string, value: number, unit: string, range: string } | { name?: string, value?: number, unit?: string, range?: string }
    }
  } = {}

  for (const benchmark of benchmarks[0].benches) {
    compare[benchmark.name] = {
      previous: benchmark,
      current: {}
    }
  }
  for (const benchmark of benchmarks[1].benches) {
    compare[benchmark.name] = {
      //@ts-ignore
      previous: {},
      ...compare[benchmark.name],
      current: benchmark
    }
  }
  let message = `# Benchmark\n\n| Benchmark suite | Current: ${benchmarks[1].commit.id} | Previous: ${benchmarks[0].commit.id} | Ratio |\n|-|-|-|-|\n`
  for (const field of Object.keys(compare)) {
    message += `| \`${field}\` | ${compare[field].current.value ? `\`${compare[field].current.value}\`` : ''} ${compare[field].current.unit ?? ''} ${compare[field].current.range ? `(\`${compare[field].current.range ?? ''}\`)` : ''} | ${compare[field].previous.value ? `\`${compare[field].previous.value}\`` : ''} ${compare[field].previous.unit ?? ''} ${compare[field].previous.range ? `(\`${compare[field].previous.range ?? ''}\`)` : ''} | ${compare[field].previous.value && compare[field].current.value ? `\`${Math.round((parseFloat(compare[field].previous.value) / parseFloat(compare[field].current.value)) * 100) / 100}\`` : ''} |\n`
  }
  console.log(message.replaceAll('`', "\\`"))
}