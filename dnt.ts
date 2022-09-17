import { build } from "https://deno.land/x/dnt@0.30.0/mod.ts";

await Deno.remove("npm", { recursive: true }).catch((_) => {});

await build({
  shims: {
    deno: true,
    timers: true,
    blob: true,
    undici: true,
    custom: [
      {
        package: {
          name: "ws",
          version: "^8.4.0",
        },
        globalNames: [
          {
            name: "WebSocket",
            exportName: "default",
          },
          { name: "CloseEvent", typeOnly: true },
          { name: "MessageEvent", typeOnly: true },
        ],
      },
    ],
  },
  entryPoints: [
    "./mod.ts",
    {
      name: "./rest",
      path: "rest/mod.ts",
    },
    {
      name: "./gateway",
      path: "gateway/mod.ts",
    },
    {
      name: "./types",
      path: "types/mod.ts",
    },
    {
      name: "./transformers",
      path: "transformers/mod.ts",
    },
    {
      name: "./packages",
      path: "packages/mod.ts",
    },
    {
      name: "./logger",
      path: "packages/logger/mod.ts",
    },
    {
      name: "./embeds",
      path: "packages/embeds/mod.ts",
    },
    {
      name: "./plugins",
      path: "plugins/mod.ts",
    },
    {
      name: "./cache-plugin",
      path: "plugins/cache/mod.ts",
    },
    {
      name: "./fileloader-plugin",
      path: "plugins/fileloader/mod.ts",
    },
    {
      name: "./helpers-plugin",
      path: "plugins/helpers/mod.ts",
    },
    {
      name: "./permissions-plugin",
      path: "plugins/permissions/mod.ts",
    },
  ],
  outDir: "./npm",
  typeCheck: false,
  declaration: true,
  test: false,
  package: {
    name: "discordeno",
    version: Deno.args[0],
    description: "Discordeno is simplistic, easy-to-use, versatile while being efficient and lightweight.",
    keywords: [
      "javascript",
      "api",
      "library",
      "typescript",
      "discord",
      "discord-bot",
      "discord-api",
      "deno",
      "discordeno",
    ],
    author: "Skillz4Killz",
    license: "Apache License 2.0",
    bugs: {
      url: "https://github.com/discordeno/discordeno/issues",
    },
    homepage: "https://discordeno.mod.land",
    repository: {
      type: "git",
      url: "https://github.com/discordeno/discordeno",
    },
    typesVersions: {
      "*": {
        "*": [
          "./types/mod.d.ts",
        ],
        "rest": [
          "./types/rest/mod.d.ts",
        ],
        "gateway": [
          "./types/gateway/mod.d.ts",
        ],
        "types": [
          "./types/types/mod.d.ts",
        ],
        "transformers": [
          "./types/transformers/mod.d.ts",
        ],
        "packages": [
          "./types/packages/mod.d.ts",
        ],
        "logger": [
          "./types/packages/logger/mod.d.ts",
        ],
        "embeds": [
          "./types/packages/embeds/mod.d.ts",
        ],
        "plugins": [
          "./types/plugins/mod.d.ts",
        ],
        "cache-plugin": [
          "./types/plugins/cache/mod.d.ts",
        ],
        "fileloader-plugin": [
          "./types/plugins/fileloader/mod.d.ts",
        ],
        "helpers-plugin": [
          "./types/plugins/helpers/mod.d.ts",
        ],
        "permissions-plugin": [
          "./types/plugins/permissions/mod.d.ts",
        ],
      },
    },
  },
  compilerOptions: { target: "ES2020" },
});

// post build steps
Deno.copyFileSync("LICENSE", "npm/LICENSE");
Deno.copyFileSync("README.md", "npm/README.md");
