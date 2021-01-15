import _ from 'lodash';

const makeIdent = (depth) => '  '.repeat(depth);

const stringifyValue = (obj, depth) => {
  if (!_.isPlainObject(obj)) {
    return obj;
  }
  const stringifiedElements = Object.entries(obj)
    .map(([key, val]) => `${makeIdent(depth)}  ${key}: ${stringifyValue(val, depth + 2)}`);
  return `{\n${stringifiedElements.join('\n')}\n${makeIdent(depth - 1)}}`;
};

const mapping = {
  unchanged: (element, depth) => `${makeIdent(depth)}  ${element.name}: ${stringifyValue(element.value, depth + 2)}`,
  removed: (element, depth) => `${makeIdent(depth)}- ${element.name}: ${stringifyValue(element.value, depth + 2)}`,
  added: (element, depth) => `${makeIdent(depth)}+ ${element.name}: ${stringifyValue(element.value, depth + 2)}`,
  nested: (element, depth, iter) => `${makeIdent(depth)}  ${element.name}: ${iter(element.children, depth + 2)}`,
  updated: (element, depth) => [
    `${makeIdent(depth)}- ${element.name}: ${stringifyValue(element.value, depth + 2)}`,
    `${makeIdent(depth)}+ ${element.name}: ${stringifyValue(element.newValue, depth + 2)}`,
  ],
};

const stylish = (tree) => {
  const iter = (astTree, depth) => {
    const stringifiedElements = astTree
      .flatMap((astElement) => mapping[astElement.status](astElement, depth, iter));
    return `{\n${stringifiedElements.join('\n')}\n${makeIdent(depth - 1)}}`;
  };
  return iter(tree, 1);
};

export default stylish;
