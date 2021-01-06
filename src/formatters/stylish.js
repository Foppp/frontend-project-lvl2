import _ from 'lodash';
import {
  getName, getValue, getStatus, getChildren, isNested, isUpdated, getNewValue,
} from './utils.js';

const symbols = { removed: '-', added: '+' };

const stringifyElement = (tree, depth, space, iter = stringifyElement) => {
  if (!_.isArray(tree)) {
    return Object
      .entries(tree)
      .map(([name, value]) => `${space}  ${name}: ${iter(value, depth + 2)}`);
  }
  return tree
    .flatMap((element) => {
      const name = getName(element);
      const status = getStatus(element);
      const value = isNested(element) ? getChildren(element) : getValue(element);
      const symbol = symbols[status] ?? ' ';
      if (isUpdated(element)) {
        const oldName = `${space}${symbols.removed} ${name}`;
        const oldValue = `${iter(value, depth + 2)}`;
        const newName = `${space}${symbols.added} ${name}`;
        const newValue = `${iter(getNewValue(element), depth + 2)}`;
        return [
          `${oldName}: ${oldValue}`,
          `${newName}: ${newValue}`,
        ];
      }
      return `${space}${symbol} ${name}: ${iter(value, depth + 2)}`;
    });
};

const stylish = (tree, depth = 1) => {
  if (!_.isObject(tree)) {
    return tree;
  }
  const replacer = ' ';
  const spacesCount = 2;
  const spaceSize = depth * spacesCount;
  const spaceOpen = replacer.repeat(spaceSize);
  const spaceClosed = replacer.repeat(spaceSize - spacesCount);
  const result = stringifyElement(tree, depth, spaceOpen, stylish);
  return ['{', ...result, `${spaceClosed}}`].join('\n');
};

export default stylish;
