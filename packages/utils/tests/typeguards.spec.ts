import { expect } from 'chai'
import { describe, it } from 'mocha'
import { isGetMessagesAfter, isGetMessagesAround, isGetMessagesBefore, isGetMessagesLimit } from '../src/typeguards.js'

describe('typeguard.ts', () => {
  describe('isGetMessagesAfter function', () => {
    it('will return true if has after', () => {
      expect(
        isGetMessagesAfter({
          after: '684146387468463',
        }),
      ).equal(true)
    })

    it("will return false if don't has after", () => {
      expect(isGetMessagesAfter({})).equal(false)
    })
  })

  describe('isGetMessagesBefore function', () => {
    it('will return true if has after', () => {
      expect(
        isGetMessagesBefore({
          before: '684146387468463',
        }),
      ).equal(true)
    })

    it("will return false if don't has after", () => {
      expect(isGetMessagesBefore({})).equal(false)
    })
  })

  describe('isGetMessagesAround function', () => {
    it('will return true if has after', () => {
      expect(
        isGetMessagesAround({
          around: '684146387468463',
        }),
      ).equal(true)
    })

    it("will return false if don't has after", () => {
      expect(isGetMessagesAround({})).equal(false)
    })
  })

  describe('isGetMessagesAfter function', () => {
    it('will return true if has after', () => {
      expect(
        isGetMessagesLimit({
          limit: 54,
        }),
      ).equal(true)
    })

    it("will return false if don't has after", () => {
      expect(isGetMessagesLimit({})).equal(false)
    })
  })
})
