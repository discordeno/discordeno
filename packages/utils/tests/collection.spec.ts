import { expect } from 'chai'
import { beforeEach, describe, it } from 'mocha'
import sinon from 'sinon'
import { Collection } from '../src/Collection'

describe('collection.ts', () => {
  let collection: Collection<any, any>

  beforeEach(() => {
    collection = new Collection()
  })

  it('[collection] collection values to array', () => {
    const testCollection = new Collection([
      ['best', 'tri'],
      ['proficient', 'yui'],
    ])
    expect(testCollection.array()).to.be.deep.equal(['tri', 'yui'])
  })

  it('[collection] get a random value', () => {
    const testCollection = new Collection([['best', 'tri']])

    expect(testCollection.random() ?? '').to.be.oneOf(['best', 'tri'])
    expect(collection.random()).to.be.undefined
  })

  describe('', () => {
    beforeEach(() => {
      collection.set('best developer', 'triformine')
    })
    it('[collection] Set a value without maxSize', () => {
      expect(collection.size).to.be.equal(1)
      expect(collection.get('best developer')).to.be.equal('triformine')
    })
    describe('', () => {
      beforeEach(() => {
        collection.set('deno', 'yes')
      })
      it('[collection] get the value of the first element', () => {
        expect(collection.first()).to.be.equal('triformine')
      })

      it('[collection] get the value of the last element', () => {
        expect(collection.last()).to.be.equal('yes')
      })
    })
  })

  describe('[collection] Create a collection with maxSize', () => {
    const maxSize = 2

    const maxCollection = new Collection([], {
      maxSize,
    })

    expect(maxCollection).to.exist
    expect(maxCollection.maxSize).to.exist
    expect(maxCollection.maxSize).to.be.equal(maxSize)

    describe('[collection] Test if maxSize works properly', () => {
      maxCollection.set('foo', 'bar')
      maxCollection.set('me', 'you')

      expect(maxCollection.size).to.be.equal(2)

      maxCollection.set('this', 'not')

      expect(maxCollection.size).to.be.equal(2)

      it('[collection] Test if forceSet ignore maxSize', () => {
        maxCollection.forceSet('this', 'not')

        expect(maxCollection.size).to.be.equal(3)
      })
    })
  })

  const testCollection = new Collection([
    ['a', 1],
    ['b', 2],
    ['c', 3],
  ])

  it('[collection] find by key or value', () => {
    expect(testCollection.find((v, k) => v === 2)).to.be.equal(2)
    expect(testCollection.find((v, k) => k === 'b')).to.be.equal(2)
  })

  it('[collection] filter by key or value', () => {
    expect(testCollection.filter((v, k) => v === 3).size).to.be.equal(1)
    expect(testCollection.filter((v, k) => k === 'd').size).to.be.equal(0)
  })

  it('[collection] map', () => {
    expect(testCollection.map((k, v) => `${v}${k}`)).to.be.deep.equal(['a1', 'b2', 'c3'])
  })

  it('[collection] some', () => {
    expect(testCollection.some((v, _) => v === 1)).to.be.equal(true)
    expect(testCollection.some((v, _) => v === 4)).to.be.equal(false)
  })

  it('[collection] every', () => {
    expect(testCollection.every((v, _) => v !== 0)).to.be.equal(true)
    expect(testCollection.every((v, _) => v === 1)).to.be.equal(false)
  })

  it('[collection] reduce', () => {
    expect(testCollection.reduce((acc, val) => acc + val, 0)).to.be.equal(6)
  })

  it('[collection] start sweeper', async () => {
    const clock = sinon.useFakeTimers()
    const sweeperCollection = new Collection(
      [
        ['a', 1],
        ['b', 2],
      ],
      {
        sweeper: {
          filter: (v, _) => v === 1,
          interval: 50,
        },
      },
    )

    try {
      await clock.tickAsync(49)
      expect(sweeperCollection.size).to.be.equal(2)
      await clock.tickAsync(1)
      expect(sweeperCollection.size).to.be.equal(1)
    } catch (err) {
      sweeperCollection.stopSweeper()

      throw err
    }

    sweeperCollection.stopSweeper()
    clock.restore()
  })
})
