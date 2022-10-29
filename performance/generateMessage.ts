await import(`https://raw.githubusercontent.com/discordeno/discordeno/benchies/benchmarksResult/data.js`);
const commitSha = await Deno.readTextFile("./sha");
const results = JSON.parse(await Deno.readTextFile("./data.txt"));

interface BenchmarksData {
  commit: {
    author: { email: string; name: string; username: string };
    committer: { email: string; name: string; username: string };
    distinct: boolean;
    id: string;
    message: string;
    timestamp: string;
    tree_id: string;
    url: string;
  };
  date: number;
  tool: string;
  benches: { name: string; value: number; unit: string; range: string }[];
}

interface CompareTable {
  [index: string]: {
    current: { name: string; value: number; unit: string; range: string } | {
      name?: string;
      value?: number;
      unit?: string;
      range?: string;
    };
    previous: { name: string; value: number; unit: string; range: string } | {
      name?: string;
      value?: number;
      unit?: string;
      range?: string;
    };
  };
}

const benchmarks = results.entries.Benchmark.slice(-2) as BenchmarksData[];
const latestHeadBenchmarks = benchmarks[1];
const lastHeadBenchmarks = benchmarks[0];
//@ts-ignore
const latestBaseBenchmarks = JSON.parse(JSON.stringify(window.BENCHMARK_DATA.entries.Benchmark)).slice(
  -1,
)[0] as BenchmarksData;

const compareWithHead: CompareTable = {};
const compareWithBase: CompareTable = {};

for (const benchmark of lastHeadBenchmarks.benches) {
  compareWithHead[benchmark.name] = {
    previous: benchmark,
    current: {},
  };
  compareWithBase[benchmark.name] = {
    previous: benchmark,
    current: {},
  };
}
for (const benchmark of latestHeadBenchmarks.benches) {
  compareWithHead[benchmark.name] = {
    //@ts-ignore
    previous: {},
    ...compareWithHead[benchmark.name],
    current: benchmark,
  };
}
for (const benchmark of latestBaseBenchmarks.benches) {
  compareWithBase[benchmark.name] = {
    //@ts-ignore
    previous: {},
    ...compareWithBase[benchmark.name],
    current: benchmark,
  };
}

let message = "";

for (const benchmarkType of ["Performance", "Memory"]) {
  message = `# ${benchmarkType} Benchmark\n\n`;
  const compareTableInfo = [{ name: "last head", commit: lastHeadBenchmarks.commit.id }, {
    name: "base",
    commit: latestBaseBenchmarks.commit.id,
  }];
  for (const [index, compare] of [compareWithHead, compareWithBase].entries()) {
    message += `## Compare with ${compareTableInfo[index].name}\n`;
    message += "<details><summary>Detail results of benchmarks</summary>\n\n";
    message += `| Benchmark suite | Current: ${lastHeadBenchmarks.commit.id} | Previous: ${compareTableInfo[index].commit
      } | Ratio |\n | -| -| -| -|\n`;
    for (
      const field of Object.keys(compare).filter((key) =>
        benchmarkType === "Memory" && key.startsWith("[Cache Plugin]")
      )
    ) {
      message += `| \`${field}\` | ${compare[field].current.value ? `\`${compare[field].current.value}\`` : ""} ${compare[field].current.unit ?? ""
        } ${compare[field].current.range ? `(\`${compare[field].current.range ?? ""}\`)` : ""} | ${compare[field].previous.value ? `\`${compare[field].previous.value}\`` : ""
        } ${compare[field].previous.unit ?? ""} ${compare[field].previous.range ? `(\`${compare[field].previous.range ?? ""}\`)` : ""
        } | ${compare[field].previous.value && compare[field].current.value
          ? `\`${
          //@ts-ignore
          Math.round((parseFloat(compare[field].previous.value) / parseFloat(compare[field].current.value)) * 100) /
          100}\``
          : ""
        } |\n`;
    }
    message += "</details>\n\n";
  }
}

console.log(message.replaceAll("`", "\\`"));
