import { expect } from 'chai'
import { describe, it } from 'mocha'
import * as colors from '../src/colors.js'

const arrayOfColors = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white']

describe('color.ts', () => {
  arrayOfColors.forEach((color, index) => {
    describe(`${color} function`, () => {
      it('will return colored word', () => {
        expect((colors[color as keyof typeof colors] as typeof colors.black)('testWord')).to.equal(`\x1B[${30 + index}mtestWord\x1B[39m`)
      })
    })
  })

  describe(`grey function`, () => {
    it('will return colored word', () => {
      expect(colors.gray('testWord')).to.equal(`\x1B[${90}mtestWord\x1B[39m`)
    })
  })
  arrayOfColors
    .map((color) => `bright${color.slice(0, 1).toUpperCase()}${color.slice(1)}`)
    .forEach((color, index) => {
      describe(`${color} function`, () => {
        it('will return colored word', () => {
          expect((colors[color as keyof typeof colors] as typeof colors.brightBlack)('testWord')).to.equal(`\x1B[${90 + index}mtestWord\x1B[39m`)
        })
      })
    })

  arrayOfColors
    .map((color) => `bg${color.slice(0, 1).toUpperCase()}${color.slice(1)}`)
    .forEach((color, index) => {
      describe(`${color} function`, () => {
        it('will return colored word', () => {
          expect((colors[color as keyof typeof colors] as typeof colors.bgBlack)('testWord')).to.equal(`\x1B[${40 + index}mtestWord\x1B[49m`)
        })
      })
    })

  arrayOfColors
    .map((color) => `bgBright${color.slice(0, 1).toUpperCase()}${color.slice(1)}`)
    .forEach((color, index) => {
      describe(`${color} function`, () => {
        it('will return colored word', () => {
          expect((colors[color as keyof typeof colors] as typeof colors.bgBlack)('testWord')).to.equal(`\x1B[${100 + index}mtestWord\x1B[49m`)
        })
      })
    })
})
