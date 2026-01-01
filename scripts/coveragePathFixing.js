import { readFileSync, writeFileSync } from 'node:fs'

writeFileSync('./coverage/lcov.info', readFileSync('./coverage/lcov.info', 'utf-8').replace(/SF:src/g, `SF:packages/${process.argv[2]}/src`))
