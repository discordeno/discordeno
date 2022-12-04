window.BENCHMARK_DATA = {
  "lastUpdate": 1670164678838,
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
      },
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
          "id": "fd82b12c170eda28f129cdc87cbbb095d521d28e",
          "message": "Fix Ci (#2565)\n\n* fix: Validate not running cron\r\n\r\n* fix: always upload artifact\r\n\r\n* fix: generate fail on first comment",
          "timestamp": "2022-10-29T14:45:58-05:00",
          "tree_id": "ee5b8f3560a733536c86e420437e2d81be17405c",
          "url": "https://github.com/discordeno/discordeno/commit/fd82b12c170eda28f129cdc87cbbb095d521d28e"
        },
        "date": 1667072813856,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "[Guild.toggles.features] Get the features of a guild",
            "value": 1820,
            "unit": "ns/iter",
            "range": "1770 … 1920"
          },
          {
            "name": "[Transformer] Discord User to a User",
            "value": 128,
            "unit": "ns/iter",
            "range": "115.81 … 160.52"
          },
          {
            "name": "[Transformer] User to a Discord User",
            "value": 124,
            "unit": "ns/iter",
            "range": "112.77 … 140.17"
          },
          {
            "name": "[Transformer] Discord Rules to a Rules",
            "value": 409,
            "unit": "ns/iter",
            "range": "387.66 … 626.77"
          },
          {
            "name": "[Transformer] Discord Announcement Channel to a Announcement Channel",
            "value": 1140,
            "unit": "ns/iter",
            "range": "1110 … 1160"
          },
          {
            "name": "[Transformer] Discord Moderator Channel to a Moderator Channel",
            "value": 545,
            "unit": "ns/iter",
            "range": "525.85 … 558.21"
          },
          {
            "name": "[Transformer] Discord Text Channel to a Text Channel",
            "value": 419,
            "unit": "ns/iter",
            "range": "408.69 … 426.17"
          },
          {
            "name": "[Transformer] Discord Stage Channel to a Stage Channel",
            "value": 432,
            "unit": "ns/iter",
            "range": "417.24 … 446.19"
          },
          {
            "name": "[Transformer] Discord Voice Channel to a Voice Channel",
            "value": 442,
            "unit": "ns/iter",
            "range": "429.3 … 449.9"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 276.23,
            "unit": "MB",
            "range": "273.3 … 278.26"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 257.26,
            "unit": "MB",
            "range": "255.23 … 258.93"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 274.89,
            "unit": "MB",
            "range": "271.27 … 276.76"
          }
        ]
      },
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
          "id": "8e8f2218611c249d902036b184a170981e8cf7c7",
          "message": "Fix: commit not showing (#2566)\n\n* testing\r\n\r\n* remove test\r\n\r\n* fix\r\n\r\n* fix typo\r\n\r\n* chore: remove path from flag",
          "timestamp": "2022-10-31T09:35:57-05:00",
          "tree_id": "5d65fe3dfd0d416fb9191eaff307e2a68225598b",
          "url": "https://github.com/discordeno/discordeno/commit/8e8f2218611c249d902036b184a170981e8cf7c7"
        },
        "date": 1667227025689,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "[Guild.toggles.features] Get the features of a guild",
            "value": 2210,
            "unit": "ns/iter",
            "range": "2040 … 2990"
          },
          {
            "name": "[Transformer] Discord User to a User",
            "value": 147,
            "unit": "ns/iter",
            "range": "141.48 … 636.06"
          },
          {
            "name": "[Transformer] User to a Discord User",
            "value": 143,
            "unit": "ns/iter",
            "range": "139.63 … 159.81"
          },
          {
            "name": "[Transformer] Discord Rules to a Rules",
            "value": 465,
            "unit": "ns/iter",
            "range": "458.55 … 699.24"
          },
          {
            "name": "[Transformer] Discord Announcement Channel to a Announcement Channel",
            "value": 1280,
            "unit": "ns/iter",
            "range": "1280 … 1310"
          },
          {
            "name": "[Transformer] Discord Moderator Channel to a Moderator Channel",
            "value": 623,
            "unit": "ns/iter",
            "range": "615.99 … 672.73"
          },
          {
            "name": "[Transformer] Discord Text Channel to a Text Channel",
            "value": 473,
            "unit": "ns/iter",
            "range": "469.07 … 481.27"
          },
          {
            "name": "[Transformer] Discord Stage Channel to a Stage Channel",
            "value": 491,
            "unit": "ns/iter",
            "range": "486.16 … 516.75"
          },
          {
            "name": "[Transformer] Discord Voice Channel to a Voice Channel",
            "value": 501,
            "unit": "ns/iter",
            "range": "495.27 … 578.71"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 273.79,
            "unit": "MB",
            "range": "271.77 … 276.25"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 260.79,
            "unit": "MB",
            "range": "260.49 … 261.25"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 274.2,
            "unit": "MB",
            "range": "272.77 … 275.12"
          }
        ]
      },
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
          "id": "d62e4422244af945a164c971c754626d6c098828",
          "message": "enable inlay (#2568)\n\n* enable inlay\r\n\r\n* sneak in\r\n\r\n* feat: add lock file",
          "timestamp": "2022-11-01T14:29:46-05:00",
          "tree_id": "7f3d827d202faf3ece2993c2cd708a61ece7a16c",
          "url": "https://github.com/discordeno/discordeno/commit/d62e4422244af945a164c971c754626d6c098828"
        },
        "date": 1667331072223,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "[Guild.toggles.features] Get the features of a guild",
            "value": 1350,
            "unit": "ns/iter",
            "range": "1240 … 1610"
          },
          {
            "name": "[Transformer] Discord User to a User",
            "value": 165,
            "unit": "ns/iter",
            "range": "148.23 … 236.56"
          },
          {
            "name": "[Transformer] User to a Discord User",
            "value": 153,
            "unit": "ns/iter",
            "range": "134.52 … 726.5"
          },
          {
            "name": "[Transformer] Discord Rules to a Rules",
            "value": 816,
            "unit": "ns/iter",
            "range": "500 … 9870000"
          },
          {
            "name": "[Transformer] Discord Announcement Channel to a Announcement Channel",
            "value": 1920,
            "unit": "ns/iter",
            "range": "1400 … 8050000"
          },
          {
            "name": "[Transformer] Discord Moderator Channel to a Moderator Channel",
            "value": 748,
            "unit": "ns/iter",
            "range": "655.16 … 1630"
          },
          {
            "name": "[Transformer] Discord Text Channel to a Text Channel",
            "value": 583,
            "unit": "ns/iter",
            "range": "498.61 … 926.05"
          },
          {
            "name": "[Transformer] Discord Stage Channel to a Stage Channel",
            "value": 622,
            "unit": "ns/iter",
            "range": "533.74 … 1080"
          },
          {
            "name": "[Transformer] Discord Voice Channel to a Voice Channel",
            "value": 600,
            "unit": "ns/iter",
            "range": "528.6 … 953.16"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 274.98,
            "unit": "MB",
            "range": "271.83 … 278.26"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 257.6,
            "unit": "MB",
            "range": "255.51 … 259.43"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 274.99,
            "unit": "MB",
            "range": "271.57 … 276.76"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "kiran121102@gmail.com",
            "name": "Awesome Stickz",
            "username": "AwesomeStickz"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "788bd852184b91e3e7b0cf0f7b0468dd1d2c41c7",
          "message": "fix: add members collection to guild in guild transformer if available (#2569)",
          "timestamp": "2022-11-01T14:56:38-05:00",
          "tree_id": "35eb665d9cb6b3b9e6c865af21e2fe324aba9904",
          "url": "https://github.com/discordeno/discordeno/commit/788bd852184b91e3e7b0cf0f7b0468dd1d2c41c7"
        },
        "date": 1667332670234,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "[Guild.toggles.features] Get the features of a guild",
            "value": 2470,
            "unit": "ns/iter",
            "range": "2280 … 3470"
          },
          {
            "name": "[Transformer] Discord User to a User",
            "value": 166,
            "unit": "ns/iter",
            "range": "117.58 … 579.39"
          },
          {
            "name": "[Transformer] User to a Discord User",
            "value": 169,
            "unit": "ns/iter",
            "range": "122.65 … 1030"
          },
          {
            "name": "[Transformer] Discord Rules to a Rules",
            "value": 521,
            "unit": "ns/iter",
            "range": "430.93 … 1010"
          },
          {
            "name": "[Transformer] Discord Announcement Channel to a Announcement Channel",
            "value": 1420,
            "unit": "ns/iter",
            "range": "1340 … 1690"
          },
          {
            "name": "[Transformer] Discord Moderator Channel to a Moderator Channel",
            "value": 710,
            "unit": "ns/iter",
            "range": "584.72 … 1030"
          },
          {
            "name": "[Transformer] Discord Text Channel to a Text Channel",
            "value": 536,
            "unit": "ns/iter",
            "range": "438.72 … 590.63"
          },
          {
            "name": "[Transformer] Discord Stage Channel to a Stage Channel",
            "value": 509,
            "unit": "ns/iter",
            "range": "405.99 … 836.48"
          },
          {
            "name": "[Transformer] Discord Voice Channel to a Voice Channel",
            "value": 522,
            "unit": "ns/iter",
            "range": "414.18 … 696.77"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 279.25,
            "unit": "MB",
            "range": "277.67 … 281.6"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 262.7,
            "unit": "MB",
            "range": "256.91 … 268.66"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 278.82,
            "unit": "MB",
            "range": "275.96 … 280.32"
          }
        ]
      },
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
          "id": "dc186589cb86ae140b76d43c01d78044e74f9bc5",
          "message": "feat: add benchmark to site (#2567)\n\n* feat: add benchmark to site\r\n\r\n* test\r\n\r\n* remove test file",
          "timestamp": "2022-11-02T10:13:11-05:00",
          "tree_id": "2851c9c90f62277135827983418879cd3384724f",
          "url": "https://github.com/discordeno/discordeno/commit/dc186589cb86ae140b76d43c01d78044e74f9bc5"
        },
        "date": 1667402074866,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "[Guild.toggles.features] Get the features of a guild",
            "value": 1450,
            "unit": "ns/iter",
            "range": "1360 … 1900"
          },
          {
            "name": "[Transformer] Discord User to a User",
            "value": 187,
            "unit": "ns/iter",
            "range": "172.55 … 461.38"
          },
          {
            "name": "[Transformer] User to a Discord User",
            "value": 168,
            "unit": "ns/iter",
            "range": "156.41 … 508.56"
          },
          {
            "name": "[Transformer] Discord Rules to a Rules",
            "value": 660,
            "unit": "ns/iter",
            "range": "559.97 … 1670"
          },
          {
            "name": "[Transformer] Discord Announcement Channel to a Announcement Channel",
            "value": 1620,
            "unit": "ns/iter",
            "range": "1550 … 1800"
          },
          {
            "name": "[Transformer] Discord Moderator Channel to a Moderator Channel",
            "value": 833,
            "unit": "ns/iter",
            "range": "770.48 … 1340"
          },
          {
            "name": "[Transformer] Discord Text Channel to a Text Channel",
            "value": 620,
            "unit": "ns/iter",
            "range": "579.41 … 815.38"
          },
          {
            "name": "[Transformer] Discord Stage Channel to a Stage Channel",
            "value": 634,
            "unit": "ns/iter",
            "range": "594.96 … 1530"
          },
          {
            "name": "[Transformer] Discord Voice Channel to a Voice Channel",
            "value": 642,
            "unit": "ns/iter",
            "range": "604.46 … 811.34"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 279.16,
            "unit": "MB",
            "range": "277.94 … 280.59"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 263.81,
            "unit": "MB",
            "range": "259.9 … 266.9"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 277.77,
            "unit": "MB",
            "range": "275.98 … 279.11"
          }
        ]
      },
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
          "id": "a385176d8a15c4be7f113d819cb558ecdbe9bf6d",
          "message": "bench: add cpu correction (#2572)\n\n* feat: add cpu correction\r\n\r\n* feat: add more bench\r\n\r\n* fix: cpu correction\r\n\r\n* chore: add comment\r\n\r\n* fix: add unstable to tranform\r\n\r\n* fix: comment message\r\n\r\n* deno fmt",
          "timestamp": "2022-11-05T11:17:43-05:00",
          "tree_id": "567351b2a42bb4c5c98f795ac6575c556fb16630",
          "url": "https://github.com/discordeno/discordeno/commit/a385176d8a15c4be7f113d819cb558ecdbe9bf6d"
        },
        "date": 1667665159541,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "[Transformer] Discord Guild to a Guild",
            "value": 3870,
            "unit": "ns/iter",
            "range": "2908.51 … 4020315.55"
          },
          {
            "name": "[Guild.toggles.features] Get the features of a guild",
            "value": 591,
            "unit": "ns/iter",
            "range": "506.64 … 1205.63"
          },
          {
            "name": "[Transformer] Discord User to a User",
            "value": 80,
            "unit": "ns/iter",
            "range": "59.6 … 595.78"
          },
          {
            "name": "[Transformer] User to a Discord User",
            "value": 73,
            "unit": "ns/iter",
            "range": "54.27 … 400.94"
          },
          {
            "name": "[Transformer] Discord Rules Channel to a Rules Channel",
            "value": 231,
            "unit": "ns/iter",
            "range": "192.71 … 272.15"
          },
          {
            "name": "[Transformer] Discord Announcement Channel to a Announcement Channel",
            "value": 802,
            "unit": "ns/iter",
            "range": "609.85 … 4231417.3"
          },
          {
            "name": "[Transformer] Discord Moderator Channel to a Moderator Channel",
            "value": 340,
            "unit": "ns/iter",
            "range": "269.38 … 1304.14"
          },
          {
            "name": "[Transformer] Discord Text Channel to a Text Channel",
            "value": 304,
            "unit": "ns/iter",
            "range": "259.21 … 386.75"
          },
          {
            "name": "[Transformer] Discord Stage Channel to a Stage Channel",
            "value": 275,
            "unit": "ns/iter",
            "range": "215.42 … 440.55"
          },
          {
            "name": "[Transformer] Discord Voice Channel to a Voice Channel",
            "value": 244,
            "unit": "ns/iter",
            "range": "215.77 … 318.69"
          },
          {
            "name": "[Transformer] Discord Member to a Member",
            "value": 395,
            "unit": "ns/iter",
            "range": "349.29 … 497.26"
          },
          {
            "name": "[Transformer] Member to a Discord Member",
            "value": 591,
            "unit": "ns/iter",
            "range": "530.1 … 680.22"
          },
          {
            "name": "[Transformer] Discord Role to a Role",
            "value": 149,
            "unit": "ns/iter",
            "range": "121.44 … 185.57"
          },
          {
            "name": "[Transformer] Discord Message to a Message",
            "value": 554,
            "unit": "ns/iter",
            "range": "441.06 … 1158.71"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 281.57,
            "unit": "MB",
            "range": "278.93 … 284.18"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 264.98,
            "unit": "MB",
            "range": "257.8 … 270.64"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 280.23,
            "unit": "MB",
            "range": "277.74 … 282.79"
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
          "id": "76ea7d9a67a1a9e84d67c6f3008acdf8d2d0d494",
          "message": "Bucking Rest (#2588)\n\n* Pending changes exported from your codespace\r\n\r\n* fix: more testing needed\r\n\r\n* fix: try fix\r\n\r\n* fix: global shared scope erro\r\n\r\n* fix: cleanup console logs",
          "timestamp": "2022-11-14T12:17:29-06:00",
          "tree_id": "9d56e8c1021f2343a2ac44075290b80262e3382f",
          "url": "https://github.com/discordeno/discordeno/commit/76ea7d9a67a1a9e84d67c6f3008acdf8d2d0d494"
        },
        "date": 1668449928787,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "[Transformer] Discord Guild to a Guild",
            "value": 9335,
            "unit": "ns/iter",
            "range": "8121.69 … 5927779.3"
          },
          {
            "name": "[Guild.toggles.features] Get the features of a guild",
            "value": 1329,
            "unit": "ns/iter",
            "range": "1286.81 … 1740.36"
          },
          {
            "name": "[Transformer] Discord User to a User",
            "value": 172,
            "unit": "ns/iter",
            "range": "168.72 … 205.11"
          },
          {
            "name": "[Transformer] User to a Discord User",
            "value": 150,
            "unit": "ns/iter",
            "range": "142.06 … 554.84"
          },
          {
            "name": "[Transformer] Discord Rules Channel to a Rules Channel",
            "value": 476,
            "unit": "ns/iter",
            "range": "466.36 … 492.6"
          },
          {
            "name": "[Transformer] Discord Announcement Channel to a Announcement Channel",
            "value": 1371,
            "unit": "ns/iter",
            "range": "1360.65 … 1402.84"
          },
          {
            "name": "[Transformer] Discord Moderator Channel to a Moderator Channel",
            "value": 642,
            "unit": "ns/iter",
            "range": "632.82 … 660.95"
          },
          {
            "name": "[Transformer] Discord Text Channel to a Text Channel",
            "value": 609,
            "unit": "ns/iter",
            "range": "595.16 … 1181.34"
          },
          {
            "name": "[Transformer] Discord Stage Channel to a Stage Channel",
            "value": 497,
            "unit": "ns/iter",
            "range": "487.12 … 512.53"
          },
          {
            "name": "[Transformer] Discord Voice Channel to a Voice Channel",
            "value": 500,
            "unit": "ns/iter",
            "range": "492.23 … 512.04"
          },
          {
            "name": "[Transformer] Discord Member to a Member",
            "value": 981,
            "unit": "ns/iter",
            "range": "975.64 … 1065.31"
          },
          {
            "name": "[Transformer] Member to a Discord Member",
            "value": 1160,
            "unit": "ns/iter",
            "range": "1149.69 … 1191.88"
          },
          {
            "name": "[Transformer] Discord Role to a Role",
            "value": 316,
            "unit": "ns/iter",
            "range": "310.75 … 330.58"
          },
          {
            "name": "[Transformer] Discord Message to a Message",
            "value": 1086,
            "unit": "ns/iter",
            "range": "1036.99 … 2563.08"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 279.59,
            "unit": "MB",
            "range": "278.32 … 281.16"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 265.81,
            "unit": "MB",
            "range": "261.94 … 271.97"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 279.74,
            "unit": "MB",
            "range": "277.59 … 281.15"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "63b88ee9492ae595a1c6b59d9be1fbed13f405de",
          "message": "chore(deps): bump loader-utils from 1.4.0 to 1.4.1 in /site (#2577)\n\nBumps [loader-utils](https://github.com/webpack/loader-utils) from 1.4.0 to 1.4.1.\r\n- [Release notes](https://github.com/webpack/loader-utils/releases)\r\n- [Changelog](https://github.com/webpack/loader-utils/blob/v1.4.1/CHANGELOG.md)\r\n- [Commits](https://github.com/webpack/loader-utils/compare/v1.4.0...v1.4.1)\r\n\r\n---\r\nupdated-dependencies:\r\n- dependency-name: loader-utils\r\n  dependency-type: indirect\r\n...\r\n\r\nSigned-off-by: dependabot[bot] <support@github.com>\r\n\r\nSigned-off-by: dependabot[bot] <support@github.com>\r\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2022-11-14T12:17:51-06:00",
          "tree_id": "58a87fb2c28d1e87d92c9123b0e434513c9047b2",
          "url": "https://github.com/discordeno/discordeno/commit/63b88ee9492ae595a1c6b59d9be1fbed13f405de"
        },
        "date": 1668449948643,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "[Transformer] Discord Guild to a Guild",
            "value": 10414,
            "unit": "ns/iter",
            "range": "8026.85 … 12769034.85"
          },
          {
            "name": "[Guild.toggles.features] Get the features of a guild",
            "value": 1310,
            "unit": "ns/iter",
            "range": "1277.96 … 1468.07"
          },
          {
            "name": "[Transformer] Discord User to a User",
            "value": 171,
            "unit": "ns/iter",
            "range": "167.18 … 200.92"
          },
          {
            "name": "[Transformer] User to a Discord User",
            "value": 147,
            "unit": "ns/iter",
            "range": "139.6 … 570.39"
          },
          {
            "name": "[Transformer] Discord Rules Channel to a Rules Channel",
            "value": 458,
            "unit": "ns/iter",
            "range": "450.91 … 473.71"
          },
          {
            "name": "[Transformer] Discord Announcement Channel to a Announcement Channel",
            "value": 1341,
            "unit": "ns/iter",
            "range": "1341.33 … 1362.45"
          },
          {
            "name": "[Transformer] Discord Moderator Channel to a Moderator Channel",
            "value": 623,
            "unit": "ns/iter",
            "range": "614.41 … 638.1"
          },
          {
            "name": "[Transformer] Discord Text Channel to a Text Channel",
            "value": 612,
            "unit": "ns/iter",
            "range": "601.48 … 624.94"
          },
          {
            "name": "[Transformer] Discord Stage Channel to a Stage Channel",
            "value": 495,
            "unit": "ns/iter",
            "range": "486.77 … 511.34"
          },
          {
            "name": "[Transformer] Discord Voice Channel to a Voice Channel",
            "value": 503,
            "unit": "ns/iter",
            "range": "495.51 … 540.57"
          },
          {
            "name": "[Transformer] Discord Member to a Member",
            "value": 837,
            "unit": "ns/iter",
            "range": "827.27 … 1012.67"
          },
          {
            "name": "[Transformer] Member to a Discord Member",
            "value": 1162,
            "unit": "ns/iter",
            "range": "1151.22 … 1225.15"
          },
          {
            "name": "[Transformer] Discord Role to a Role",
            "value": 318,
            "unit": "ns/iter",
            "range": "312.99 … 334.7"
          },
          {
            "name": "[Transformer] Discord Message to a Message",
            "value": 1088,
            "unit": "ns/iter",
            "range": "1040.59 … 2735.47"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 278.35,
            "unit": "MB",
            "range": "277.18 … 279.34"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 263.2,
            "unit": "MB",
            "range": "260.65 … 264.67"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 277.98,
            "unit": "MB",
            "range": "277.32 … 278.75"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "RanAwaySuccessfully@users.noreply.github.com",
            "name": "RanAS",
            "username": "RanAwaySuccessfully"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "58ac893c3a5b96464f3f6be0f8fc45273b106812",
          "message": "calculateBasePermissions may not correctly retrieve cached members (#2580)\n\n* fix: this might be an oversight\r\n\r\n* Update plugins/permissions/src/permissions.ts\r\n\r\n* Update plugins/permissions/src/permissions.ts\r\n\r\nCo-authored-by: Skillz4Killz <23035000+Skillz4Killz@users.noreply.github.com>",
          "timestamp": "2022-11-14T12:26:30-06:00",
          "tree_id": "988b0800f6a06a124ec679ac3f5fe3e98024e3d4",
          "url": "https://github.com/discordeno/discordeno/commit/58ac893c3a5b96464f3f6be0f8fc45273b106812"
        },
        "date": 1668450469507,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "[Transformer] Discord Guild to a Guild",
            "value": 4307,
            "unit": "ns/iter",
            "range": "3897.35 … 2920543.2"
          },
          {
            "name": "[Guild.toggles.features] Get the features of a guild",
            "value": 1026,
            "unit": "ns/iter",
            "range": "1006.4 … 1110"
          },
          {
            "name": "[Transformer] Discord User to a User",
            "value": 86,
            "unit": "ns/iter",
            "range": "84.56 … 94.72"
          },
          {
            "name": "[Transformer] User to a Discord User",
            "value": 72,
            "unit": "ns/iter",
            "range": "69.88 … 273.78"
          },
          {
            "name": "[Transformer] Discord Rules Channel to a Rules Channel",
            "value": 230,
            "unit": "ns/iter",
            "range": "225.25 … 245.84"
          },
          {
            "name": "[Transformer] Discord Announcement Channel to a Announcement Channel",
            "value": 651,
            "unit": "ns/iter",
            "range": "636.4 … 888"
          },
          {
            "name": "[Transformer] Discord Moderator Channel to a Moderator Channel",
            "value": 308,
            "unit": "ns/iter",
            "range": "301.61 … 312.2"
          },
          {
            "name": "[Transformer] Discord Text Channel to a Text Channel",
            "value": 308,
            "unit": "ns/iter",
            "range": "301.52 … 312.67"
          },
          {
            "name": "[Transformer] Discord Stage Channel to a Stage Channel",
            "value": 245,
            "unit": "ns/iter",
            "range": "239.25 … 263.18"
          },
          {
            "name": "[Transformer] Discord Voice Channel to a Voice Channel",
            "value": 248,
            "unit": "ns/iter",
            "range": "242.93 … 280.01"
          },
          {
            "name": "[Transformer] Discord Member to a Member",
            "value": 448,
            "unit": "ns/iter",
            "range": "444.55 … 498.27"
          },
          {
            "name": "[Transformer] Member to a Discord Member",
            "value": 562,
            "unit": "ns/iter",
            "range": "557.47 … 587.07"
          },
          {
            "name": "[Transformer] Discord Role to a Role",
            "value": 155,
            "unit": "ns/iter",
            "range": "152.98 … 164.41"
          },
          {
            "name": "[Transformer] Discord Message to a Message",
            "value": 513,
            "unit": "ns/iter",
            "range": "486.49 … 1213.6"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 279.33,
            "unit": "MB",
            "range": "276.04 … 281.42"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 265.64,
            "unit": "MB",
            "range": "261.34 … 271.73"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 280.16,
            "unit": "MB",
            "range": "277.59 … 282.16"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "lts20050703@gmail.com",
            "name": "LTS20050703",
            "username": "lts20050703"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "84cd7165e23338d1f5d8ac5d29bd6256d400eaa0",
          "message": "types: add SortOrderTypes and default_sort_order to DiscordChannel, helpers: add defaultSortOrder to createChannel and editChannel options (#2582)\n\n* types: add SortOrderTypes and default_sort_order to DiscordChannel\r\nhelpers: add defaultSortOrder to createChannel and editChannel options\r\n\r\n* Update types/discord.ts\r\n\r\nCo-authored-by: Skillz4Killz <23035000+Skillz4Killz@users.noreply.github.com>",
          "timestamp": "2022-11-14T12:31:45-06:00",
          "tree_id": "4ea47793fcac13eed5ab769c1213b8640630ac0d",
          "url": "https://github.com/discordeno/discordeno/commit/84cd7165e23338d1f5d8ac5d29bd6256d400eaa0"
        },
        "date": 1668450778397,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "[Cache Plugin] RSS",
            "value": 280.56,
            "unit": "MB",
            "range": "277.05 … 282.96"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 261.77,
            "unit": "MB",
            "range": "260.92 … 263.36"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 281.33,
            "unit": "MB",
            "range": "281 … 281.78"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "lts20050703@gmail.com",
            "name": "LTS20050703",
            "username": "lts20050703"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "23897b7fcbdef2c67adaac79d6d7cf336e8f70f8",
          "message": "helpers: Add missing properties for create guild channel (#2581)\n\n* helpers: Add missing properties for create guild channel\r\n\r\n* Update helpers/channels/createChannel.ts\r\n\r\n* Update helpers/channels/createChannel.ts\r\n\r\n* Update helpers/channels/createChannel.ts\r\n\r\nCo-authored-by: Skillz4Killz <23035000+Skillz4Killz@users.noreply.github.com>",
          "timestamp": "2022-11-14T12:32:41-06:00",
          "tree_id": "7a43b418070815b0eb228b65e57d027c0b18665a",
          "url": "https://github.com/discordeno/discordeno/commit/23897b7fcbdef2c67adaac79d6d7cf336e8f70f8"
        },
        "date": 1668450828738,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "[Cache Plugin] RSS",
            "value": 279.09,
            "unit": "MB",
            "range": "276.3 … 281.67"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 265.69,
            "unit": "MB",
            "range": "261.74 … 271.81"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 279.92,
            "unit": "MB",
            "range": "277.86 … 281.15"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "lts20050703@gmail.com",
            "name": "LTS20050703",
            "username": "lts20050703"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "cd5915c8b664bed1a7b5166745a034a74c42e7f6",
          "message": "add new select menu components (#2583)\n\n* add new select menu components\r\n\r\n* fix: check for component type",
          "timestamp": "2022-11-14T12:34:41-06:00",
          "tree_id": "8c7b8e6af6a565944cf259687b3daf2481410ecd",
          "url": "https://github.com/discordeno/discordeno/commit/cd5915c8b664bed1a7b5166745a034a74c42e7f6"
        },
        "date": 1668450948708,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "[Cache Plugin] RSS",
            "value": 278.87,
            "unit": "MB",
            "range": "276.05 … 281.16"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 265.51,
            "unit": "MB",
            "range": "262.05 … 271.35"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 279.69,
            "unit": "MB",
            "range": "277.59 … 281"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "lts20050703@gmail.com",
            "name": "LTS20050703",
            "username": "lts20050703"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "e995a651ce1efdfbf125b198bc8f0d064df26db7",
          "message": "role name must be less than 100 characters (#2584)",
          "timestamp": "2022-11-14T12:35:02-06:00",
          "tree_id": "f054d558aa8bc8c92704a25e69afd1d479dd2238",
          "url": "https://github.com/discordeno/discordeno/commit/e995a651ce1efdfbf125b198bc8f0d064df26db7"
        },
        "date": 1668450995557,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "[Cache Plugin] RSS",
            "value": 279.4,
            "unit": "MB",
            "range": "276.68 … 282.96"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 264.66,
            "unit": "MB",
            "range": "260.64 … 271.72"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 279.99,
            "unit": "MB",
            "range": "277.86 … 281.52"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "lts20050703@gmail.com",
            "name": "LTS20050703",
            "username": "lts20050703"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "e1ba1ae90dbc4cabaa17876540b4bcf1ce855ba6",
          "message": "delete follow up and original now support ephemeral (#2585)",
          "timestamp": "2022-11-14T12:35:40-06:00",
          "tree_id": "7a02c4c9f2833ea5fe4209e4bd302aea741a03b6",
          "url": "https://github.com/discordeno/discordeno/commit/e1ba1ae90dbc4cabaa17876540b4bcf1ce855ba6"
        },
        "date": 1668451009116,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "[Cache Plugin] RSS",
            "value": 280.14,
            "unit": "MB",
            "range": "276.3 … 282.7"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 265.4,
            "unit": "MB",
            "range": "260.93 … 271.76"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 280.04,
            "unit": "MB",
            "range": "277.86 … 281.52"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "lts20050703@gmail.com",
            "name": "LTS20050703",
            "username": "lts20050703"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "65b753455116e8109e2cb1fca62e7bd25f1c5cbd",
          "message": "public thread can be in forum channel (#2586)\n\n* public thread can be in forum channel\r\n\r\n* Update types/shared.ts\r\n\r\nCo-authored-by: Skillz4Killz <23035000+Skillz4Killz@users.noreply.github.com>",
          "timestamp": "2022-11-14T12:36:20-06:00",
          "tree_id": "529a71fff92bf7f05bb547d076f7226f865549f4",
          "url": "https://github.com/discordeno/discordeno/commit/65b753455116e8109e2cb1fca62e7bd25f1c5cbd"
        },
        "date": 1668451049144,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "[Cache Plugin] RSS",
            "value": 279.84,
            "unit": "MB",
            "range": "278.58 … 281.16"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 265.8,
            "unit": "MB",
            "range": "262.14 … 271.81"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 279.99,
            "unit": "MB",
            "range": "277.86 … 281.63"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "gankstarsleague@gmail.com",
            "name": "Skillz",
            "username": "Skillz4Killz"
          },
          "committer": {
            "email": "gankstarsleague@gmail.com",
            "name": "Skillz",
            "username": "Skillz4Killz"
          },
          "distinct": true,
          "id": "0628d849e4f1576db7c20bc947965fc94927654b",
          "message": "fix: remove debugs",
          "timestamp": "2022-11-14T12:54:55-06:00",
          "tree_id": "102a8b96209597b52f9cc89c9cf7f8a3278b057e",
          "url": "https://github.com/discordeno/discordeno/commit/0628d849e4f1576db7c20bc947965fc94927654b"
        },
        "date": 1668452192675,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "[Cache Plugin] RSS",
            "value": 280.73,
            "unit": "MB",
            "range": "278.34 … 282.44"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 265.38,
            "unit": "MB",
            "range": "261.09 … 271.7"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 279.86,
            "unit": "MB",
            "range": "277.59 … 281.26"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "mail@afink.dev",
            "name": "Andreas Fink",
            "username": "AFink"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "e59ec94f55202df6c8e3f6184c955e25a8c2132c",
          "message": "BREAKING: fix(plugins/validations): remove bot arg from validateApplicationCommandLength, fixes #2543 (#2553)",
          "timestamp": "2022-11-14T13:02:43-06:00",
          "tree_id": "c10c114d3821c8e10ead6f69935627d1f68b5aa1",
          "url": "https://github.com/discordeno/discordeno/commit/e59ec94f55202df6c8e3f6184c955e25a8c2132c"
        },
        "date": 1668452647049,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "[Cache Plugin] RSS",
            "value": 277.95,
            "unit": "MB",
            "range": "276.31 … 280.28"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 265.16,
            "unit": "MB",
            "range": "261.16 … 272.18"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 279.8,
            "unit": "MB",
            "range": "277.86 … 281.89"
          }
        ]
      },
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
          "id": "5a1887462d2221135cee75cf527a94250363f2ab",
          "message": "Fix: typing (#2589)\n\n* deno fmt\r\n\r\n* import SortOrderTypes\r\n\r\n* add bigString to reverse snowflake",
          "timestamp": "2022-11-14T15:49:25-06:00",
          "tree_id": "8234925554cd63dcb4dfa3cec7656a457eb81ac2",
          "url": "https://github.com/discordeno/discordeno/commit/5a1887462d2221135cee75cf527a94250363f2ab"
        },
        "date": 1668462651937,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "[Transformer] Discord Guild to a Guild",
            "value": 9418,
            "unit": "ns/iter",
            "range": "8235.24 … 6218662"
          },
          {
            "name": "[Guild.toggles.features] Get the features of a guild",
            "value": 1309,
            "unit": "ns/iter",
            "range": "1277.52 … 1499.24"
          },
          {
            "name": "[Transformer] Discord User to a User",
            "value": 174,
            "unit": "ns/iter",
            "range": "169.43 … 236.29"
          },
          {
            "name": "[Transformer] User to a Discord User",
            "value": 149,
            "unit": "ns/iter",
            "range": "143.38 … 539.24"
          },
          {
            "name": "[Transformer] Discord Rules Channel to a Rules Channel",
            "value": 479,
            "unit": "ns/iter",
            "range": "466.16 … 591.85"
          },
          {
            "name": "[Transformer] Discord Announcement Channel to a Announcement Channel",
            "value": 1383,
            "unit": "ns/iter",
            "range": "1361.98 … 1668.16"
          },
          {
            "name": "[Transformer] Discord Moderator Channel to a Moderator Channel",
            "value": 650,
            "unit": "ns/iter",
            "range": "636.21 … 672.06"
          },
          {
            "name": "[Transformer] Discord Text Channel to a Text Channel",
            "value": 614,
            "unit": "ns/iter",
            "range": "600.22 … 662.6"
          },
          {
            "name": "[Transformer] Discord Stage Channel to a Stage Channel",
            "value": 727,
            "unit": "ns/iter",
            "range": "527.9 … 7739014"
          },
          {
            "name": "[Transformer] Discord Voice Channel to a Voice Channel",
            "value": 526,
            "unit": "ns/iter",
            "range": "496.35 … 2280.53"
          },
          {
            "name": "[Transformer] Discord Member to a Member",
            "value": 988,
            "unit": "ns/iter",
            "range": "976.42 … 1087.47"
          },
          {
            "name": "[Transformer] Member to a Discord Member",
            "value": 1182,
            "unit": "ns/iter",
            "range": "1171.94 … 1214.17"
          },
          {
            "name": "[Transformer] Discord Role to a Role",
            "value": 320,
            "unit": "ns/iter",
            "range": "315.19 … 448.93"
          },
          {
            "name": "[Transformer] Discord Message to a Message",
            "value": 1109,
            "unit": "ns/iter",
            "range": "1053.24 … 2692.29"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 277.81,
            "unit": "MB",
            "range": "275.28 … 281.42"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 262.79,
            "unit": "MB",
            "range": "261.27 … 263.66"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 278.72,
            "unit": "MB",
            "range": "276.87 … 280.74"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "lts20050703@gmail.com",
            "name": "LTS20050703",
            "username": "lts20050703"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "f615e8520ca11e5e9885fec663488eb8be4b26a9",
          "message": "helpers: add appliedTags to editHelper options (#2590)",
          "timestamp": "2022-11-15T14:37:03-06:00",
          "tree_id": "6c10f5d8d1e800e6a60461588d39ee56e5abb3bb",
          "url": "https://github.com/discordeno/discordeno/commit/f615e8520ca11e5e9885fec663488eb8be4b26a9"
        },
        "date": 1668544709963,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "[Transformer] Discord Guild to a Guild",
            "value": 4311,
            "unit": "ns/iter",
            "range": "3900.98 … 4355271.9"
          },
          {
            "name": "[Guild.toggles.features] Get the features of a guild",
            "value": 1042,
            "unit": "ns/iter",
            "range": "1012.28 … 1456.7"
          },
          {
            "name": "[Transformer] Discord User to a User",
            "value": 86,
            "unit": "ns/iter",
            "range": "84.2 … 313.89"
          },
          {
            "name": "[Transformer] User to a Discord User",
            "value": 72,
            "unit": "ns/iter",
            "range": "69.47 … 297.58"
          },
          {
            "name": "[Transformer] Discord Rules Channel to a Rules Channel",
            "value": 228,
            "unit": "ns/iter",
            "range": "223.81 … 234.71"
          },
          {
            "name": "[Transformer] Discord Announcement Channel to a Announcement Channel",
            "value": 637,
            "unit": "ns/iter",
            "range": "637 … 661.69"
          },
          {
            "name": "[Transformer] Discord Moderator Channel to a Moderator Channel",
            "value": 304,
            "unit": "ns/iter",
            "range": "297.69 … 557.99"
          },
          {
            "name": "[Transformer] Discord Text Channel to a Text Channel",
            "value": 300,
            "unit": "ns/iter",
            "range": "296.68 … 303.84"
          },
          {
            "name": "[Transformer] Discord Stage Channel to a Stage Channel",
            "value": 244,
            "unit": "ns/iter",
            "range": "237.98 … 553.05"
          },
          {
            "name": "[Transformer] Discord Voice Channel to a Voice Channel",
            "value": 244,
            "unit": "ns/iter",
            "range": "240.83 … 271.56"
          },
          {
            "name": "[Transformer] Discord Member to a Member",
            "value": 442,
            "unit": "ns/iter",
            "range": "439.87 … 493.8"
          },
          {
            "name": "[Transformer] Member to a Discord Member",
            "value": 568,
            "unit": "ns/iter",
            "range": "562.93 … 582.68"
          },
          {
            "name": "[Transformer] Discord Role to a Role",
            "value": 155,
            "unit": "ns/iter",
            "range": "153.31 … 160.86"
          },
          {
            "name": "[Transformer] Discord Message to a Message",
            "value": 499,
            "unit": "ns/iter",
            "range": "474.18 … 1219.67"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 278.68,
            "unit": "MB",
            "range": "276.31 … 281.16"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 269.02,
            "unit": "MB",
            "range": "263.58 … 271.95"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 278.73,
            "unit": "MB",
            "range": "277.86 … 280.48"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "5ad03ac56216ba1a64ea773b187a218dca34f798",
          "message": "chore(deps): bump loader-utils from 1.4.1 to 1.4.2 in /site (#2591)\n\nBumps [loader-utils](https://github.com/webpack/loader-utils) from 1.4.1 to 1.4.2.\r\n- [Release notes](https://github.com/webpack/loader-utils/releases)\r\n- [Changelog](https://github.com/webpack/loader-utils/blob/v1.4.2/CHANGELOG.md)\r\n- [Commits](https://github.com/webpack/loader-utils/compare/v1.4.1...v1.4.2)\r\n\r\n---\r\nupdated-dependencies:\r\n- dependency-name: loader-utils\r\n  dependency-type: indirect\r\n...\r\n\r\nSigned-off-by: dependabot[bot] <support@github.com>\r\n\r\nSigned-off-by: dependabot[bot] <support@github.com>\r\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2022-11-17T09:04:14-06:00",
          "tree_id": "6a2e8dd175d59bfb4fad35e1834135f35b3cd88e",
          "url": "https://github.com/discordeno/discordeno/commit/5ad03ac56216ba1a64ea773b187a218dca34f798"
        },
        "date": 1668697553992,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "[Transformer] Discord Guild to a Guild",
            "value": 5540,
            "unit": "ns/iter",
            "range": "3660.17 … 7456053.15"
          },
          {
            "name": "[Guild.toggles.features] Get the features of a guild",
            "value": 1119,
            "unit": "ns/iter",
            "range": "1032.25 … 1529.87"
          },
          {
            "name": "[Transformer] Discord User to a User",
            "value": 94,
            "unit": "ns/iter",
            "range": "84.57 … 339.96"
          },
          {
            "name": "[Transformer] User to a Discord User",
            "value": 73,
            "unit": "ns/iter",
            "range": "67.31 … 223.25"
          },
          {
            "name": "[Transformer] Discord Rules Channel to a Rules Channel",
            "value": 233,
            "unit": "ns/iter",
            "range": "220.99 … 243.17"
          },
          {
            "name": "[Transformer] Discord Announcement Channel to a Announcement Channel",
            "value": 650,
            "unit": "ns/iter",
            "range": "641.56 … 670.35"
          },
          {
            "name": "[Transformer] Discord Moderator Channel to a Moderator Channel",
            "value": 312,
            "unit": "ns/iter",
            "range": "302.7 … 357.82"
          },
          {
            "name": "[Transformer] Discord Text Channel to a Text Channel",
            "value": 306,
            "unit": "ns/iter",
            "range": "299.15 … 335.18"
          },
          {
            "name": "[Transformer] Discord Stage Channel to a Stage Channel",
            "value": 245,
            "unit": "ns/iter",
            "range": "237.42 … 307.98"
          },
          {
            "name": "[Transformer] Discord Voice Channel to a Voice Channel",
            "value": 249,
            "unit": "ns/iter",
            "range": "236.55 … 330.82"
          },
          {
            "name": "[Transformer] Discord Member to a Member",
            "value": 448,
            "unit": "ns/iter",
            "range": "440.04 … 530.52"
          },
          {
            "name": "[Transformer] Member to a Discord Member",
            "value": 592,
            "unit": "ns/iter",
            "range": "583.98 … 625.11"
          },
          {
            "name": "[Transformer] Discord Role to a Role",
            "value": 156,
            "unit": "ns/iter",
            "range": "150.79 … 163.14"
          },
          {
            "name": "[Transformer] Discord Message to a Message",
            "value": 514,
            "unit": "ns/iter",
            "range": "481.17 … 1209.09"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 280.9,
            "unit": "MB",
            "range": "278.58 … 282.7"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 265.32,
            "unit": "MB",
            "range": "260.52 … 271.98"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 280.04,
            "unit": "MB",
            "range": "277.86 … 281.52"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "dannyjmay97@gmail.com",
            "name": "Danny May",
            "username": "danny-may"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "0910965de54c21738d314d257cefdb4afcdc4cdd",
          "message": "Fix sending files through a rest proxy (#2593)\n\n* Fix rest proxy not working with files\r\n\r\n* Fix some credits\r\n\r\n* Add tests\r\n\r\n* Fix test\r\n\r\n* Remove some usage of any\r\n\r\n* Fix mime matching\r\n\r\n* Fix formatting issues",
          "timestamp": "2022-11-20T16:50:50-06:00",
          "tree_id": "1530f0c1da09a69df17ed4eee56ae0d48c1ab2ba",
          "url": "https://github.com/discordeno/discordeno/commit/0910965de54c21738d314d257cefdb4afcdc4cdd"
        },
        "date": 1668984732200,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "[Transformer] Discord Guild to a Guild",
            "value": 9461,
            "unit": "ns/iter",
            "range": "8235.98 … 8668897.95"
          },
          {
            "name": "[Guild.toggles.features] Get the features of a guild",
            "value": 1309,
            "unit": "ns/iter",
            "range": "1277.63 … 1541.61"
          },
          {
            "name": "[Transformer] Discord User to a User",
            "value": 187,
            "unit": "ns/iter",
            "range": "184.03 … 215.97"
          },
          {
            "name": "[Transformer] User to a Discord User",
            "value": 150,
            "unit": "ns/iter",
            "range": "143.72 … 527.41"
          },
          {
            "name": "[Transformer] Discord Rules Channel to a Rules Channel",
            "value": 489,
            "unit": "ns/iter",
            "range": "481.7 … 511.25"
          },
          {
            "name": "[Transformer] Discord Announcement Channel to a Announcement Channel",
            "value": 1383,
            "unit": "ns/iter",
            "range": "1372.66 … 1404.34"
          },
          {
            "name": "[Transformer] Discord Moderator Channel to a Moderator Channel",
            "value": 620,
            "unit": "ns/iter",
            "range": "610.65 … 639.78"
          },
          {
            "name": "[Transformer] Discord Text Channel to a Text Channel",
            "value": 618,
            "unit": "ns/iter",
            "range": "609.28 … 624.09"
          },
          {
            "name": "[Transformer] Discord Stage Channel to a Stage Channel",
            "value": 494,
            "unit": "ns/iter",
            "range": "486.6 … 510.02"
          },
          {
            "name": "[Transformer] Discord Voice Channel to a Voice Channel",
            "value": 503,
            "unit": "ns/iter",
            "range": "496.21 … 510.93"
          },
          {
            "name": "[Transformer] Discord Member to a Member",
            "value": 981,
            "unit": "ns/iter",
            "range": "975.93 … 1066.45"
          },
          {
            "name": "[Transformer] Member to a Discord Member",
            "value": 1183,
            "unit": "ns/iter",
            "range": "1172.04 … 1203.72"
          },
          {
            "name": "[Transformer] Discord Role to a Role",
            "value": 321,
            "unit": "ns/iter",
            "range": "316.77 … 333.73"
          },
          {
            "name": "[Transformer] Discord Message to a Message",
            "value": 1088,
            "unit": "ns/iter",
            "range": "1038.67 … 2639.74"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 280.05,
            "unit": "MB",
            "range": "275.78 … 282.7"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 265.54,
            "unit": "MB",
            "range": "260.79 … 272.13"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 279.86,
            "unit": "MB",
            "range": "277.33 … 281.52"
          }
        ]
      },
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
          "id": "50c6c6fbfb599b05552b614afd82da2e9c58cc8a",
          "message": "[helper] Fix entity metadata (#2595)\n\n* change to null if no location\r\n\r\n* style: deno fmt",
          "timestamp": "2022-11-29T10:12:23-06:00",
          "tree_id": "902c4a44cda99bd0c353043d0c4c0984efde6358",
          "url": "https://github.com/discordeno/discordeno/commit/50c6c6fbfb599b05552b614afd82da2e9c58cc8a"
        },
        "date": 1669738430473,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "[Transformer] Discord Guild to a Guild",
            "value": 9468,
            "unit": "ns/iter",
            "range": "8434.84 … 5609168.6"
          },
          {
            "name": "[Guild.toggles.features] Get the features of a guild",
            "value": 1307,
            "unit": "ns/iter",
            "range": "1265.23 … 1549.9"
          },
          {
            "name": "[Transformer] Discord User to a User",
            "value": 182,
            "unit": "ns/iter",
            "range": "179.03 … 213.46"
          },
          {
            "name": "[Transformer] User to a Discord User",
            "value": 142,
            "unit": "ns/iter",
            "range": "134.68 … 551.17"
          },
          {
            "name": "[Transformer] Discord Rules Channel to a Rules Channel",
            "value": 466,
            "unit": "ns/iter",
            "range": "455.98 … 487.24"
          },
          {
            "name": "[Transformer] Discord Announcement Channel to a Announcement Channel",
            "value": 1360,
            "unit": "ns/iter",
            "range": "1349.57 … 1370.66"
          },
          {
            "name": "[Transformer] Discord Moderator Channel to a Moderator Channel",
            "value": 624,
            "unit": "ns/iter",
            "range": "604.47 … 1223.05"
          },
          {
            "name": "[Transformer] Discord Text Channel to a Text Channel",
            "value": 627,
            "unit": "ns/iter",
            "range": "608.89 … 1075.44"
          },
          {
            "name": "[Transformer] Discord Stage Channel to a Stage Channel",
            "value": 492,
            "unit": "ns/iter",
            "range": "482.1 … 520.31"
          },
          {
            "name": "[Transformer] Discord Voice Channel to a Voice Channel",
            "value": 496,
            "unit": "ns/iter",
            "range": "485.3 … 542.71"
          },
          {
            "name": "[Transformer] Discord Member to a Member",
            "value": 1035,
            "unit": "ns/iter",
            "range": "1026.79 … 1170.33"
          },
          {
            "name": "[Transformer] Member to a Discord Member",
            "value": 1181,
            "unit": "ns/iter",
            "range": "1170.33 … 1201.96"
          },
          {
            "name": "[Transformer] Discord Role to a Role",
            "value": 322,
            "unit": "ns/iter",
            "range": "317.17 … 335.97"
          },
          {
            "name": "[Transformer] Discord Message to a Message",
            "value": 1097,
            "unit": "ns/iter",
            "range": "1038.66 … 2815.13"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 150.39,
            "unit": "MB",
            "range": "49.61 … 280.06"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 268.53,
            "unit": "MB",
            "range": "262.72 … 271.91"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 148.55,
            "unit": "MB",
            "range": "47.12 … 278.35"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "ace5e26154cf6ffd0ba87b800145fdce34a981fd",
          "message": "chore(deps): bump fastify from 4.8.1 to 4.10.2 in /template/bigbot (#2594)\n\nBumps [fastify](https://github.com/fastify/fastify) from 4.8.1 to 4.10.2.\r\n- [Release notes](https://github.com/fastify/fastify/releases)\r\n- [Commits](https://github.com/fastify/fastify/compare/v4.8.1...v4.10.2)\r\n\r\n---\r\nupdated-dependencies:\r\n- dependency-name: fastify\r\n  dependency-type: direct:production\r\n...\r\n\r\nSigned-off-by: dependabot[bot] <support@github.com>\r\n\r\nSigned-off-by: dependabot[bot] <support@github.com>\r\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2022-11-30T10:41:13-06:00",
          "tree_id": "32a61a376aef5cf6d07e5a7d00ff1fc038c63015",
          "url": "https://github.com/discordeno/discordeno/commit/ace5e26154cf6ffd0ba87b800145fdce34a981fd"
        },
        "date": 1669826557373,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "[Transformer] Discord Guild to a Guild",
            "value": 4367,
            "unit": "ns/iter",
            "range": "3902.28 … 4549371.6"
          },
          {
            "name": "[Guild.toggles.features] Get the features of a guild",
            "value": 1032,
            "unit": "ns/iter",
            "range": "1007.68 … 1116.35"
          },
          {
            "name": "[Transformer] Discord User to a User",
            "value": 85,
            "unit": "ns/iter",
            "range": "83.36 … 101.44"
          },
          {
            "name": "[Transformer] User to a Discord User",
            "value": 70,
            "unit": "ns/iter",
            "range": "66.7 … 272.17"
          },
          {
            "name": "[Transformer] Discord Rules Channel to a Rules Channel",
            "value": 230,
            "unit": "ns/iter",
            "range": "225.53 … 237.29"
          },
          {
            "name": "[Transformer] Discord Announcement Channel to a Announcement Channel",
            "value": 647,
            "unit": "ns/iter",
            "range": "642.15 … 656.97"
          },
          {
            "name": "[Transformer] Discord Moderator Channel to a Moderator Channel",
            "value": 309,
            "unit": "ns/iter",
            "range": "302.38 … 314.52"
          },
          {
            "name": "[Transformer] Discord Text Channel to a Text Channel",
            "value": 304,
            "unit": "ns/iter",
            "range": "296.82 … 308.81"
          },
          {
            "name": "[Transformer] Discord Stage Channel to a Stage Channel",
            "value": 245,
            "unit": "ns/iter",
            "range": "239.47 … 291.51"
          },
          {
            "name": "[Transformer] Discord Voice Channel to a Voice Channel",
            "value": 248,
            "unit": "ns/iter",
            "range": "242.12 … 295.32"
          },
          {
            "name": "[Transformer] Discord Member to a Member",
            "value": 444,
            "unit": "ns/iter",
            "range": "440.05 … 489.03"
          },
          {
            "name": "[Transformer] Member to a Discord Member",
            "value": 583,
            "unit": "ns/iter",
            "range": "577.93 … 602.63"
          },
          {
            "name": "[Transformer] Discord Role to a Role",
            "value": 155,
            "unit": "ns/iter",
            "range": "153.32 … 162.28"
          },
          {
            "name": "[Transformer] Discord Message to a Message",
            "value": 504,
            "unit": "ns/iter",
            "range": "475.69 … 1190.44"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 144.75,
            "unit": "MB",
            "range": "40.06 … 280.66"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 265.48,
            "unit": "MB",
            "range": "262.2 … 271.41"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 143.16,
            "unit": "MB",
            "range": "37.42 … 280.02"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "42719cd2c1db54e4daed7cfef0f8edf6793f3ac2",
          "message": "chore(deps): bump minimatch, recursive-readdir and serve-handler (#2596)\n\nBumps [minimatch](https://github.com/isaacs/minimatch), [recursive-readdir](https://github.com/jergason/recursive-readdir) and [serve-handler](https://github.com/zeit/serve-handler). These dependencies needed to be updated together.\r\n\r\nUpdates `minimatch` from 3.0.4 to 3.1.2\r\n- [Release notes](https://github.com/isaacs/minimatch/releases)\r\n- [Changelog](https://github.com/isaacs/minimatch/blob/main/changelog.md)\r\n- [Commits](https://github.com/isaacs/minimatch/compare/v3.0.4...v3.1.2)\r\n\r\nUpdates `recursive-readdir` from 2.2.2 to 2.2.3\r\n- [Release notes](https://github.com/jergason/recursive-readdir/releases)\r\n- [Changelog](https://github.com/jergason/recursive-readdir/blob/master/CHANGELOG.md)\r\n- [Commits](https://github.com/jergason/recursive-readdir/commits/v2.2.3)\r\n\r\nUpdates `serve-handler` from 6.1.3 to 6.1.5\r\n- [Release notes](https://github.com/zeit/serve-handler/releases)\r\n- [Commits](https://github.com/zeit/serve-handler/compare/6.1.3...6.1.5)\r\n\r\n---\r\nupdated-dependencies:\r\n- dependency-name: minimatch\r\n  dependency-type: indirect\r\n- dependency-name: recursive-readdir\r\n  dependency-type: indirect\r\n- dependency-name: serve-handler\r\n  dependency-type: indirect\r\n...\r\n\r\nSigned-off-by: dependabot[bot] <support@github.com>\r\n\r\nSigned-off-by: dependabot[bot] <support@github.com>\r\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2022-11-30T10:43:10-06:00",
          "tree_id": "49e915175a63a48351df857d467bbcc4cd322bed",
          "url": "https://github.com/discordeno/discordeno/commit/42719cd2c1db54e4daed7cfef0f8edf6793f3ac2"
        },
        "date": 1669826670394,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "[Transformer] Discord Guild to a Guild",
            "value": 5117,
            "unit": "ns/iter",
            "range": "4091.69 … 6433323.75"
          },
          {
            "name": "[Guild.toggles.features] Get the features of a guild",
            "value": 1085,
            "unit": "ns/iter",
            "range": "1015.53 … 1474"
          },
          {
            "name": "[Transformer] Discord User to a User",
            "value": 86,
            "unit": "ns/iter",
            "range": "84.36 … 100.55"
          },
          {
            "name": "[Transformer] User to a Discord User",
            "value": 71,
            "unit": "ns/iter",
            "range": "68.38 … 242.96"
          },
          {
            "name": "[Transformer] Discord Rules Channel to a Rules Channel",
            "value": 228,
            "unit": "ns/iter",
            "range": "223.08 … 276.71"
          },
          {
            "name": "[Transformer] Discord Announcement Channel to a Announcement Channel",
            "value": 641,
            "unit": "ns/iter",
            "range": "635.94 … 655.66"
          },
          {
            "name": "[Transformer] Discord Moderator Channel to a Moderator Channel",
            "value": 307,
            "unit": "ns/iter",
            "range": "301.57 … 315.79"
          },
          {
            "name": "[Transformer] Discord Text Channel to a Text Channel",
            "value": 300,
            "unit": "ns/iter",
            "range": "295.43 … 304"
          },
          {
            "name": "[Transformer] Discord Stage Channel to a Stage Channel",
            "value": 240,
            "unit": "ns/iter",
            "range": "236.16 … 271.8"
          },
          {
            "name": "[Transformer] Discord Voice Channel to a Voice Channel",
            "value": 245,
            "unit": "ns/iter",
            "range": "241.07 … 280.51"
          },
          {
            "name": "[Transformer] Discord Member to a Member",
            "value": 375,
            "unit": "ns/iter",
            "range": "370.6 … 459.07"
          },
          {
            "name": "[Transformer] Member to a Discord Member",
            "value": 587,
            "unit": "ns/iter",
            "range": "581.71 … 606.36"
          },
          {
            "name": "[Transformer] Discord Role to a Role",
            "value": 155,
            "unit": "ns/iter",
            "range": "152.49 … 163.59"
          },
          {
            "name": "[Transformer] Discord Message to a Message",
            "value": 498,
            "unit": "ns/iter",
            "range": "473.04 … 1222.58"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 144.12,
            "unit": "MB",
            "range": "40.5 … 282.03"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 266.2,
            "unit": "MB",
            "range": "263.59 … 268.79"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 143.46,
            "unit": "MB",
            "range": "37.86 … 281.12"
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
          "id": "4f2afb5246595a1b2662ed1ec1cd838560c0d607",
          "message": "Create site",
          "timestamp": "2022-12-02T07:52:03-06:00",
          "tree_id": "f844f58421b7a5475da8caad6b0396fe6883bd3e",
          "url": "https://github.com/discordeno/discordeno/commit/4f2afb5246595a1b2662ed1ec1cd838560c0d607"
        },
        "date": 1669989214698,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "[Transformer] Discord Guild to a Guild",
            "value": 4479,
            "unit": "ns/iter",
            "range": "4049.82 … 4484430.4"
          },
          {
            "name": "[Guild.toggles.features] Get the features of a guild",
            "value": 1022,
            "unit": "ns/iter",
            "range": "1002.58 … 1076.66"
          },
          {
            "name": "[Transformer] Discord User to a User",
            "value": 88,
            "unit": "ns/iter",
            "range": "86.85 … 101.41"
          },
          {
            "name": "[Transformer] User to a Discord User",
            "value": 70,
            "unit": "ns/iter",
            "range": "67.51 … 250.38"
          },
          {
            "name": "[Transformer] Discord Rules Channel to a Rules Channel",
            "value": 231,
            "unit": "ns/iter",
            "range": "226.88 … 240.43"
          },
          {
            "name": "[Transformer] Discord Announcement Channel to a Announcement Channel",
            "value": 647,
            "unit": "ns/iter",
            "range": "642.04 … 656.86"
          },
          {
            "name": "[Transformer] Discord Moderator Channel to a Moderator Channel",
            "value": 318,
            "unit": "ns/iter",
            "range": "312.69 … 323.15"
          },
          {
            "name": "[Transformer] Discord Text Channel to a Text Channel",
            "value": 311,
            "unit": "ns/iter",
            "range": "305.12 … 316.04"
          },
          {
            "name": "[Transformer] Discord Stage Channel to a Stage Channel",
            "value": 248,
            "unit": "ns/iter",
            "range": "243.23 … 255.2"
          },
          {
            "name": "[Transformer] Discord Voice Channel to a Voice Channel",
            "value": 252,
            "unit": "ns/iter",
            "range": "248 … 291.9"
          },
          {
            "name": "[Transformer] Discord Member to a Member",
            "value": 463,
            "unit": "ns/iter",
            "range": "450.84 … 528.45"
          },
          {
            "name": "[Transformer] Member to a Discord Member",
            "value": 568,
            "unit": "ns/iter",
            "range": "558.08 … 577.84"
          },
          {
            "name": "[Transformer] Discord Role to a Role",
            "value": 158,
            "unit": "ns/iter",
            "range": "155.75 … 165.99"
          },
          {
            "name": "[Transformer] Discord Message to a Message",
            "value": 509,
            "unit": "ns/iter",
            "range": "482.41 … 1269.27"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 140.6,
            "unit": "MB",
            "range": "45.99 … 279.06"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 265.27,
            "unit": "MB",
            "range": "261.84 … 269.9"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 138.44,
            "unit": "MB",
            "range": "40.36 … 279.94"
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
          "id": "5381e0e3f7abc8ce94a68dccfada0d5ffc78b7ef",
          "message": "Rename site to site.yml",
          "timestamp": "2022-12-02T07:52:22-06:00",
          "tree_id": "f826468035f122e80e7e39f1912c8619f873b8cf",
          "url": "https://github.com/discordeno/discordeno/commit/5381e0e3f7abc8ce94a68dccfada0d5ffc78b7ef"
        },
        "date": 1669989238872,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "[Transformer] Discord Guild to a Guild",
            "value": 4439,
            "unit": "ns/iter",
            "range": "3999.7 … 4508302.7"
          },
          {
            "name": "[Guild.toggles.features] Get the features of a guild",
            "value": 1022,
            "unit": "ns/iter",
            "range": "1002.39 … 1140.65"
          },
          {
            "name": "[Transformer] Discord User to a User",
            "value": 87,
            "unit": "ns/iter",
            "range": "86.16 … 104.22"
          },
          {
            "name": "[Transformer] User to a Discord User",
            "value": 70,
            "unit": "ns/iter",
            "range": "67.67 … 288.53"
          },
          {
            "name": "[Transformer] Discord Rules Channel to a Rules Channel",
            "value": 232,
            "unit": "ns/iter",
            "range": "227.25 … 240.73"
          },
          {
            "name": "[Transformer] Discord Announcement Channel to a Announcement Channel",
            "value": 642,
            "unit": "ns/iter",
            "range": "636.99 … 656.74"
          },
          {
            "name": "[Transformer] Discord Moderator Channel to a Moderator Channel",
            "value": 315,
            "unit": "ns/iter",
            "range": "310.39 … 321.81"
          },
          {
            "name": "[Transformer] Discord Text Channel to a Text Channel",
            "value": 335,
            "unit": "ns/iter",
            "range": "306.41 … 557.98"
          },
          {
            "name": "[Transformer] Discord Stage Channel to a Stage Channel",
            "value": 356,
            "unit": "ns/iter",
            "range": "296.27 … 4083643.3"
          },
          {
            "name": "[Transformer] Discord Voice Channel to a Voice Channel",
            "value": 286,
            "unit": "ns/iter",
            "range": "253.49 … 1599.88"
          },
          {
            "name": "[Transformer] Discord Member to a Member",
            "value": 460,
            "unit": "ns/iter",
            "range": "449.21 … 661.68"
          },
          {
            "name": "[Transformer] Member to a Discord Member",
            "value": 563,
            "unit": "ns/iter",
            "range": "557.98 … 582.67"
          },
          {
            "name": "[Transformer] Discord Role to a Role",
            "value": 158,
            "unit": "ns/iter",
            "range": "156.46 … 172.82"
          },
          {
            "name": "[Transformer] Discord Message to a Message",
            "value": 514,
            "unit": "ns/iter",
            "range": "487.07 … 1259.16"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 140.01,
            "unit": "MB",
            "range": "38.48 … 280.4"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 268.45,
            "unit": "MB",
            "range": "263.81 … 272.4"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 138.35,
            "unit": "MB",
            "range": "35.82 … 279.76"
          }
        ]
      },
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
          "id": "41d9ec4025b79a5d243eaf5743e42c8147830a4d",
          "message": "Update site.yml (#2674)\n\n* Update site.yml\r\n\r\n* Update site.yml",
          "timestamp": "2022-12-02T11:55:38-06:00",
          "tree_id": "9ab49d092b0509ccaca654dfbe54d536109575aa",
          "url": "https://github.com/discordeno/discordeno/commit/41d9ec4025b79a5d243eaf5743e42c8147830a4d"
        },
        "date": 1670003832210,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "[Transformer] Discord Guild to a Guild",
            "value": 5385,
            "unit": "ns/iter",
            "range": "3994.19 … 13353418.8"
          },
          {
            "name": "[Guild.toggles.features] Get the features of a guild",
            "value": 1055,
            "unit": "ns/iter",
            "range": "1005.94 … 1469.47"
          },
          {
            "name": "[Transformer] Discord User to a User",
            "value": 90,
            "unit": "ns/iter",
            "range": "86.68 … 338.05"
          },
          {
            "name": "[Transformer] User to a Discord User",
            "value": 70,
            "unit": "ns/iter",
            "range": "67.63 … 186.44"
          },
          {
            "name": "[Transformer] Discord Rules Channel to a Rules Channel",
            "value": 242,
            "unit": "ns/iter",
            "range": "230.36 … 429.65"
          },
          {
            "name": "[Transformer] Discord Announcement Channel to a Announcement Channel",
            "value": 651,
            "unit": "ns/iter",
            "range": "645.97 … 685.42"
          },
          {
            "name": "[Transformer] Discord Moderator Channel to a Moderator Channel",
            "value": 318,
            "unit": "ns/iter",
            "range": "309.06 … 367.67"
          },
          {
            "name": "[Transformer] Discord Text Channel to a Text Channel",
            "value": 315,
            "unit": "ns/iter",
            "range": "307.68 … 370.17"
          },
          {
            "name": "[Transformer] Discord Stage Channel to a Stage Channel",
            "value": 257,
            "unit": "ns/iter",
            "range": "250.01 … 272.71"
          },
          {
            "name": "[Transformer] Discord Voice Channel to a Voice Channel",
            "value": 257,
            "unit": "ns/iter",
            "range": "249.77 … 311.69"
          },
          {
            "name": "[Transformer] Discord Member to a Member",
            "value": 459,
            "unit": "ns/iter",
            "range": "454.88 … 527.63"
          },
          {
            "name": "[Transformer] Member to a Discord Member",
            "value": 572,
            "unit": "ns/iter",
            "range": "562.15 … 591.73"
          },
          {
            "name": "[Transformer] Discord Role to a Role",
            "value": 158,
            "unit": "ns/iter",
            "range": "155.55 … 168.22"
          },
          {
            "name": "[Transformer] Discord Message to a Message",
            "value": 523,
            "unit": "ns/iter",
            "range": "488.48 … 1291.95"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 150.31,
            "unit": "MB",
            "range": "59.07 … 280.66"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 268.04,
            "unit": "MB",
            "range": "262.62 … 271.21"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 148.81,
            "unit": "MB",
            "range": "56.72 … 280.02"
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
          "id": "349b9151f3338a9f090f1616e0f43a328164d3ea",
          "message": "fix: disable docs sync repo",
          "timestamp": "2022-12-03T10:11:26-06:00",
          "tree_id": "832a85e43452b722130c63890b3b0109e58e870a",
          "url": "https://github.com/discordeno/discordeno/commit/349b9151f3338a9f090f1616e0f43a328164d3ea"
        },
        "date": 1670083984126,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "[Transformer] Discord Guild to a Guild",
            "value": 3921,
            "unit": "ns/iter",
            "range": "2873.97 … 2633753"
          },
          {
            "name": "[Guild.toggles.features] Get the features of a guild",
            "value": 583,
            "unit": "ns/iter",
            "range": "501.87 … 982.3"
          },
          {
            "name": "[Transformer] Discord User to a User",
            "value": 84,
            "unit": "ns/iter",
            "range": "67.66 … 288.17"
          },
          {
            "name": "[Transformer] User to a Discord User",
            "value": 65,
            "unit": "ns/iter",
            "range": "47.15 … 414.45"
          },
          {
            "name": "[Transformer] Discord Rules Channel to a Rules Channel",
            "value": 217,
            "unit": "ns/iter",
            "range": "190.24 … 268.48"
          },
          {
            "name": "[Transformer] Discord Announcement Channel to a Announcement Channel",
            "value": 721,
            "unit": "ns/iter",
            "range": "514.74 … 1565667.5"
          },
          {
            "name": "[Transformer] Discord Moderator Channel to a Moderator Channel",
            "value": 323,
            "unit": "ns/iter",
            "range": "262.67 … 815.01"
          },
          {
            "name": "[Transformer] Discord Text Channel to a Text Channel",
            "value": 312,
            "unit": "ns/iter",
            "range": "268.71 … 446.11"
          },
          {
            "name": "[Transformer] Discord Stage Channel to a Stage Channel",
            "value": 245,
            "unit": "ns/iter",
            "range": "202.84 … 347.17"
          },
          {
            "name": "[Transformer] Discord Voice Channel to a Voice Channel",
            "value": 263,
            "unit": "ns/iter",
            "range": "213.32 … 583.37"
          },
          {
            "name": "[Transformer] Discord Member to a Member",
            "value": 463,
            "unit": "ns/iter",
            "range": "412.62 … 523.32"
          },
          {
            "name": "[Transformer] Member to a Discord Member",
            "value": 575,
            "unit": "ns/iter",
            "range": "514.74 … 686.32"
          },
          {
            "name": "[Transformer] Discord Role to a Role",
            "value": 158,
            "unit": "ns/iter",
            "range": "134.04 … 198.83"
          },
          {
            "name": "[Transformer] Discord Message to a Message",
            "value": 536,
            "unit": "ns/iter",
            "range": "433.24 … 1209.64"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 140.62,
            "unit": "MB",
            "range": "34.38 … 280.66"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 265.45,
            "unit": "MB",
            "range": "261.22 … 271.83"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 137.94,
            "unit": "MB",
            "range": "28.56 … 280.02"
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
          "id": "ef452b5d54f151cfbf7a4d913fd5bada1a8e0173",
          "message": "Update docusaurus.config.js",
          "timestamp": "2022-12-03T10:12:55-06:00",
          "tree_id": "7ffd22d2e328392d4afeade63a7e174fc4b947ee",
          "url": "https://github.com/discordeno/discordeno/commit/ef452b5d54f151cfbf7a4d913fd5bada1a8e0173"
        },
        "date": 1670084047479,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "[Transformer] Discord Guild to a Guild",
            "value": 10977,
            "unit": "ns/iter",
            "range": "10258.38 … 7164290.8"
          },
          {
            "name": "[Guild.toggles.features] Get the features of a guild",
            "value": 2100,
            "unit": "ns/iter",
            "range": "2007.47 … 2136.4"
          },
          {
            "name": "[Transformer] Discord User to a User",
            "value": 221,
            "unit": "ns/iter",
            "range": "217.53 … 252.46"
          },
          {
            "name": "[Transformer] User to a Discord User",
            "value": 183,
            "unit": "ns/iter",
            "range": "178.44 … 262.26"
          },
          {
            "name": "[Transformer] Discord Rules Channel to a Rules Channel",
            "value": 601,
            "unit": "ns/iter",
            "range": "593.62 … 610.01"
          },
          {
            "name": "[Transformer] Discord Announcement Channel to a Announcement Channel",
            "value": 1670,
            "unit": "ns/iter",
            "range": "1653.88 … 1694.71"
          },
          {
            "name": "[Transformer] Discord Moderator Channel to a Moderator Channel",
            "value": 832,
            "unit": "ns/iter",
            "range": "820.97 … 842.13"
          },
          {
            "name": "[Transformer] Discord Text Channel to a Text Channel",
            "value": 804,
            "unit": "ns/iter",
            "range": "794.61 … 810.61"
          },
          {
            "name": "[Transformer] Discord Stage Channel to a Stage Channel",
            "value": 635,
            "unit": "ns/iter",
            "range": "626.04 … 645.89"
          },
          {
            "name": "[Transformer] Discord Voice Channel to a Voice Channel",
            "value": 650,
            "unit": "ns/iter",
            "range": "639.94 … 664.07"
          },
          {
            "name": "[Transformer] Discord Member to a Member",
            "value": 1334,
            "unit": "ns/iter",
            "range": "1311.27 … 1353.31"
          },
          {
            "name": "[Transformer] Member to a Discord Member",
            "value": 1497,
            "unit": "ns/iter",
            "range": "1478.99 … 1526.36"
          },
          {
            "name": "[Transformer] Discord Role to a Role",
            "value": 407,
            "unit": "ns/iter",
            "range": "402.82 … 423.19"
          },
          {
            "name": "[Transformer] Discord Message to a Message",
            "value": 1415,
            "unit": "ns/iter",
            "range": "1364.6 … 3333.51"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 143.99,
            "unit": "MB",
            "range": "38.82 … 280.4"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 265.19,
            "unit": "MB",
            "range": "260.61 … 271.04"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 142.39,
            "unit": "MB",
            "range": "36.16 … 279.76"
          }
        ]
      },
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
          "id": "987b4058cb5539b52710f8268007ddb4e6b5cd97",
          "message": "Site: update site structure and add architecture page (#2675)\n\n* remove blog\r\n\r\n* fix: license\r\n\r\n* chore: bump docusaurus\r\n\r\n* separate benchmark page\r\n\r\n* move to sub folder\r\n\r\n* fix blog path\r\n\r\n* Chore: update site\r\n\r\n* fix: only deploy on push and dispatch\r\n\r\n* fix: on:\r\n\r\n* ci: merge workflow\r\n\r\n* ci: fix if\r\n\r\n* refactor: dump preset",
          "timestamp": "2022-12-04T08:36:10-06:00",
          "tree_id": "390dcde9fd113508acf39a0dbcbf0b996696b48b",
          "url": "https://github.com/discordeno/discordeno/commit/987b4058cb5539b52710f8268007ddb4e6b5cd97"
        },
        "date": 1670164676176,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "[Transformer] Discord Guild to a Guild",
            "value": 5357,
            "unit": "ns/iter",
            "range": "3326.77 … 7908445.8"
          },
          {
            "name": "[Guild.toggles.features] Get the features of a guild",
            "value": 1108,
            "unit": "ns/iter",
            "range": "951.71 … 1591.8"
          },
          {
            "name": "[Transformer] Discord User to a User",
            "value": 92,
            "unit": "ns/iter",
            "range": "73.77 … 324.1"
          },
          {
            "name": "[Transformer] User to a Discord User",
            "value": 80,
            "unit": "ns/iter",
            "range": "57.49 … 306.87"
          },
          {
            "name": "[Transformer] Discord Rules Channel to a Rules Channel",
            "value": 362,
            "unit": "ns/iter",
            "range": "210.56 … 1840250.7"
          },
          {
            "name": "[Transformer] Discord Announcement Channel to a Announcement Channel",
            "value": 691,
            "unit": "ns/iter",
            "range": "623.24 … 1023.3"
          },
          {
            "name": "[Transformer] Discord Moderator Channel to a Moderator Channel",
            "value": 346,
            "unit": "ns/iter",
            "range": "295.47 … 534.81"
          },
          {
            "name": "[Transformer] Discord Text Channel to a Text Channel",
            "value": 339,
            "unit": "ns/iter",
            "range": "296.4 … 572.71"
          },
          {
            "name": "[Transformer] Discord Stage Channel to a Stage Channel",
            "value": 268,
            "unit": "ns/iter",
            "range": "213.62 … 411.57"
          },
          {
            "name": "[Transformer] Discord Voice Channel to a Voice Channel",
            "value": 264,
            "unit": "ns/iter",
            "range": "215.68 … 370.69"
          },
          {
            "name": "[Transformer] Discord Member to a Member",
            "value": 459,
            "unit": "ns/iter",
            "range": "386.4 … 623.24"
          },
          {
            "name": "[Transformer] Member to a Discord Member",
            "value": 602,
            "unit": "ns/iter",
            "range": "509.54 … 850.64"
          },
          {
            "name": "[Transformer] Discord Role to a Role",
            "value": 160,
            "unit": "ns/iter",
            "range": "130.56 … 204.4"
          },
          {
            "name": "[Transformer] Discord Message to a Message",
            "value": 526,
            "unit": "ns/iter",
            "range": "421.11 … 1347.55"
          },
          {
            "name": "[Cache Plugin] RSS",
            "value": 141.85,
            "unit": "MB",
            "range": "38.22 … 278.3"
          },
          {
            "name": "[Cache Plugin] Heap Used",
            "value": 265.38,
            "unit": "MB",
            "range": "263.09 … 269.08"
          },
          {
            "name": "[Cache Plugin] Heap Total",
            "value": 141.68,
            "unit": "MB",
            "range": "35.53 … 279.94"
          }
        ]
      }
    ]
  }
}