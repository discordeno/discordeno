window.BENCHMARK_DATA = {
  "lastUpdate": 1680552170935,
  "repoUrl": "https://github.com/discordeno/discordeno",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "heiheiho000@gmail.com",
            "name": "Jonathan Ho",
            "username": "H01001000"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "782a778a1dca5cb4808a607beb4d23149e4da400",
          "message": "ci: add git reset before store benchmark (#2938)",
          "timestamp": "2023-04-02T02:25:01Z",
          "tree_id": "d94765002e3952e28c98b1851ba8ae292194d826",
          "url": "https://github.com/discordeno/discordeno/commit/782a778a1dca5cb4808a607beb4d23149e4da400"
        },
        "date": 1680402440095,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "[Cache Plugin] RSS",
            "value": 0.14,
            "range": "±2.93%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 15.61,
            "range": "±1.01%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 0,
            "range": "±0%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "rest.simplifyUrl",
            "value": 233811,
            "range": "±0.25%",
            "unit": "ops/sec",
            "extra": "96 samples"
          },
          {
            "name": "Camelize 1 event",
            "value": 7073,
            "range": "±0.41%",
            "unit": "ops/sec",
            "extra": "93 samples"
          },
          {
            "name": "Snakelize 1 event",
            "value": 7117,
            "range": "±0.39%",
            "unit": "ops/sec",
            "extra": "94 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "23035000+Skillz4Killz@users.noreply.github.com",
            "name": "Skillz4Killz",
            "username": "Skillz4Killz"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "dea9d1d1521fe45633ba3734a407f1314395e6a2",
          "message": "fix(transformers): message transformer using different style (#2916)\n\n* fix(transformers): message transformer using different style\r\n\r\n* fix: more bench tests\r\n\r\n* fix(bench): token can not be empty\r\n\r\n* more desired props\r\n\r\n* fix: bug on message.id props\r\n\r\n* fix: transfomrer errors on bench\r\n\r\n---------\r\n\r\nCo-authored-by: Jonathan Ho <heiheiho000@gmail.com>",
          "timestamp": "2023-04-01T21:26:46-05:00",
          "tree_id": "e12f30a67872beebb28337257e82dd80b635ae51",
          "url": "https://github.com/discordeno/discordeno/commit/dea9d1d1521fe45633ba3734a407f1314395e6a2"
        },
        "date": 1680402502059,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "[transformer] message cache check RSS",
            "value": 121.03,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Used",
            "value": 118.25,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Total",
            "value": 106.36,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check RSS",
            "value": 77.82,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Used",
            "value": 102.87,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Total",
            "value": 80.67,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 0.61,
            "range": "±2.84%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 10.64,
            "range": "±1.44%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 0,
            "range": "±0%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "rest.simplifyUrl",
            "value": 234190,
            "range": "±0.23%",
            "unit": "ops/sec",
            "extra": "95 samples"
          },
          {
            "name": "Camelize 1 event",
            "value": 7614,
            "range": "±0.55%",
            "unit": "ops/sec",
            "extra": "94 samples"
          },
          {
            "name": "Snakelize 1 event",
            "value": 7590,
            "range": "±0.60%",
            "unit": "ops/sec",
            "extra": "96 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "to@itoh.at",
            "name": "ITOH",
            "username": "itohatweb"
          },
          "committer": {
            "email": "to@itoh.at",
            "name": "ITOH",
            "username": "itohatweb"
          },
          "distinct": true,
          "id": "bb5e15d808db2f1293191c40016869793b55c6ae",
          "message": "trigger tests",
          "timestamp": "2023-04-02T15:30:26+02:00",
          "tree_id": "e12f30a67872beebb28337257e82dd80b635ae51",
          "url": "https://github.com/discordeno/discordeno/commit/bb5e15d808db2f1293191c40016869793b55c6ae"
        },
        "date": 1680442297947,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "[transformer] message cache check RSS",
            "value": 118.77,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Used",
            "value": 119.31,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Total",
            "value": 106.09,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check RSS",
            "value": 86.26,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Used",
            "value": 101.83,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Total",
            "value": 79.36,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 0.58,
            "range": "±3%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 10.72,
            "range": "±1.45%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 0,
            "range": "±0%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "rest.simplifyUrl",
            "value": 222790,
            "range": "±0.23%",
            "unit": "ops/sec",
            "extra": "93 samples"
          },
          {
            "name": "Camelize 1 event",
            "value": 6553,
            "range": "±0.22%",
            "unit": "ops/sec",
            "extra": "93 samples"
          },
          {
            "name": "Snakelize 1 event",
            "value": 6535,
            "range": "±0.27%",
            "unit": "ops/sec",
            "extra": "97 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "to@itoh.at",
            "name": "ITOH",
            "username": "itohatweb"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "56946047c1dd56ae604da34c6363c7d024e5f36e",
          "message": "fix(README): dd logo path (#2941)",
          "timestamp": "2023-04-02T15:38:08+02:00",
          "tree_id": "73714d979885cc2f28848a751fa25a6487586698",
          "url": "https://github.com/discordeno/discordeno/commit/56946047c1dd56ae604da34c6363c7d024e5f36e"
        },
        "date": 1680442764287,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "[transformer] message cache check RSS",
            "value": 119.07,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Used",
            "value": 116.95,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Total",
            "value": 107.67,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check RSS",
            "value": 74.26,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Used",
            "value": 101.63,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Total",
            "value": 74.64,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 0.61,
            "range": "±2.84%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 10.65,
            "range": "±1.44%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 0,
            "range": "±0%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "rest.simplifyUrl",
            "value": 229452,
            "range": "±0.15%",
            "unit": "ops/sec",
            "extra": "96 samples"
          },
          {
            "name": "Camelize 1 event",
            "value": 6661,
            "range": "±0.13%",
            "unit": "ops/sec",
            "extra": "97 samples"
          },
          {
            "name": "Snakelize 1 event",
            "value": 6590,
            "range": "±0.11%",
            "unit": "ops/sec",
            "extra": "95 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "to@itoh.at",
            "name": "ITOH",
            "username": "itohatweb"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "7b0964d24a735f76ef289964612fb77c5f4755c3",
          "message": "fix(README): dd logo path (#2943)",
          "timestamp": "2023-04-02T15:20:26Z",
          "tree_id": "73714d979885cc2f28848a751fa25a6487586698",
          "url": "https://github.com/discordeno/discordeno/commit/7b0964d24a735f76ef289964612fb77c5f4755c3"
        },
        "date": 1680448907461,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "[transformer] message cache check RSS",
            "value": 120.48,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Used",
            "value": 118.39,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Total",
            "value": 106.36,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Used",
            "value": 103.03,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Total",
            "value": 74.9,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 0.67,
            "range": "±3.01%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 10.68,
            "range": "±1.44%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 0,
            "range": "±0%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "rest.simplifyUrl",
            "value": 226323,
            "range": "±0.18%",
            "unit": "ops/sec",
            "extra": "95 samples"
          },
          {
            "name": "Camelize 1 event",
            "value": 6616,
            "range": "±0.25%",
            "unit": "ops/sec",
            "extra": "94 samples"
          },
          {
            "name": "Snakelize 1 event",
            "value": 6565,
            "range": "±0.24%",
            "unit": "ops/sec",
            "extra": "93 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "to@itoh.at",
            "name": "ITOH",
            "username": "itohatweb"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "92e25959efb72126bee298be444c5dff2564a25d",
          "message": "build: update turbo (#2942)",
          "timestamp": "2023-04-02T15:29:15Z",
          "tree_id": "5919f29fd9cb74bafbc8584b7616e4e68f8668c3",
          "url": "https://github.com/discordeno/discordeno/commit/92e25959efb72126bee298be444c5dff2564a25d"
        },
        "date": 1680449482381,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "[transformer] message cache check RSS",
            "value": 122.73,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Used",
            "value": 117.2,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Total",
            "value": 106.88,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check RSS",
            "value": 2.1,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Used",
            "value": 101.64,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Total",
            "value": 83.03,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 0.58,
            "range": "±3%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 10.64,
            "range": "±1.44%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 0,
            "range": "±0%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "rest.simplifyUrl",
            "value": 222323,
            "range": "±0.30%",
            "unit": "ops/sec",
            "extra": "92 samples"
          },
          {
            "name": "Camelize 1 event",
            "value": 6260,
            "range": "±0.35%",
            "unit": "ops/sec",
            "extra": "94 samples"
          },
          {
            "name": "Snakelize 1 event",
            "value": 6276,
            "range": "±0.24%",
            "unit": "ops/sec",
            "extra": "96 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "to@itoh.at",
            "name": "ITOH",
            "username": "itohatweb"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "17a52fec1bb37fa2f9105ee4c495368cc6d1a568",
          "message": "fix(rest, types)!: support auditlog reason (#2940)\n\n* fix(rest, types)!: support auditlog reason\nImproved the consistency by separating the audit log reason to an optional function parameter.\nAlso added support for 100% documented reason endpoints.\n\n* missing stuff\n\n* fix this\n\n* fix e3e",
          "timestamp": "2023-04-02T15:38:06Z",
          "tree_id": "bb6b5beb14449ce6c3458d1cf3527c5f4be27a81",
          "url": "https://github.com/discordeno/discordeno/commit/17a52fec1bb37fa2f9105ee4c495368cc6d1a568"
        },
        "date": 1680449967028,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "[transformer] message cache check RSS",
            "value": 118.24,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Used",
            "value": 118.09,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Total",
            "value": 106.88,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check RSS",
            "value": 73.77,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Used",
            "value": 102.15,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Total",
            "value": 72.8,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 0.7,
            "range": "±2.87%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 10.72,
            "range": "±1.44%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 0,
            "range": "±0%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "rest.simplifyUrl",
            "value": 225225,
            "range": "±0.19%",
            "unit": "ops/sec",
            "extra": "96 samples"
          },
          {
            "name": "Camelize 1 event",
            "value": 6620,
            "range": "±0.19%",
            "unit": "ops/sec",
            "extra": "95 samples"
          },
          {
            "name": "Snakelize 1 event",
            "value": 6585,
            "range": "±0.16%",
            "unit": "ops/sec",
            "extra": "94 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "heiheiho000@gmail.com",
            "name": "Jonathan Ho",
            "username": "H01001000"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "7a69c02d13f5824d6747519523d1cacd381311fa",
          "message": "feat(site): add back benchmark to site (also change cpu model) (#2939)\n\n* ci: add concurrency for deploy site\n\n* feat(site): add benchmark\n\n* refactor(bench): overwrite old result with new\n\n* Update packages/benchmark/src/generateMessage.ts\n\nCo-authored-by: ITOH <to@itoh.at>\n\n* Update scripts/generateMessage.js\n\nCo-authored-by: ITOH <to@itoh.at>\n\n* Update site.yml\n\n---------\n\nCo-authored-by: ITOH <to@itoh.at>",
          "timestamp": "2023-04-02T15:39:52Z",
          "tree_id": "1a232822eec9e71b44abbd75d262f3bb213a7a84",
          "url": "https://github.com/discordeno/discordeno/commit/7a69c02d13f5824d6747519523d1cacd381311fa"
        },
        "date": 1680450161333,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "[transformer] message cache check RSS",
            "value": 112.53,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Used",
            "value": 117.27,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Total",
            "value": 106.88,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check RSS",
            "value": 79.24,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Used",
            "value": 102.43,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Total",
            "value": 78.83,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 0.74,
            "range": "±2.84%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 10.76,
            "range": "±1.44%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 0,
            "range": "±0%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "rest.simplifyUrl",
            "value": 223799,
            "range": "±0.25%",
            "unit": "ops/sec",
            "extra": "95 samples"
          },
          {
            "name": "Camelize 1 event",
            "value": 6409,
            "range": "±0.40%",
            "unit": "ops/sec",
            "extra": "91 samples"
          },
          {
            "name": "Snakelize 1 event",
            "value": 6480,
            "range": "±0.42%",
            "unit": "ops/sec",
            "extra": "94 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "to@itoh.at",
            "name": "ITOH",
            "username": "itohatweb"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "1cb1b094609ea5b8ff418ee680e664c46de3f885",
          "message": "refactor!(rest): rest proxy attachment sending (#2924)\n\n* refactor!(rest): rest proxy attachment sending\nCurrently attachments get encoded as base64 before being send to the proxy. This is not really necessary, instead we can just send `FormData` to the proxy.\n\n* fix lint",
          "timestamp": "2023-04-02T15:43:08Z",
          "tree_id": "ef76737a8c040079afadc523adcc8bbab70bbcd0",
          "url": "https://github.com/discordeno/discordeno/commit/1cb1b094609ea5b8ff418ee680e664c46de3f885"
        },
        "date": 1680450297666,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "[transformer] message cache check RSS",
            "value": 124.1,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Used",
            "value": 117.61,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Total",
            "value": 107.14,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check RSS",
            "value": 69.18,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Used",
            "value": 102.73,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Total",
            "value": 80.93,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 0.7,
            "range": "±2.84%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 10.65,
            "range": "±1.44%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 0,
            "range": "±0%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "rest.simplifyUrl",
            "value": 224913,
            "range": "±0.22%",
            "unit": "ops/sec",
            "extra": "93 samples"
          },
          {
            "name": "Camelize 1 event",
            "value": 6384,
            "range": "±0.22%",
            "unit": "ops/sec",
            "extra": "96 samples"
          },
          {
            "name": "Snakelize 1 event",
            "value": 6336,
            "range": "±0.25%",
            "unit": "ops/sec",
            "extra": "95 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "to@itoh.at",
            "name": "ITOH",
            "username": "itohatweb"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "66869ce00ba18439307bf638ff8922448c4dc7a9",
          "message": "refactor(utils)!: remove unused files utility (#2945)\n\nSince we have changed how files get send to the rest proxy, we do not need this utility anymore.",
          "timestamp": "2023-04-02T16:21:48Z",
          "tree_id": "1741714c5f9ca212f6a996afafa31a44c975552f",
          "url": "https://github.com/discordeno/discordeno/commit/66869ce00ba18439307bf638ff8922448c4dc7a9"
        },
        "date": 1680452772686,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "[transformer] message cache check RSS",
            "value": 121.13,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Used",
            "value": 116.51,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Total",
            "value": 107.67,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Used",
            "value": 101.05,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Total",
            "value": 79.88,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 0.61,
            "range": "±2.8%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 10.72,
            "range": "±1.45%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 0,
            "range": "±0%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "rest.simplifyUrl",
            "value": 227663,
            "range": "±0.21%",
            "unit": "ops/sec",
            "extra": "93 samples"
          },
          {
            "name": "Camelize 1 event",
            "value": 6596,
            "range": "±0.11%",
            "unit": "ops/sec",
            "extra": "95 samples"
          },
          {
            "name": "Snakelize 1 event",
            "value": 6544,
            "range": "±0.25%",
            "unit": "ops/sec",
            "extra": "95 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "to@itoh.at",
            "name": "ITOH",
            "username": "itohatweb"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "7b5d99e5dd3191fbc1e945702878d3596360c915",
          "message": "refactor(rest): interaction handling (#2944)\n\n* refactor(rest): interaction handling\nCurrently some interaction handling uses `sendRequest` directly.\nThis adds the `runThroughQueue` option, which prevents the request to be handled by a queue effectively giving the same effect as using `sendRequest` directly.\nThis prevents code repetition and supports future endpoints which might not have a rate limit too.\n\nFurther more all interaction related endpoints have now been set to not send the bots authorization header.\n\n* fix invalid file\n\n* fix eslint\n\n* fix: followups have a rate limit\n\n* fix awaiting",
          "timestamp": "2023-04-02T16:27:48Z",
          "tree_id": "e0c09f592d8da1185b4375d961ca249b9f1cef7b",
          "url": "https://github.com/discordeno/discordeno/commit/7b5d99e5dd3191fbc1e945702878d3596360c915"
        },
        "date": 1680453037901,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "[transformer] message cache check RSS",
            "value": 119.24,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Used",
            "value": 118.4,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Total",
            "value": 106.62,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check RSS",
            "value": 83.14,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Used",
            "value": 102.48,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Total",
            "value": 82.5,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 0.61,
            "range": "±2.98%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 10.75,
            "range": "±1.43%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 0,
            "range": "±0%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "rest.simplifyUrl",
            "value": 224137,
            "range": "±0.25%",
            "unit": "ops/sec",
            "extra": "91 samples"
          },
          {
            "name": "Camelize 1 event",
            "value": 6446,
            "range": "±0.25%",
            "unit": "ops/sec",
            "extra": "93 samples"
          },
          {
            "name": "Snakelize 1 event",
            "value": 6415,
            "range": "±0.19%",
            "unit": "ops/sec",
            "extra": "96 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "to@itoh.at",
            "name": "ITOH",
            "username": "itohatweb"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "7c51f731cb3dca369877454aafed60b851db0aef",
          "message": "refactor(rest): improve `unauthorized` readability (#2946)\n\nCurrently we use a double negation in the code which makes it harder to understand what it actually does.\n\nTherefore the check has been changed to be understood easier.",
          "timestamp": "2023-04-02T16:54:36Z",
          "tree_id": "1c8cf5c416ccb0e9f17ad871460781d316461f64",
          "url": "https://github.com/discordeno/discordeno/commit/7c51f731cb3dca369877454aafed60b851db0aef"
        },
        "date": 1680454560477,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "[transformer] message cache check RSS",
            "value": 128.18,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Used",
            "value": 117.38,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Total",
            "value": 107.14,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check RSS",
            "value": 21.82,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Used",
            "value": 101.75,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Total",
            "value": 77,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 0.67,
            "range": "±3.01%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 10.65,
            "range": "±1.44%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 0,
            "range": "±0%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "rest.simplifyUrl",
            "value": 219798,
            "range": "±0.56%",
            "unit": "ops/sec",
            "extra": "89 samples"
          },
          {
            "name": "Camelize 1 event",
            "value": 6395,
            "range": "±0.31%",
            "unit": "ops/sec",
            "extra": "92 samples"
          },
          {
            "name": "Snakelize 1 event",
            "value": 6427,
            "range": "±0.22%",
            "unit": "ops/sec",
            "extra": "94 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "to@itoh.at",
            "name": "ITOH",
            "username": "itohatweb"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "5e1e56146ee75ea04f2c644257f46a2ce04e6f15",
          "message": "fix: eslint no async error (#2947)\n\n* fix: eslint no async error\r\n\r\n* just ignore",
          "timestamp": "2023-04-02T19:47:29+02:00",
          "tree_id": "8ab0bd941b415b32d19be0833a5e58ccd925aa6e",
          "url": "https://github.com/discordeno/discordeno/commit/5e1e56146ee75ea04f2c644257f46a2ce04e6f15"
        },
        "date": 1680457733400,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "[transformer] message cache check RSS",
            "value": 121.62,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Used",
            "value": 118.98,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Total",
            "value": 105.83,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check RSS",
            "value": 77.73,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Used",
            "value": 102.35,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Total",
            "value": 79.09,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 0.67,
            "range": "±3.01%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 10.68,
            "range": "±1.44%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 0,
            "range": "±0%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "rest.simplifyUrl",
            "value": 215432,
            "range": "±0.37%",
            "unit": "ops/sec",
            "extra": "91 samples"
          },
          {
            "name": "Camelize 1 event",
            "value": 6327,
            "range": "±0.24%",
            "unit": "ops/sec",
            "extra": "95 samples"
          },
          {
            "name": "Snakelize 1 event",
            "value": 6321,
            "range": "±0.22%",
            "unit": "ops/sec",
            "extra": "95 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "to@itoh.at",
            "name": "ITOH",
            "username": "itohatweb"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "bb92a78e6ad1649b581a2c7d6d69dcea55625f4a",
          "message": "ci: fix labeler adding style on refactor",
          "timestamp": "2023-04-03T16:43:17+02:00",
          "tree_id": "a1626d10b626e02b30f3fbabf9bc32bb07adbbd2",
          "url": "https://github.com/discordeno/discordeno/commit/bb92a78e6ad1649b581a2c7d6d69dcea55625f4a"
        },
        "date": 1680533063126,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "[transformer] message cache check RSS",
            "value": 120.8,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Used",
            "value": 116.91,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Total",
            "value": 107.41,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check RSS",
            "value": 82.17,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Used",
            "value": 100.43,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Total",
            "value": 82.24,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 0.72,
            "range": "±2.79%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 10.86,
            "range": "±1.43%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 0,
            "range": "±0%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "rest.simplifyUrl",
            "value": 162970,
            "range": "±0.22%",
            "unit": "ops/sec",
            "extra": "95 samples"
          },
          {
            "name": "Camelize 1 event",
            "value": 6659,
            "range": "±0.11%",
            "unit": "ops/sec",
            "extra": "95 samples"
          },
          {
            "name": "Snakelize 1 event",
            "value": 6492,
            "range": "±0.45%",
            "unit": "ops/sec",
            "extra": "96 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "to@itoh.at",
            "name": "ITOH",
            "username": "itohatweb"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "50282f91901344dae5f0b7137887a33cc0bca04e",
          "message": "refactor(rest)!: improve `sendRequest` (#2956)\n\n* refactor(rest)!: refactor `sendRequest`\n - Removed `url` in favour of `route`. This change will effectively remove a bunch of unnecessary checks from dd. Also this changes how rest proxies have to pass the route to the `makeRequest` function. But since it will just require you to pass `req.route + req.query` it is an improvement compared to `rest.baseUrl + req.route + req.query`.\n - Introduced `HttpResponseCodes` an internal enum to remove magic numbers.\n - Improved the rate limted response handling. Made it simpler.\n - Removed unnecessary `JSON.stringify(await result.json())` since `await result.text()` does effectively the same.\n - Changed the anti memor leak `response.json()` to `response.arrayBuffer()` since latter does not do any additional processing.\n\n* .\n\n* forgot to fix that",
          "timestamp": "2023-04-03T15:23:01Z",
          "tree_id": "494f0ea27b184e7dffba3368b8f9036fd0c73eeb",
          "url": "https://github.com/discordeno/discordeno/commit/50282f91901344dae5f0b7137887a33cc0bca04e"
        },
        "date": 1680535532737,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "[transformer] message cache check RSS",
            "value": 122.15,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Used",
            "value": 117.51,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Total",
            "value": 107.41,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check RSS",
            "value": 70.93,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Used",
            "value": 100.5,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Total",
            "value": 77,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 0.67,
            "range": "±2.99%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 10.66,
            "range": "±1.43%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 0,
            "range": "±0%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "rest.simplifyUrl",
            "value": 226019,
            "range": "±0.28%",
            "unit": "ops/sec",
            "extra": "93 samples"
          },
          {
            "name": "Camelize 1 event",
            "value": 6600,
            "range": "±0.19%",
            "unit": "ops/sec",
            "extra": "96 samples"
          },
          {
            "name": "Snakelize 1 event",
            "value": 6491,
            "range": "±0.28%",
            "unit": "ops/sec",
            "extra": "96 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "to@itoh.at",
            "name": "ITOH",
            "username": "itohatweb"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "7f9459b4353a2357b4376b6bd0caf53ec64318c3",
          "message": "feat(rest): add `isProxied` (#2957)\n\nAdds the `isProxied` property to rest.\nThis effectively removes the `startWith('https://discord.com/api')` check.",
          "timestamp": "2023-04-03T15:51:47Z",
          "tree_id": "eff8e9d0cea8e8bc8324589914e231677513ab1d",
          "url": "https://github.com/discordeno/discordeno/commit/7f9459b4353a2357b4376b6bd0caf53ec64318c3"
        },
        "date": 1680537218187,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "[transformer] message cache check RSS",
            "value": 121.49,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Used",
            "value": 117.95,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Total",
            "value": 106.62,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check RSS",
            "value": 80.19,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Used",
            "value": 102.48,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Total",
            "value": 80.67,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 0.61,
            "range": "±2.82%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 10.63,
            "range": "±1.44%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 0,
            "range": "±0%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "rest.simplifyUrl",
            "value": 224597,
            "range": "±0.23%",
            "unit": "ops/sec",
            "extra": "95 samples"
          },
          {
            "name": "Camelize 1 event",
            "value": 6453,
            "range": "±0.35%",
            "unit": "ops/sec",
            "extra": "96 samples"
          },
          {
            "name": "Snakelize 1 event",
            "value": 6516,
            "range": "±0.16%",
            "unit": "ops/sec",
            "extra": "93 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "to@itoh.at",
            "name": "ITOH",
            "username": "itohatweb"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "088fd12513f2d39d5f08acccb31dbba27a3a6955",
          "message": "fix(bot)!: rename `auditLogEntryCreate` to `guildAuditLogEntryCreate` (#2952)\n\n* fix(bot)!: rename `auditLogEntryCreate` to `guildAuditLogEntryCreate`\n\n* need to start small\n\nCo-authored-by: Skillz4Killz <23035000+Skillz4Killz@users.noreply.github.com>\n\n* also remove this\n\n* suggestions\n\n---------\n\nCo-authored-by: Skillz4Killz <23035000+Skillz4Killz@users.noreply.github.com>",
          "timestamp": "2023-04-03T15:52:34Z",
          "tree_id": "a6ea39122813738130984267bbc950055254348b",
          "url": "https://github.com/discordeno/discordeno/commit/088fd12513f2d39d5f08acccb31dbba27a3a6955"
        },
        "date": 1680537259536,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "[transformer] message cache check RSS",
            "value": 115.24,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Used",
            "value": 118.13,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Total",
            "value": 106.36,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check RSS",
            "value": 44.49,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Used",
            "value": 101.58,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Total",
            "value": 83.81,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 0.68,
            "range": "±2.99%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 10.82,
            "range": "±1.43%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 0,
            "range": "±0%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "rest.simplifyUrl",
            "value": 220090,
            "range": "±0.28%",
            "unit": "ops/sec",
            "extra": "92 samples"
          },
          {
            "name": "Camelize 1 event",
            "value": 6308,
            "range": "±0.23%",
            "unit": "ops/sec",
            "extra": "93 samples"
          },
          {
            "name": "Snakelize 1 event",
            "value": 6290,
            "range": "±0.48%",
            "unit": "ops/sec",
            "extra": "92 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "to@itoh.at",
            "name": "ITOH",
            "username": "itohatweb"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "aff0d47acd51c9c5c9f9237b0e5bfc2f606a50b8",
          "message": "blog: why we switched from deno to node.js (#2958)",
          "timestamp": "2023-04-03T17:01:03Z",
          "tree_id": "dde4be4f3cc2f0507a7dd79bb8612539b87828fd",
          "url": "https://github.com/discordeno/discordeno/commit/aff0d47acd51c9c5c9f9237b0e5bfc2f606a50b8"
        },
        "date": 1680541399265,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "[transformer] message cache check RSS",
            "value": 120.84,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Used",
            "value": 118.59,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Total",
            "value": 106.09,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Used",
            "value": 101.57,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Total",
            "value": 79.88,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 0.67,
            "range": "±3.01%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 10.65,
            "range": "±1.44%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 0,
            "range": "±0%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "rest.simplifyUrl",
            "value": 226437,
            "range": "±0.22%",
            "unit": "ops/sec",
            "extra": "95 samples"
          },
          {
            "name": "Camelize 1 event",
            "value": 6624,
            "range": "±0.53%",
            "unit": "ops/sec",
            "extra": "97 samples"
          },
          {
            "name": "Snakelize 1 event",
            "value": 6613,
            "range": "±0.22%",
            "unit": "ops/sec",
            "extra": "94 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "23035000+Skillz4Killz@users.noreply.github.com",
            "name": "Skillz4Killz",
            "username": "Skillz4Killz"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "04d7db89a5eb1aa546b5316f63cd6f1bdceaf903",
          "message": "fix: export transformers na dhandler (#2959)\n\nCo-authored-by: ITOH <to@itoh.at>",
          "timestamp": "2023-04-03T17:28:11Z",
          "tree_id": "bbdccc0b346c12f12cd6325bc47f618a58f904d9",
          "url": "https://github.com/discordeno/discordeno/commit/04d7db89a5eb1aa546b5316f63cd6f1bdceaf903"
        },
        "date": 1680543139244,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "[transformer] message cache check RSS",
            "value": 124.23,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Used",
            "value": 117.8,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Total",
            "value": 104,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check RSS",
            "value": 73.65,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Used",
            "value": 101.73,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Total",
            "value": 78.31,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 0.58,
            "range": "±3.02%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 10.74,
            "range": "±1.44%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 0,
            "range": "±0%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "rest.simplifyUrl",
            "value": 222553,
            "range": "±0.23%",
            "unit": "ops/sec",
            "extra": "96 samples"
          },
          {
            "name": "Camelize 1 event",
            "value": 6419,
            "range": "±0.22%",
            "unit": "ops/sec",
            "extra": "95 samples"
          },
          {
            "name": "Snakelize 1 event",
            "value": 6430,
            "range": "±0.20%",
            "unit": "ops/sec",
            "extra": "96 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "to@itoh.at",
            "name": "ITOH",
            "username": "itohatweb"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "0b026076493328ecda79b47ea116b651fbe9aa52",
          "message": "ci: do not run on website changes (#2964)\n\nAlso removed the sync repo workflow since we do not use the sites repo actively anymore.",
          "timestamp": "2023-04-03T18:05:55Z",
          "tree_id": "cb1f3feee30fb84d6408c09b74d5565f96a1f353",
          "url": "https://github.com/discordeno/discordeno/commit/0b026076493328ecda79b47ea116b651fbe9aa52"
        },
        "date": 1680545276263,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "[transformer] message cache check RSS",
            "value": 109.59,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Used",
            "value": 119.66,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Total",
            "value": 104.52,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check RSS",
            "value": 84.69,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Used",
            "value": 101.94,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Total",
            "value": 83.55,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 0.59,
            "range": "±2.98%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 10.69,
            "range": "±1.45%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 0,
            "range": "±0%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "rest.simplifyUrl",
            "value": 216001,
            "range": "±3.40%",
            "unit": "ops/sec",
            "extra": "92 samples"
          },
          {
            "name": "Camelize 1 event",
            "value": 6612,
            "range": "±0.25%",
            "unit": "ops/sec",
            "extra": "92 samples"
          },
          {
            "name": "Snakelize 1 event",
            "value": 6561,
            "range": "±0.16%",
            "unit": "ops/sec",
            "extra": "93 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "to@itoh.at",
            "name": "ITOH",
            "username": "itohatweb"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "895db84d349b4fa796ae90755bca2f3d472416d6",
          "message": "refactor(rest): add header constants (#2962)\n\n* refactor(rest): add header constants\n\n* spelling error\n\n* export",
          "timestamp": "2023-04-03T19:01:14Z",
          "tree_id": "b418054faed79d969ffdfb10000c1df555c3ce8d",
          "url": "https://github.com/discordeno/discordeno/commit/895db84d349b4fa796ae90755bca2f3d472416d6"
        },
        "date": 1680548595518,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "[transformer] message cache check RSS",
            "value": 125.2,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Used",
            "value": 117.97,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Total",
            "value": 106.88,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check RSS",
            "value": 78.56,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Used",
            "value": 101.7,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Total",
            "value": 78.57,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 0.67,
            "range": "±3.01%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 10.74,
            "range": "±1.45%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 0,
            "range": "±0%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "rest.simplifyUrl",
            "value": 224282,
            "range": "±0.24%",
            "unit": "ops/sec",
            "extra": "96 samples"
          },
          {
            "name": "Camelize 1 event",
            "value": 6466,
            "range": "±1.05%",
            "unit": "ops/sec",
            "extra": "93 samples"
          },
          {
            "name": "Snakelize 1 event",
            "value": 6576,
            "range": "±0.25%",
            "unit": "ops/sec",
            "extra": "94 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "to@itoh.at",
            "name": "ITOH",
            "username": "itohatweb"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "e3549a8675d62667b21012cbc1f69a397cd4b5ac",
          "message": "fix(rest):  does not need to set the absolute url (#2966)",
          "timestamp": "2023-04-03T20:00:30Z",
          "tree_id": "3a9d01451c2883e6e4ffdbe18d56ea9a2f87dcf0",
          "url": "https://github.com/discordeno/discordeno/commit/e3549a8675d62667b21012cbc1f69a397cd4b5ac"
        },
        "date": 1680552168873,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "[transformer] message cache check RSS",
            "value": 117.09,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Used",
            "value": 117.28,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] message cache check Heap Total",
            "value": 104.26,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check RSS",
            "value": 7.59,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Used",
            "value": 102.9,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[transformer] old message cache check Heap Total",
            "value": 80.4,
            "range": "±1%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 0.62,
            "range": "±2.84%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 10.76,
            "range": "±1.45%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 0,
            "range": "±0%",
            "unit": "MB",
            "extra": "3 samples"
          },
          {
            "name": "rest.simplifyUrl",
            "value": 221516,
            "range": "±0.29%",
            "unit": "ops/sec",
            "extra": "92 samples"
          },
          {
            "name": "Camelize 1 event",
            "value": 6215,
            "range": "±0.34%",
            "unit": "ops/sec",
            "extra": "95 samples"
          },
          {
            "name": "Snakelize 1 event",
            "value": 6235,
            "range": "±0.27%",
            "unit": "ops/sec",
            "extra": "94 samples"
          }
        ]
      }
    ]
  }
}