import _ from 'lodash';

const normalize = (value) => {
  const strValue = _.isString(value) ? `'${value}'` : value;
  return _.isObject(value) ? '[complex value]' : strValue;
};

const mapping = {
  removed: (element, propPath) => `Property '${propPath.join('.')}' was ${element.status}`,
  added: (element, propPath) => `Property '${propPath.join('.')}' was ${element.status} with value: ${normalize(element.value)}`,
  updated: (element, propPath) => `Property '${propPath.join('.')}' was ${element.status}. From ${normalize(element.value)} to ${normalize(element.newValue)}`,
  unchanged: () => [],
  nested: (element, propPath, iter) => iter(element.children, propPath),
};

export default (tree) => {
  const iter = (astTree, propPath) => {
    const result = astTree
      .flatMap((astElement) => {
        const { name, status } = astElement;
        const propPathAcc = [...propPath, name];
        return mapping[status](astElement, propPathAcc, iter);
      });
    return result.join('\n');
  };
  return iter(tree, []);
};
