const assert = require('assert')
const ancientToModern = require('../app')

describe('ancientToModern', function () {
  it('Трансформирует координаты в понятный вид', function () {
    assert.deepEqual(ancientToModern(1), [0, 1])

    assert.deepEqual(ancientToModern(8), [1, -1])

    assert.deepEqual(ancientToModern(15), [-1, 2])

    assert.deepEqual(ancientToModern(25), [2, -2])

    assert.deepEqual(ancientToModern(35), [-2, 2])

    assert.deepEqual(ancientToModern(36), [-2, 3])

    assert.deepEqual(ancientToModern(77), [4, 4])
  })
})