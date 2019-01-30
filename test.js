const start = require('');


function sum(a, b) {
    return a + b;
  }

test('start function retrieves an array', () => {
    expect(sum(1, 2)).toBe(3);
});

