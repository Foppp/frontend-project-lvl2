import _ from 'lodash';

const makeDiff = (file1, file2) => {
  const uniqKeys = _.union(Object.keys(file1), Object.keys(file2));
  const sortedKeys = _.sortBy(uniqKeys);
  const astTree = sortedKeys.map((element) => {
    const value1 = file1[element];
    const value2 = file2[element];
    const valueObjects = _.isObject(value1) && _.isObject(value2);
    if (value1 === value2 || valueObjects) {
      const children = valueObjects ? makeDiff(value1, value2) : [];
      return {
        name: element, value: value1, status: 'unchanged', children,
      };
    }
    if (!_.has(file2, element)) {
      return { name: element, value: value1, status: 'removed' };
    }
    if (!_.has(file1, element)) {
      return { name: element, value: value2, status: 'added' };
    }
    return {
      name: element, value: value1, status: 'updated', newValue: value2,
    };
  });
  return astTree;
};

export default makeDiff;
