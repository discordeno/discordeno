import { suite } from './benchmarkSuite.js'

import './benchmarks/casting.js'

suite
  .on('cycle', function (event: any) {
    console.log(String(event.target))
  })
  .run()
