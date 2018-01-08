const assert = require('assert');
const temps = require('./src/index.js');

it('temps should return correct time needed to travel dTot', () => {
    assert.equal(temps(30, 5, 30), 114);
    assert.equal(temps(30, 20, 30), -1);
    assert.equal(temps(30, 8, 20), 110);
    assert.equal(temps(30, 0, 5), 9);
    assert.equal(temps(50, 10, 25), 185);
});
