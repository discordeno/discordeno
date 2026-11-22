import { expect } from 'chai';
import { afterEach, beforeEach, describe, it } from 'mocha';
import sinon from 'sinon';
import { Collection } from '../src/Collection.js';

describe('collection.ts', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('Collection class', () => {
    let collection: Collection<any, any>;

    beforeEach(() => {
      collection = new Collection([
        ['best', 'tri'],
        ['proficient', 'yui'],
      ]);
    });

    describe('.array() method', () => {
      it('will return values as array', () => {
        expect(collection.array()).to.be.deep.equal(['tri', 'yui']);
      });
    });

    describe('.random() method', () => {
      it('will get a random value', () => {
        expect(collection.random() ?? '').to.be.oneOf(['tri', 'yui']);
        expect(new Collection().random()).to.be.undefined;
      });
    });

    describe('.set() method', () => {
      describe('without maxSize', () => {
        it('will set a value', () => {
          collection.set('best developer', 'triformine');

          expect(collection.size).to.be.equal(3);
          expect(collection.get('best developer')).to.be.equal('triformine');
        });
      });

      describe('with maxSize', () => {
        const maxSize = 2;

        beforeEach(() => {
          collection = new Collection([], {
            maxSize,
          });
        });

        it('will set a value when not over max size', () => {
          collection.set('foo', 'bar');
          collection.set('me', 'you');

          expect(collection.size).to.be.equal(2);
        });

        it('will not set a value when over max size', () => {
          collection.set('foo', 'bar');
          collection.set('me', 'you');
          expect(collection.size).to.be.equal(2);

          collection.set('this', 'not');
          expect(collection.size).to.be.equal(2);
        });

        it('will update an existing key when at max size', () => {
          collection.set('foo', 'bar');
          collection.set('me', 'you');
          expect(collection.size).to.be.equal(2);

          collection.set('foo', 'baz');
          expect(collection.size).to.be.equal(2);
          expect(collection.get('foo')).to.be.equal('baz');
        });
      });
    });

    describe('.forceSet() method', () => {
      const maxSize = 2;

      beforeEach(() => {
        collection = new Collection(
          [
            ['foo', 'bar'],
            ['me', 'you'],
          ],
          { maxSize },
        );
      });

      it('will ignore maxSize and set a value ', () => {
        collection.forceSet('this', 'not');

        expect(collection.size).to.be.equal(3);
      });
    });

    describe('.first() method', () => {
      it('will get the value of the first element', () => {
        expect(collection.first()).to.be.equal('tri');
      });
    });

    describe('.last() method', () => {
      it('get the value of the last element', () => {
        expect(collection.last()).to.be.equal('yui');
      });
    });

    const testCollection = new Collection([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);

    describe('.find() method', () => {
      it('will find value by value', () => {
        expect(collection.find((v) => v === 'tri')).to.be.equal('tri');
        expect(collection.find((v) => v === 'skillz')).to.be.undefined;
      });

      it('will find value by key', () => {
        expect(collection.find((_v, k) => k === 'proficient')).to.be.equal('yui');
        expect(collection.find((_v, k) => k === 'skillz')).to.be.undefined;
      });
    });

    describe('.filter() method', () => {
      it('will filter by key', () => {
        expect(collection.filter((v) => v === 'yui').array()).to.deep.equal(['yui']);
        expect(collection.filter((v) => v === 'skillz').array()).to.deep.equal([]);
      });
      it('will filter by key', () => {
        expect(collection.filter((_v, k) => k === 'best').array()).to.deep.equal(['tri']);
        expect(collection.filter((_v, k) => k === 'skillz').array()).to.deep.equal([]);
      });
    });

    it('map', () => {
      expect(testCollection.map((k, v) => `${v}${k}`)).to.be.deep.equal(['a1', 'b2', 'c3']);
    });

    it('some', () => {
      expect(testCollection.some((v, _) => v === 1)).to.be.equal(true);
      expect(testCollection.some((v, _) => v === 4)).to.be.equal(false);
    });

    it('every', () => {
      expect(testCollection.every((v, _) => v !== 0)).to.be.equal(true);
      expect(testCollection.every((v, _) => v === 1)).to.be.equal(false);
    });

    it('reduce', () => {
      expect(testCollection.reduce((acc, val) => acc + val, 0)).to.be.equal(6);
    });

    describe('sweeper', () => {
      let clock: sinon.SinonFakeTimers;

      beforeEach(() => {
        clock = sinon.useFakeTimers();
      });

      afterEach(() => {
        clock.restore();
      });

      it('start sweeper', async () => {
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
        );

        try {
          await clock.tickAsync(49);
          expect(sweeperCollection.size).to.be.equal(2);
          await clock.tickAsync(1);
          expect(sweeperCollection.size).to.be.equal(1);
        } catch (err) {
          sweeperCollection.stopSweeper();

          throw err;
        }

        sweeperCollection.stopSweeper();
      });

      it('will not keep a timer alive when two collections share one sweeper options object', async () => {
        const options = { filter: () => true, interval: 50 };
        const first = new Collection([['a', 1]]);
        const second = new Collection([['b', 2]]);

        first.startSweeper(options);
        second.startSweeper(options);
        first.stopSweeper();
        second.stopSweeper();

        await clock.tickAsync(100);

        expect(first.size).to.be.equal(1);
        expect(second.size).to.be.equal(1);
      });

      describe('.changeSweeperInterval() method', () => {
        it('will call startSweeper with new interval', () => {
          collection.startSweeper({ filter: () => false, interval: 1000 });
          collection.changeSweeperInterval(20000);
          expect(collection.sweeper?.interval).to.equal(20000);
        });

        it('will keep passing the bot to the filter', async () => {
          const bot = {};
          let observed: unknown = 'filter was never called';

          collection.startSweeper({
            bot,
            filter: (_value, _key, sweeperBot) => {
              observed = sweeperBot;
              return false;
            },
            interval: 1000,
          });
          collection.changeSweeperInterval(50);
          await clock.tickAsync(50);
          collection.stopSweeper();

          expect(observed).to.be.equal(bot);
        });

        it('will not startsweeper if not started', () => {
          collection.changeSweeperInterval(20000);
          expect(collection.sweeper).to.undefined;
        });
      });

      describe('.changeSweeperFilter() method', () => {
        it('will call startSweeper with new interval', () => {
          const newFilter = () => true;
          collection.startSweeper({ filter: () => false, interval: 1000 });
          collection.changeSweeperFilter(newFilter);
          expect(collection.sweeper?.filter).to.equal(newFilter);
        });

        it('will keep passing the bot to the new filter', async () => {
          const bot = {};
          let observed: unknown = 'filter was never called';

          collection.startSweeper({ bot, filter: () => false, interval: 50 });
          collection.changeSweeperFilter((_value, _key, sweeperBot) => {
            observed = sweeperBot;
            return false;
          });
          await clock.tickAsync(50);
          collection.stopSweeper();

          expect(observed).to.be.equal(bot);
        });

        it('will not startsweeper if not started', () => {
          const newFilter = () => true;
          collection.changeSweeperFilter(newFilter);
          expect(collection.sweeper).to.undefined;
        });
      });
    });
  });
});
