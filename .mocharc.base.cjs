// This needs to be a different file as this is used for Deno and Bun

module.exports = {
  recursive: true,
  timeout: 2000,
  'watch-extensions': 'ts',
  'watch-files': ['src', 'tests'],
  parallel: false,
}
