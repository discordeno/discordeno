module.exports = {
  ...require('./.mocharc.base.cjs'),
  require: 'ts-node/register',
  loader: 'ts-node/esm',
  'enable-source-maps': true,
}
