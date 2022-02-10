// @ts-check
const assert = require('assert');
const reverse = require ('../reverse.js');

/**
 * very quick a dirty tests
 */
describe('reverse', function() {
    describe('resolve', function() {
        it('should resolve a list of IP', function() {
              const toResolve = ['8.8.8.8', '10.0.0.0'];
              const expected = ['10.0.0.1', ''];
              const result = reverse.resolve(toResolve).then(() =>
                assert.equal(result.toString(), expected.toString()));
          });
      });
    describe('filterIP', function() {
      it('should filter out unvalid IP and keep the good one', function() {
            const toFilter = ['qdsf', '10.0.0.1'];
            const expected = ['10.0.0.1'];
            const result = reverse.filterIP(toFilter);
            assert.equal(result.toString(), expected.toString());
        });
    });
    describe('unique', function() {
        it('should remove duplicates', function() {
              const toFilter = ['10.0.0.1', '10.0.0.1', '10.0.0.2'];
              const expected = ['10.0.0.1', '10.0.0.2'];
              const result = reverse.unique(toFilter);
              assert.equal(result.toString(), expected.toString());
          });
      });
});

  