import _ from 'lodash';

const formatTree = (tree) => {
  const iter = (elements, propPath) => {
    const filterRemoved = elements.filter((el) => el.status !== 'removed');
    const result = filterRemoved
      .reduce((acc, element) => {
        const { name, value, status } = element;
        const propAcc = [...propPath, name];
        if (!_.isObject(...value)) {
          return _.set(acc, propAcc, ...value);
        }
        const nestedValue = status === 'nested' ? element.children : value;
        const updatedValue = status === 'updated' ? element.newValue : nestedValue;
        return _.merge(acc, iter(updatedValue, propAcc));
      }, {});
    return result;
  };
  return iter(tree, []);
};

const formatJson = (tree) => JSON.stringify(formatTree(tree), null, '    ');

export default formatJson;
