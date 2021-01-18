import _ from 'lodash';

const makeIndent = (depth) => '  '.repeat(depth * 2);

const stringifyValue = (obj, depth) => {
  if (!_.isPlainObject(obj)) {
    return obj;
  }
  const stringifiedElements = Object.entries(obj)
    .map(([key, val]) => `${makeIndent(depth + 1)}    ${key}: ${stringifyValue(val, depth + 1)}`);
  return `{\n${stringifiedElements.join('\n')}\n${makeIndent(depth + 1)}}`;
};

const mapping = {
  unchanged: (element, depth) => `${makeIndent(depth)}    ${element.name}: ${stringifyValue(element.value, depth)}`,
  removed: (element, depth) => `${makeIndent(depth)}  - ${element.name}: ${stringifyValue(element.value, depth)}`,
  added: (element, depth) => `${makeIndent(depth)}  + ${element.name}: ${stringifyValue(element.value, depth)}`,
  nested: (element, depth, iter) => `${makeIndent(depth)}    ${element.name}: ${iter(element.children, depth + 1)}`,
  updated: (element, depth) => [
    `${makeIndent(depth)}  - ${element.name}: ${stringifyValue(element.value, depth)}`,
    `${makeIndent(depth)}  + ${element.name}: ${stringifyValue(element.newValue, depth)}`,
  ],
};

const stylish = (tree) => {
  const iter = (astTree, depth) => {
    const stringifiedElements = astTree
      .flatMap((astElement) => mapping[astElement.status](astElement, depth, iter));
    return `{\n${stringifiedElements.join('\n')}\n${makeIndent(depth)}}`;
  };
  return iter(tree, 0);
};

export default stylish;
