import _ from 'lodash';

const formatTree = (tree) => {
  const iter = (elements, propPath, acc) => {
    const filterRemoved = elements.filter((el) => el.status !== 'removed');
    filterRemoved.forEach((element) => {
      const { name, value, status } = element;
      const propAcc = [...propPath, name];
      if (!_.isObject(...value)) {
        return _.set(acc, propAcc, ...value);
      }
      const nestedValue = status === 'nested' ? element.children : value;
      const updatedValue = status === 'updated' ? element.newValue : nestedValue;
      return _.merge(acc, iter(updatedValue, propAcc, acc));
    }, {});
    return acc;
  };
  return iter(tree, [], {});
};

const formatJson = (tree) => JSON.stringify(formatTree(tree), null, '    ');

export default formatJson;
