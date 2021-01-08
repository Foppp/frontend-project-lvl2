import _ from 'lodash';

const makeDiff = (fileContent1, fileContent2) => {
  const uniqKeys = _.union(Object.keys(fileContent1), Object.keys(fileContent2));
  const sortedKeys = _.sortBy(uniqKeys);
  return sortedKeys.map((element) => {
    if (_.isObject(fileContent1[element]) && _.isObject(fileContent2[element])) {
      const children = makeDiff(fileContent1[element], fileContent2[element]);
      return {
        name: element, value: fileContent1[element], status: 'nested', children,
      };
    }
    if (!_.has(fileContent2, element)) {
      return { name: element, value: fileContent1[element], status: 'removed' };
    }
    if (!_.has(fileContent1, element)) {
      return { name: element, value: fileContent2[element], status: 'added' };
    }
    if (fileContent1[element] !== fileContent2[element]) {
      return {
        name: element,
        value: fileContent1[element],
        status: 'updated',
        newValue: fileContent2[element],
      };
    }
    return { name: element, value: fileContent1[element], status: 'unchanged' };
  });
};

export default makeDiff;
