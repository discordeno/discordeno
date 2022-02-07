import { build } from "https://deno.land/x/dnt@0.17.0/mod.ts";

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
        ],
      },
    ],
  },
  entryPoints: [
    "./mod.ts",
    {
      name: "./rest",
      path: "src/rest/mod.ts",
    },
    {
      name: "./gateway",
      path: "src/gateway/mod.ts",
    },
    {
      name: "./types",
      path: "src/types/mod.ts",
    },
    {
      name: "./plugins",
      path: "src/plugins/mod.ts",
    },
    {
      name: "./cache-plugin",
      path: "src/plugins/cache/mod.ts",
    },
    {
      name: "./fileloader-plugin",
      path: "src/plugins/fileloader/mod.ts",
    },
    {
      name: "./helpers-plugin",
      path: "src/plugins/helpers/mod.ts",
    },
    {
      name: "./permissions-plugin",
      path: "src/plugins/permissions/mod.ts",
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
    homepage: "https://github.com/discordeno/discordeno#readme",
  },
  compilerOptions: { target: "ES2020" },
});

// post build steps
Deno.copyFileSync("LICENSE", "npm/LICENSE");
Deno.copyFileSync("README.md", "npm/README.md");
