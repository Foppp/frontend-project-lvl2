import _ from 'lodash';

const symbols = { removed: '-', added: '+' };
const stylish = (tree, depth = []) => {
  const replacer = ' ';
  const spacesCount = 2;
  const spaceSize = depth * spacesCount;
  const spaceInd = replacer.repeat(spaceSize);
  const spaceBr = replacer.repeat(spaceSize - spacesCount);
  const result = tree.flatMap((element) => {
    const { name, value, status } = element;
    const currentValue = (status === 'nested') ? element.children : value;
    const currentSymbol = symbols[status] ?? replacer;
    if (status === 'updated') {
      return element.newValue
        .map((el) => `${spaceInd}${symbols[el.status]} ${el.name}: ${stylish(el.value, depth + 2)}`);
    }
    return `${spaceInd}${currentSymbol} ${name}: ${stylish(currentValue, depth + 2)}`;
  });
  return ['{', ...result, `${spaceBr}}`].join('\n');
};

export default stylish;
