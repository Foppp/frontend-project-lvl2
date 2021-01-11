import _ from 'lodash';

const openedSpace = (depth, count = 2, replacer = ' ') => replacer.repeat(depth * count);
const closedSpace = (depth, count = 2, replacer = ' ') => replacer.repeat((depth * count) - count);

const stringy = (obj, depth) => {
  if (!_.isObject(obj)) {
    return obj;
  }
  const spO = openedSpace(depth);
  const spC = closedSpace(depth);
  const lines = Object.entries(obj)
    .map(([key, val]) => `${spO}  ${key}: ${stringy(val, depth + 2)}`);
  return ['{', ...lines, `${spC}}`].join('\n');
};

const mapping = {
  removed: (element, sp, depth) => `${sp}- ${element.name}: ${stringy(element.value, depth + 2)}`,
  added: (element, sp, depth) => `${sp}+ ${element.name}: ${stringy(element.value, depth + 2)}`,
  updated: (element, sp, depth) => [
    `${sp}- ${element.name}: ${stringy(element.value, depth + 2)}`,
    `${sp}+ ${element.name}: ${stringy(element.newValue, depth + 2)}`,
  ],
  unchanged: (element, sp, depth) => `${sp}  ${element.name}: ${stringy(element.value, depth + 2)}`,
  nested: (element, sp, depth, iter) => `${sp}  ${element.name}: ${iter(element.children, depth + 2)}`,
};

const stylish = (tree) => {
  const iter = (astTree, depth) => {
    const spO = openedSpace(depth);
    const spC = closedSpace(depth);
    const result = astTree
      .flatMap((astElement) => mapping[astElement.status](astElement, spO, depth, iter));
    return ['{', ...result, `${spC}}`].join('\n');
  };
  return iter(tree, 1);
};

export default stylish;
