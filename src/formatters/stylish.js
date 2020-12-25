import _ from 'lodash';

const stylish = (astTree, depth = 1) => {
  const symbols = { removed: '-', added: '+' };
  const [treeElement] = astTree;
  if (!_.isObject(treeElement)) {
    return treeElement;
  }
  const replacer = ' ';
  const spacesCount = 2;
  const spaceSize = depth * spacesCount;
  const spaceInd = replacer.repeat(spaceSize);
  const spaceBr = replacer.repeat(spaceSize - spacesCount);
  const result = astTree.flatMap((element) => {
    const { name, value, status } = element;
    const currentValue = (_.has(element, 'children')) ? element.children : value;
    const currentSymbol = symbols[status] ?? replacer;
    if (_.has(element, 'newValue')) {
      return element.newValue
        .map((el) => `${spaceInd}${symbols[el.status]} ${el.name}: ${stylish(el.value, depth + 2)}`);
    }
    return `${spaceInd}${currentSymbol} ${name}: ${stylish(currentValue, depth + 2)}`;
  });
  return ['{', ...result, `${spaceBr}}`].join('\n');
};

export default stylish;
