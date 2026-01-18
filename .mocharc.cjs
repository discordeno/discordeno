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
  mochaConfig.require = ['ts-node/register'];

  // Node options
  mochaConfig.loader = ['ts-node/esm'];
  // Node will output a ExperimentalWarning about --loader (--experimental-loader) and a DeprecationWarning because ts-node uses fs.Stat
  mochaConfig['no-warnings'] = true;
  mochaConfig['enable-source-maps'] = true;
}

module.exports = mochaConfig;
