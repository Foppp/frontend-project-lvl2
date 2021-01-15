import _ from 'lodash';

const normalize = (value) => {
  if (_.isString(value)) {
    return `'${value}'`;
  }
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return value;
};

const makePath = (acc, property) => [...acc, property].join('.');

const mapping = {
  removed: (element, currentPath) => `Property '${makePath(currentPath, element.name)}' was ${element.status}`,
  added: (element, currentPath) => `Property '${makePath(currentPath, element.name)}' was ${element.status} with value: ${normalize(element.value)}`,
  updated: (element, currentPath) => `Property '${makePath(currentPath, element.name)}' was ${element.status}. From ${normalize(element.value)} to ${normalize(element.newValue)}`,
  unchanged: () => [],
  nested: (element, currentPath, iter) => iter(element.children, [...currentPath, element.name]),
};

export default (tree) => {
  const iter = (astTree, currentPath) => {
    const result = astTree
      .flatMap((astElement) => mapping[astElement.status](astElement, currentPath, iter));
    return result.join('\n');
  };
  return iter(tree, []);
};
