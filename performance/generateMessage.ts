//const repo = Deno.env.get('GITHUB_REPOSITORY')!;
const repo = "H01001000/discordeno"

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
/*
'# Benchmark\n' +
    '\n' +
    '<details>\n' +
    '\n' +
    '| Benchmark suite | Current: c695ea4908d8fbc9116e40ed54c935d43d315d4f | Previous: fc5b359c69696aa42df962e576a1aeea178cd2ec | Ratio |\n' +
    '|-|-|-|-|\n' +
    '| `[Guild.toggles.features - Current] Get the features of a guild` | `1520` ns/iter (`1370 … 2450`) | `1400` ns/iter (`940`) | `1.09` |\n' +
    '| `[Guild.toggles.features - Previous] Get the features of a guild` | `1500` ns/iter (`1370 … 2230`) | `1350` ns/iter (`500`) | `1.11` |\n' +
    '| `[Transformer - Current] Discord User to a User` | `178` ns/iter (`153.66 … 411.15`) | `177` ns/iter (`63`) | `1.01` |\n' +
    '| `[Transformer - Previous] Discord User to a User` | `171` ns/iter (`147.87 … 310.35`) | `183` ns/iter (`83`) | `0.93` |\n' +
    '| `[Transformer - Current] User to a Discord User` | `154` ns/iter (`135.3 … 418`) | `166` ns/iter (`52`) | `0.93` |\n' +
    '| `[Transformer - Previous] User to a Discord User` | `154` ns/iter (`136.29 … 285.83`) | `155` ns/iter (`50`) | `0.99` |\n' +
    '| `[Cache Plugin Memory Usage After Loaded DB]- RSS` | `275.31` MB (`272.54 … 276.72`) | `276.72` MB (`274.07 … 278.52`) | `0.99` |\n' +
    '| `[Cache Plugin Memory Usage After Loaded DB]- Heap Used` | `256.8` MB (`254.76 … 259.16`) | `261.27` MB (`253.82 … 266.68`) | `0.98` |\n' +
    '| `[Cache Plugin Memory Usage After Loaded DB]- Heap Total` | `274.98` MB (`271.27 … 278.49`) | `275.64` MB (`273.04 … 277.27`) | `1.00` |\n' +
    '\n' +
    '</details>\n' +
    '\n' +

console.log(Deno.env.toObject())

const match = input.match(/body: (.*?)+\n([\S\s]*?)  reaction/)

console.log(match[0].slice(6, -12))

{
  GITHUB_SHA: "d06bb8102ae411bd2758fdd1ece2409a544632ef",
  SGX_AESM_ADDR: "1",
  CHROME_BIN: "/usr/bin/google-chrome",
  GITHUB_RUN_NUMBER: "32",
  JAVA_HOME_17_X64: "/usr/lib/jvm/temurin-17-jdk-amd64",
  ACCEPT_EULA: "Y",
  _: "/opt/hostedtoolcache/deno/1.27.0/x64/deno",
  VCPKG_ROOT: "/usr/local/share/vcpkg",
  RUNNER_ARCH: "X64",
  PATH: "/home/runner/.deno/bin:/opt/hostedtoolcache/deno/1.27.0/x64:/home/runner/.local/bin:/opt/pipx_bin:/h...",
  SHLVL: "1",
  GITHUB_WORKSPACE: "/home/runner/work/discordeno/discordeno",
  DOTNET_MULTILEVEL_LOOKUP: "0",
  ANDROID_SDK_ROOT: "/usr/local/lib/android/sdk",
  GITHUB_BASE_REF: "",
  LANG: "C.UTF-8",
  RUNNER_USER: "runner",
  PIPX_BIN_DIR: "/opt/pipx_bin",
  CONDA: "/usr/share/miniconda",
  DEPLOYMENT_BASEPATH: "/opt/runner",
  GITHUB_REF: "refs/heads/benchmark",
  JAVA_HOME: "/usr/lib/jvm/temurin-11-jdk-amd64",
  USER: "runner",
  HOMEBREW_CLEANUP_PERIODIC_FULL_DAYS: "3650",
  SELENIUM_JAR_PATH: "/usr/share/java/selenium-server.jar",
  JAVA_HOME_11_X64: "/usr/lib/jvm/temurin-11-jdk-amd64",
  CHROMEWEBDRIVER: "/usr/local/share/chrome_driver",
  CI: "true",
  GITHUB_WORKFLOW: "Benchmark",
  GITHUB_API_URL: "https://api.github.com",
  EDGEWEBDRIVER: "/usr/local/share/edge_driver",
  RUNNER_TOOL_CACHE: "/opt/hostedtoolcache",
  ANDROID_HOME: "/usr/local/lib/android/sdk",
  XDG_RUNTIME_DIR: "/run/user/1001",
  RUNNER_PERFLOG: "/home/runner/perflog",
  GITHUB_HEAD_REF: "",
  GITHUB_REPOSITORY_OWNER: "H01001000",
  GITHUB_ACTION: "__run_7",
  GITHUB_PATH: "/home/runner/work/_temp/_runner_file_commands/add_path_784dff49-1365-4493-b4e5-ad943c3a76f2",
  GITHUB_EVENT_NAME: "push",
  GITHUB_ENV: "/home/runner/work/_temp/_runner_file_commands/set_env_784dff49-1365-4493-b4e5-ad943c3a76f2",
  POWERSHELL_DISTRIBUTION_CHANNEL: "GitHub-Actions-ubuntu20",
  GOROOT_1_17_X64: "/opt/hostedtoolcache/go/1.17.13/x64",
  LEIN_HOME: "/usr/local/lib/lein",
  LEIN_JAR: "/usr/local/lib/lein/self-installs/leiningen-2.9.10-standalone.jar",
  GITHUB_JOB: "benchmark",
  GITHUB_OUTPUT: "/home/runner/work/_temp/_runner_file_commands/set_output_784dff49-1365-4493-b4e5-ad943c3a76f2",
  RUNNER_TEMP: "/home/runner/work/_temp",
  HOME: "/home/runner",
  GITHUB_SERVER_URL: "https://github.com",
  VCPKG_INSTALLATION_ROOT: "/usr/local/share/vcpkg",
  DOTNET_NOLOGO: "1",
  GITHUB_ACTION_REF: "",
  JAVA_HOME_8_X64: "/usr/lib/jvm/temurin-8-jdk-amd64",
  NVM_DIR: "/home/runner/.nvm",
  GITHUB_GRAPHQL_URL: "https://api.github.com/graphql",
  GITHUB_RUN_ATTEMPT: "1",
  GITHUB_ACTION_REPOSITORY: "",
  GITHUB_EVENT_PATH: "/home/runner/work/_temp/_github_workflow/event.json",
  INVOCATION_ID: "8f1e8121c62a4ef584e01c617d5ee96b",
  HOMEBREW_NO_AUTO_UPDATE: "1",
  ImageVersion: "20221024.1",
  ANDROID_NDK_HOME: "/usr/local/lib/android/sdk/ndk/25.1.8937393",
  PIPX_HOME: "/opt/pipx",
  AGENT_TOOLSDIRECTORY: "/opt/hostedtoolcache",
  RUNNER_TRACKING_ID: "github_99029c4e-3818-47a5-afd6-60ce14258f0b",
  ANDROID_NDK: "/usr/local/lib/android/sdk/ndk/25.1.8937393",
  GOROOT_1_19_X64: "/opt/hostedtoolcache/go/1.19.2/x64",
  GITHUB_REF_NAME: "benchmark",
  RUNNER_NAME: "GitHub Actions 3",
  GRADLE_HOME: "/usr/share/gradle-7.5.1",
  GITHUB_STEP_SUMMARY: "/home/runner/work/_temp/_runner_file_commands/step_summary_784dff49-1365-4493-b4e5-ad943c3a76f2",
  STATS_PFS: "true",
  AZURE_EXTENSION_DIR: "/opt/az/azcliextensions",
  DOTNET_SKIP_FIRST_TIME_EXPERIENCE: "1",
  RUNNER_OS: "Linux",
  GOROOT_1_18_X64: "/opt/hostedtoolcache/go/1.18.7/x64",
  INPUT: "",
  GECKOWEBDRIVER: "/usr/local/share/gecko_driver",
  ANDROID_NDK_ROOT: "/usr/local/lib/android/sdk/ndk/25.1.8937393",
  XDG_CONFIG_HOME: "/home/runner/.config",
  PWD: "/home/runner/work/discordeno/discordeno",
  GITHUB_STATE: "/home/runner/work/_temp/_runner_file_commands/save_state_784dff49-1365-4493-b4e5-ad943c3a76f2",
  GITHUB_ACTIONS: "true",
  RUNNER_WORKSPACE: "/home/runner/work/discordeno",
  GITHUB_ACTOR: "H01001000",
  PERFLOG_LOCATION_SETTING: "RUNNER_PERFLOG",
  SWIFT_PATH: "/usr/share/swift/usr/bin",
  ImageOS: "ubuntu20",
  GITHUB_REPOSITORY: "H01001000/discordeno",
  GRAALVM_11_ROOT: "/usr/local/graalvm/graalvm-ce-java11-22.2.0",
  GITHUB_TRIGGERING_ACTOR: "H01001000",
  DEBIAN_FRONTEND: "noninteractive",
  BOOTSTRAP_HASKELL_NONINTERACTIVE: "1",
  ANDROID_NDK_LATEST_HOME: "/usr/local/lib/android/sdk/ndk/25.1.8937393",
  GITHUB_REF_TYPE: "branch",
  GITHUB_REF_PROTECTED: "false",
  STATS_KEEPALIVE: "false",
  ANT_HOME: "/usr/share/ant",
  JOURNAL_STREAM: "8:22230",
  GITHUB_RUN_ID: "3340069233",
  GITHUB_RETENTION_DAYS: "90"
}
*/