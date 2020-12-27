import _ from 'lodash';

const symbols = { removed: '-', added: '+' };
const stylish = (astTree) => {
  const iter = (tree, depth) => {
    if (!_.isObject(...tree)) {
      return tree;
    }
    const replacer = ' ';
    const spacesCount = 2;
    const spaceSize = depth * spacesCount;
    const spaceInd = replacer.repeat(spaceSize);
    const spaceBr = replacer.repeat(spaceSize - spacesCount);
    const result = tree.flatMap((element) => `${spaceInd}${currentSymbol} ${name}: ${iter(currentValue, depth + 2)}`);
    return ['{', ...result, `${spaceBr}}`].join('\n');
  };
  return iter(astTree, 1);
};

export default stylish;
