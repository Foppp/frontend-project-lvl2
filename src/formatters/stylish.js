import _ from 'lodash';

const symbols = { removed: '-', added: '+' };
const stylish = (astTree, depth = 1) => {
  if (!_.isObject(...astTree)) {
    return astTree;
  }
  const replacer = ' ';
  const spacesCount = 2;
  const spaceSize = depth * spacesCount;
  const spaceInd = replacer.repeat(spaceSize);
  const spaceBr = replacer.repeat(spaceSize - spacesCount);
  const result = astTree.flatMap((element) => {
    const { name, value, status } = element;
    const currentValue = (status === 'nested') ? element.children : value;
    const currentSymbol = symbols[status] ?? replacer;
    if (status === 'updated') {
      const [removed, added] = element.newValue;
      return [
        `${spaceInd}${symbols[removed.status]} ${removed.name}: ${stylish(removed.value, depth + 2)}`,
        `${spaceInd}${symbols[added.status]} ${added.name}: ${stylish(added.value, depth + 2)}`,
      ];
    }
    return `${spaceInd}${currentSymbol} ${name}: ${stylish(currentValue, depth + 2)}`;
  });
  return ['{', ...result, `${spaceBr}}`].join('\n');
};

export default stylish;
