import fs from 'node:fs'
import { argv } from 'node:process'

fs.writeFileSync('./coverage/lcov.info', fs.readFileSync('./coverage/lcov.info', 'utf-8').replace(/SF:src/g, `SF:packages/${argv[2]}/src`))
