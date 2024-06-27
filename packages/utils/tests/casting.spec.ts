import { expect } from 'chai'
import { describe, it } from 'mocha'
import { camelize, snakeToCamelCase, snakelize } from '../src/casing.js'

describe('casting.ts', () => {
  describe('camelize function', () => {
    it('will convert snake case object to camel case object', () => {
      expect(
        camelize({
          test_ax_by_cz: 'dummy_dx_ey_fz',
          testgxhyiz: 'dummyjxkylz',
          32: 'adw_dw',
        }),
      ).to.deep.equal({
        testAxByCz: 'dummy_dx_ey_fz',
        testgxhyiz: 'dummyjxkylz',
        32: 'adw_dw',
      })
    })

    it('will convert array of snake case object to camel case object', () => {
      expect(
        camelize([
          {
            test_ax_by_cz: 'dummy_dx_ey_fz',
          },
          {
            test_gx_hy_iz: 'dummy_jx_ky_lz',
          },
        ]),
      ).to.deep.equal([
        {
          testAxByCz: 'dummy_dx_ey_fz',
        },
        {
          testGxHyIz: 'dummy_jx_ky_lz',
        },
      ])
    })

    describe('snakeToCamelCase function', () => {
      it('will convert string snake case to camel case', () => {
        expect(snakeToCamelCase('sd_sd')).to.equal('sdSd')
      })
    })
  })

  describe('snakelize function', () => {
    it('will convert snake case object to camel case object', () => {
      expect(
        snakelize({
          testAxByCz: 'dummy_dx_ey_fz',
          testgxhyiz: 'dummyjxkylz',
          32: 'adw_dw',
        }),
      ).to.deep.equal({
        test_ax_by_cz: 'dummy_dx_ey_fz',
        testgxhyiz: 'dummyjxkylz',
        32: 'adw_dw',
      })
    })

    it('will convert array of snake case object to camel case object', () => {
      expect(
        snakelize([
          {
            testAxByCz: 'dummy_dx_ey_fz',
          },
          {
            testGxHyIz: 'dummy_jx_ky_lz',
          },
        ]),
      ).to.deep.equal([
        {
          test_ax_by_cz: 'dummy_dx_ey_fz',
        },
        {
          test_gx_hy_iz: 'dummy_jx_ky_lz',
        },
      ])
    })

    describe('snakeToCamelCase function', () => {
      it('will convert string snake case to camel case', () => {
        expect(snakeToCamelCase('sd_sd')).to.equal('sdSd')
      })
    })
  })
})
