import { expect } from 'chai'
import { describe, it } from 'mocha'
import * as colors from '../src/colors.js'

const arrayOfColors = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white']

describe('Colors', () => {
  it(`Color functions will return colored word`, () => {
    for (const [index, color] of arrayOfColors.entries()) {
      const value = (colors[color as keyof typeof colors] as typeof colors.black)('testWord')
      expect(value).equals(`\x1B[${30 + index}mtestWord\x1B[39m`)

      const brightName = `bright${color.slice(0, 1).toUpperCase()}${color.slice(1)}`
      const brightValue = (colors[brightName as keyof typeof colors] as typeof colors.black)('testWord')
      expect(brightValue).to.equal(`\x1B[${90 + index}mtestWord\x1B[39m`)

      const bgName = `bg${color.slice(0, 1).toUpperCase()}${color.slice(1)}`
      const bgValue = (colors[bgName as keyof typeof colors] as typeof colors.black)('testWord')
      expect(bgValue).to.equal(`\x1B[${40 + index}mtestWord\x1B[49m`, `Color ${color} has failed .`)

      const bgBrightName = `bgBright${color.slice(0, 1).toUpperCase()}${color.slice(1)}`
      const bgBrightValue = (colors[bgBrightName as keyof typeof colors] as typeof colors.black)('testWord')
      expect(bgBrightValue).to.equal(`\x1B[${100 + index}mtestWord\x1B[49m`)
    }
  })

  it('Will return grey colored word', () => {
    expect(colors.gray('testWord')).to.equal(`\x1B[${90}mtestWord\x1B[39m`)
  })

  it('Set and get colors enabled value', () => {
    expect(colors.getColorEnabled()).to.equal(true)
    colors.setColorEnabled(false)
    expect(colors.getColorEnabled()).to.equal(false)
    colors.setColorEnabled(true)
    expect(colors.getColorEnabled()).to.equal(true)
  })
})
