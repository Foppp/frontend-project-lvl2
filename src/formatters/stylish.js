const symbols = { removed: '-', added: '+' };
const stylish = (astTree) => {
  const iter = (tree, depth) => {
    const [treeElement] = tree;
    if (typeof treeElement !== 'object') {
      return treeElement;
    }
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
          .map((el) => `${spaceInd}${symbols[el.status]} ${el.name}: ${iter(el.value, depth + 2)}`);
      }
      return `${spaceInd}${currentSymbol} ${name}: ${iter(currentValue, depth + 2)}`;
    });
    return ['{', ...result, `${spaceBr}}`].join('\n');
  };
  return iter(astTree, 1);
};

export default stylish;
