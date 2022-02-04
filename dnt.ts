import { build } from "https://deno.land/x/dnt@0.7.3/mod.ts";

await Deno.remove("npm", { recursive: true }).catch((_) => {});

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  typeCheck: false,
  declaration: true,
  test: false,
  package: {
    name: "discordeno",
    version: Deno.args[0],
  },
  compilerOptions: { target: "ES2020" },
});

// post build steps
Deno.copyFileSync("LICENSE", "npm/LICENSE");
Deno.copyFileSync("README.md", "npm/README.md");
