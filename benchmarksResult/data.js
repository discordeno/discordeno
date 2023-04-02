window.BENCHMARK_DATA = {
  "lastUpdate": 1680402443216,
  "repoUrl": "https://github.com/discordeno/discordeno",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "62352949+6km@users.noreply.github.com",
            "name": "Mohammed Taha",
            "username": "6km"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "1a717ddc7d97e31d3775747df9df153729d2925d",
          "message": "[📜 Docs] Fix grammar issues (#2779)\n\n* Update getting-started.md\r\n\r\n* Update frequently-asked-questions.md\r\n\r\n* Update getting-started.md",
          "timestamp": "2023-02-13T12:22:05-06:00",
          "tree_id": "037e5cc7815b967d7c0057bec6becabc648678cd",
          "url": "https://github.com/discordeno/discordeno/commit/1a717ddc7d97e31d3775747df9df153729d2925d"
        },
        "date": 1676312605677,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "[Cache Plugin] RSS",
            "value": 284.2,
            "unit": "MB",
            "range": "280.36 … 288.51"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 268.13,
            "unit": "MB",
            "range": "266.4 … 270.12"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 277.12,
            "unit": "MB",
            "range": "275.51 … 277.98"
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
      }
    ]
  }
}