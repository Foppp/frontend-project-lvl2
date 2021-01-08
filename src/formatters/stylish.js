import _ from 'lodash';

const symbols = { removed: '-', added: '+' };

const stringifyElement = (tree, depth, space, iter = stringifyElement) => {
  if (!_.isArray(tree)) {
    return Object
      .entries(tree)
      .map(([name, value]) => `${space}  ${name}: ${iter(value, depth + 2)}`);
  }
  return tree
    .flatMap((element) => {
      const { name, value, status } = element;
      const currentValue = (status === 'nested') ? element.children : value;
      const symbol = symbols[status] ?? ' ';
      if (status === 'updated') {
        const oldName = `${space}${symbols.removed} ${name}`;
        const oldValue = `${iter(currentValue, depth + 2)}`;
        const newName = `${space}${symbols.added} ${name}`;
        const newValue = `${iter(element.newValue, depth + 2)}`;
        return [
          `${oldName}: ${oldValue}`,
          `${newName}: ${newValue}`,
        ];
      }
      return `${space}${symbol} ${name}: ${iter(currentValue, depth + 2)}`;
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
