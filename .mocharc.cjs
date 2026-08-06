// @ts-check

// If we are running in Bun or Deno, they have native TypeScript support with .js imports, node requires .ts imports
const supportsTypescript = 'Bun' in globalThis || 'Deno' in globalThis;

/** @type {import("mocha").MochaInstanceOptions & Record<string, unknown>} */
const mochaConfig = {
  timeout: 2000,
  'watch-extensions': 'ts',
  'watch-files': ['src', 'tests'],
};

if (!supportsTypescript) {
  // --import=tsx
  mochaConfig.import = ['tsx'];
}

module.exports = mochaConfig;
