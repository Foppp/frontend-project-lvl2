import _ from 'lodash';

const stylish = (tree, depth = 1) => {
  const symbols = { removed: '-', added: '+' };
  if (!_.isObject(...tree)) {
    return tree;
  }
  const replacer = ' ';
  const spacesCount = 2;
  const spaceSize = depth * spacesCount;
  const spaceInd = replacer.repeat(spaceSize);
  const spaceBr = replacer.repeat(spaceSize - spacesCount);
  const result = tree.flatMap((element) => {
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
