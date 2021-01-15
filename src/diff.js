import _ from 'lodash';

const makeDiff = (data1, data2) => {
  const uniqKeys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(uniqKeys);
  return sortedKeys.map((key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      const children = makeDiff(data1[key], data2[key]);
      return {
        name: key, value: data1[key], status: 'nested', children,
      };
    }
    if (!_.has(data2, key)) {
      return { name: key, value: data1[key], status: 'removed' };
    }
    if (!_.has(data1, key)) {
      return { name: key, value: data2[key], status: 'added' };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        name: key,
        value: data1[key],
        status: 'updated',
        newValue: data2[key],
      };
    }
    return { name: key, value: data1[key], status: 'unchanged' };
  });
};

export default makeDiff;
