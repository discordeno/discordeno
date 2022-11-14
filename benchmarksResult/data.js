window.BENCHMARK_DATA = {
  "lastUpdate": 1668452195506,
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
      }
    ]
  }
}