import _ from 'lodash';

const makeIndent = (depth) => '  '.repeat(depth);

const stringifyValue = (obj, depth) => {
  if (!_.isPlainObject(obj)) {
    return obj;
  }
  const stringifiedElements = Object.entries(obj)
    .map(([key, val]) => `${makeIndent(depth)}  ${key}: ${stringifyValue(val, depth + 2)}`);
  return `{\n${stringifiedElements.join('\n')}\n${makeIndent(depth - 1)}}`;
};

const mapping = {
  unchanged: (element, depth) => `${makeIndent(depth)}  ${element.name}: ${stringifyValue(element.value, depth + 2)}`,
  removed: (element, depth) => `${makeIndent(depth)}- ${element.name}: ${stringifyValue(element.value, depth + 2)}`,
  added: (element, depth) => `${makeIndent(depth)}+ ${element.name}: ${stringifyValue(element.value, depth + 2)}`,
  nested: (element, depth, iter) => `${makeIndent(depth)}  ${element.name}: ${iter(element.children, depth + 2)}`,
  updated: (element, depth) => [
    `${makeIndent(depth)}- ${element.name}: ${stringifyValue(element.value, depth + 2)}`,
    `${makeIndent(depth)}+ ${element.name}: ${stringifyValue(element.newValue, depth + 2)}`,
  ],
};

const stylish = (tree) => {
  const iter = (astTree, depth) => {
    const stringifiedElements = astTree
      .flatMap((astElement) => mapping[astElement.status](astElement, depth, iter));
    return `{\n${stringifiedElements.join('\n')}\n${makeIndent(depth - 1)}}`;
  };
  return iter(tree, 1);
};

export default stylish;
