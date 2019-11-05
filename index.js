
const genDiff = (path, first, second) => ({
  path, firstType: typeof first, secondType: typeof second, firstValue: first, secondValue: second,
});

const compareObjects = (first, second, compareValues = false) => {
  const diffList = [];
  const checkKeys = (firstObj, secondObj, path = '') => Object.keys(firstObj).map((key) => {
    const join = path === '' ? '' : '.';
    const newPath = `${path}${join}${key}`;
    const firstType = typeof firstObj[key];
    if (key in secondObj) {
      const secondType = typeof secondObj[key];
      if (firstType === secondType) {
        if (firstType === 'object') {
          checkKeys(firstObj[key], secondObj[key], newPath);
        } else if (compareValues && firstObj[key] !== secondObj[key]) {
          diffList.push(genDiff(newPath, firstObj[key], secondObj[key]));
        }
      } else {
        diffList.push(genDiff(newPath, firstObj[key], secondObj[key]));
      }
    } else {
      diffList.push(genDiff(newPath, firstObj[key], secondObj[key]));
    }
    return true;
  });
  checkKeys(first, second);
  return diffList;
};
module.exports = compareObjects;
