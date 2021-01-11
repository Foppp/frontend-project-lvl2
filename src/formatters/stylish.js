import _ from 'lodash';

const makeOpenIdent = (depth, count = 2, replacer = ' ') => replacer.repeat(depth * count);
const makeCloseIdent = (depth, count = 2, replacer = ' ') => replacer.repeat((depth * count) - count);

const stringifyValue = (obj, depth) => {
  if (!_.isObject(obj)) {
    return obj;
  }
  const openedIdent = makeOpenIdent(depth);
  const closedIdent = makeCloseIdent(depth);
  const stringifiedElements = Object.entries(obj)
    .map(([key, val]) => `${openedIdent}  ${key}: ${stringifyValue(val, depth + 2)}`);
  return ['{', ...stringifiedElements, `${closedIdent}}`].join('\n');
};

const mapping = {
  unchanged: (element, ident, depth) => `${ident}  ${element.name}: ${stringifyValue(element.value, depth + 2)}`,
  removed: (element, ident, depth) => `${ident}- ${element.name}: ${stringifyValue(element.value, depth + 2)}`,
  added: (element, ident, depth) => `${ident}+ ${element.name}: ${stringifyValue(element.value, depth + 2)}`,
  nested: (element, ident, depth, iter) => `${ident}  ${element.name}: ${iter(element.children, depth + 2)}`,
  updated: (element, ident, depth) => [
    `${ident}- ${element.name}: ${stringifyValue(element.value, depth + 2)}`,
    `${ident}+ ${element.name}: ${stringifyValue(element.newValue, depth + 2)}`,
  ],
};

const stylish = (tree) => {
  const iter = (astTree, depth) => {
    const openedIdent = makeOpenIdent(depth);
    const closedIdent = makeCloseIdent(depth);
    const stringifiedElements = astTree
      .flatMap((astElement) => mapping[astElement.status](astElement, openedIdent, depth, iter));
    return ['{', ...stringifiedElements, `${closedIdent}}`].join('\n');
  };
  return iter(tree, 1);
};

export default stylish;
