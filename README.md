# object-delta
does a deep compare of two javascript objects and returns an array of differences.
this function offers both structural compare, and value compare.
structural compare will only report differences in the objects structure, ie type missmatch, missing keys.
value compare also checks to see if the values for each key are equivalent.
this function was originally written to highly differences between i18n translation file json.

## usage:
```
const obj1 = {
  str: 'string', obj: { key1: 1, key2: 2, key3: false }, int: 5, float: 2.3,  bool: true,
};

const obj2 = {
  str: 'string', obj: { key1: "string", key2: 'two', key3: true }, int: 3, float: 2.1,
};

const compareValues = false;

objectDelta(obj1, obj2, compareValues);
```
produces
---------
```
[ { path: 'obj.key1',
    firstType: 'number',
    secondType: 'string',
    firstValue: 1,
    secondValue: 'string' },
  { path: 'obj.key2',
    firstType: 'number',
    secondType: 'string',
    firstValue: 2,
    secondValue: 'two' },
  { path: 'bool',
    firstType: 'boolean',
    secondType: 'undefined',
    firstValue: true,
    secondValue: undefined } ]
```
