window.BENCHMARK_DATA = {
  "lastUpdate": 1667071400454,
  "repoUrl": "https://github.com/discordeno/discordeno",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "48591478+H01001000@users.noreply.github.com",
            "name": "Jonathan Ho",
            "username": "H01001000"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "7a1a41fac854d141d2375018c44acb8cc2bf1cc9",
          "message": "CI: Run benchmark  (#2563)\n\n* fix(bench): try to fix benchmark\r\n\r\n* style: deno fmt\r\n\r\n* fix: remove check formating\r\n\r\n* fix: add fake token\r\n\r\n* fix: tranform\r\n\r\n* deno fmt\r\n\r\n* add parseFloat\r\n\r\n* fix unit\r\n\r\n* refactor: change fetch target to benchrepo\r\n\r\n* fix: oldBot\r\n\r\n* refactor: use custom input\r\n\r\n* ci: add tee\r\n\r\n* style: deno fmt\r\n\r\n* ci: cache deps\r\n\r\n* chore: remove\r\n\r\n* ci: add memory benchmark\r\n\r\n* fix: fix url for main repo\r\n\r\n* deno fmt\r\n\r\n* ci: add comment-always\r\n\r\n* fix: link\r\n\r\n* just trying trigger\r\n\r\n* ci: only push on main\r\n\r\n* fix: type\r\n\r\n* fix: range\r\n\r\n* fixed\r\n\r\n* style: deno fmt\r\n\r\n* fix: path\r\n\r\n* Add upload output\r\n\r\n* style: deno fmt\r\n\r\n* ci: add create branch on pr owner's repo\r\n\r\n* fix: github.repository\r\n\r\n* ci: fix remove id benchmark-action\r\n\r\n* fix\r\n\r\n* fix: type\r\n\r\n* reverse change\r\n\r\n* ci: add cache\r\n\r\n* feat: add using cache\r\n\r\n* bench: update name and ignore previous when ci\r\n\r\n* style: name\r\n\r\n* feat: fix pr message style\r\n\r\n* add more benchmark\r\n\r\n* deno fmt\r\n\r\n* fix\r\n\r\n* fix: wording\r\n\r\n* chore: only run on success\r\n\r\n* fix: used last head as current commit",
          "timestamp": "2022-10-29T14:22:23-05:00",
          "tree_id": "3bde0cf961a4c8f8fabc377c1a867e58231d2a7c",
          "url": "https://github.com/discordeno/discordeno/commit/7a1a41fac854d141d2375018c44acb8cc2bf1cc9"
        },
        "date": 1667071398642,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "[Guild.toggles.features] Get the features of a guild",
            "value": 1430,
            "unit": "ns/iter",
            "range": "1230 … 1460"
          },
          {
            "name": "[Transformer] Discord User to a User",
            "value": 142,
            "unit": "ns/iter",
            "range": "138.48 … 200.42"
          },
          {
            "name": "[Transformer] User to a Discord User",
            "value": 132,
            "unit": "ns/iter",
            "range": "128.46 … 141.39"
          },
          {
            "name": "[Transformer] Discord Rules to a Rules",
            "value": 470,
            "unit": "ns/iter",
            "range": "463.38 … 728.33"
          },
          {
            "name": "[Transformer] Discord Announcement Channel to a Announcement Channel",
            "value": 1300,
            "unit": "ns/iter",
            "range": "1290 … 1310"
          },
          {
            "name": "[Transformer] Discord Moderator Channel to a Moderator Channel",
            "value": 617,
            "unit": "ns/iter",
            "range": "608.79 … 662.78"
          },
          {
            "name": "[Transformer] Discord Text Channel to a Text Channel",
            "value": 463,
            "unit": "ns/iter",
            "range": "458.11 … 481.44"
          },
          {
            "name": "[Transformer] Discord Stage Channel to a Stage Channel",
            "value": 489,
            "unit": "ns/iter",
            "range": "484.57 … 503.27"
          },
          {
            "name": "[Transformer] Discord Voice Channel to a Voice Channel",
            "value": 502,
            "unit": "ns/iter",
            "range": "496.39 … 569.93"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 275.04,
            "unit": "MB",
            "range": "271.32 … 276.93"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 257.51,
            "unit": "MB",
            "range": "255.5 … 260.19"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 275.48,
            "unit": "MB",
            "range": "271.31 … 278.75"
          }
        ]
      }
    ]
  }
}