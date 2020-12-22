import _ from 'lodash';

export default (astTree, replacer = ' ', spacesCount = 2) => {
  const statusSymbol = { removed: '-', added: '+', unchanged: ' ' };
  const iter = (tree, depth) => {
    if (!_.isObject(...tree)) {
      return tree;
    }
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const result = tree.map((element) => {
      const { name, value, status } = element;
      const resultValue = (_.has(element, 'children')) ? element.children : value;
      return `${currentIndent}${statusSymbol[status]} ${name}: ${iter(resultValue, depth + 2)}`;
    });
    return ['{', ...result, `${bracketIndent}}`].join('\n');
  };
  return iter(astTree, 1);
};
