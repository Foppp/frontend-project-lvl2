import _ from 'lodash';

const stylish = (astTree, replacer = ' ', spacesCount = 2) => {
  const symbols = {
    removed: '-', added: '+', unchanged: ' ', nested: ' ',
  };
  const iter = (tree, depth) => {
    if (!_.isObject(...tree)) {
      return tree;
    }
    const spaceSize = depth * spacesCount;
    const spaceInd = replacer.repeat(spaceSize);
    const spaceBr = replacer.repeat(spaceSize - spacesCount);
    const result = tree.flatMap((element) => {
      const { name, value, status } = element;
      const currentValue = (_.has(element, 'children')) ? element.children : value;
      if (_.has(element, 'newValue')) {
        return element.newValue
          .map((el) => `${spaceInd}${symbols[el.status]} ${el.name}: ${iter(el.value, depth + 2)}`);
      }
      return `${spaceInd}${symbols[status]} ${name}: ${iter(currentValue, depth + 2)}`;
    });
    return ['{', ...result, `${spaceBr}}`].join('\n');
  };
  return iter(astTree, 1);
};

export default stylish;
