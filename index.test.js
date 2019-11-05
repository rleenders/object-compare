const { expect } = require('chai');
const compare = require('./index');

const obj1 = {
  str: 'string', obj: { key1: 1, key2: 'two', key3: false }, int: 5, float: 2.3, bool: true,
};
const obj2 = {
  str: 'string2', obj: { key1: 1, key2: 'two', key3: true }, int: 3, float: 2.1, bool: true,
};
const obj3 = {
  str: 5, obj: { key1: 1, key2: 'two', key3: true }, int: 3.1, float: { flobj: 2.3 }, bool: true,
};

const obj4 = { str: 'string', float: 2.3, bool: true };

describe('object comparison', () => {
  it('should return empty for identical objects', () => {
    const result = compare(obj1, obj1);
    expect(result).to.deep.equal([]);
  });
  it('should return a diff for all keys of a different type', () => {
    const result = compare(obj1, obj3);
    expect(result).to.deep.equal([
      {
        firstType: 'string',
        firstValue: 'string',
        path: 'str',
        secondType: 'number',
        secondValue: 5,
      },
      {
        firstType: 'number',
        firstValue: 2.3,
        path: 'float',
        secondType: 'object',
        secondValue: {
          flobj: 2.3,
        },
      },
    ]);
  });

  it('should return a diff for all keys present in the first object and missing in the second', () => {
    const result = compare(obj1, obj4);
    expect(result).to.deep.equal([
      {
        firstType: 'object',
        firstValue: {
          key1: 1,
          key2: 'two',
          key3: false,
        },
        path: 'obj',
        secondType: 'undefined',
        secondValue: undefined,
      },
      {
        firstType: 'number',
        firstValue: 5,
        path: 'int',
        secondType: 'undefined',
        secondValue: undefined,
      },
    ]);
  });
});

describe('object comparison compareValues=true', () => {
  it('should return empty for identical objects', () => {
    const result = compare(obj1, obj1, true);
    expect(result).to.deep.equal([]);
  });
  it('should return a list of different values between objects of the same structure', () => {
    const result = compare(obj1, obj2, true);
    expect(result).to.deep.equal([
      {
        firstType: 'string',
        firstValue: 'string',
        path: 'str',
        secondType: 'string',
        secondValue: 'string2',
      },
      {
        firstType: 'boolean',
        firstValue: false,
        path: 'obj.key3',
        secondType: 'boolean',
        secondValue: true,
      },
      {
        firstType: 'number',
        firstValue: 5,
        path: 'int',
        secondType: 'number',
        secondValue: 3,
      },
      {
        firstType: 'number',
        firstValue: 2.3,
        path: 'float',
        secondType: 'number',
        secondValue: 2.1,
      },
    ]);
  });
});

describe('object comparison compareValues=false', () => {
  it('should return empty for identical objects', () => {
    const result = compare(obj1, obj1, false);
    expect(result).to.deep.equal([]);
  });
  it('should return empty for objects of the same structure but different values if compareValues=false', () => {
    const result = compare(obj1, obj2, false);
    expect(result).to.deep.equal([]);
  });
});
