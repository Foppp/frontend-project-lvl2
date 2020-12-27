import _ from 'lodash';

const formatTree = (tree, propPath = []) => {
  const filterRemoved = tree.filter((el) => el.status !== 'removed');
  const result = filterRemoved.reduce((acc, element) => {
    const { name, value, status } = element;
    const propAcc = [...propPath, name];
    if (!_.isObject(...value)) {
      return _.set(acc, propAcc, ...value);
    }
    const nestedValue = status === 'nested' ? element.children : value;
    const updatedValue = status === 'updated' ? element.newValue : nestedValue;
    return _.merge(acc, formatTree(updatedValue, propAcc));
  }, {});
  return result;
};

const formatJson = (tree) => JSON.stringify(formatTree(tree), null, '    ');

export default formatJson;
