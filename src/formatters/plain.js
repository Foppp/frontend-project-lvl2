import _ from 'lodash';

const normalize = (value) => {
  if (value.join() === 'null') {
    return null;
  }
  if (_.isString(...value)) {
    return `'${value}'`;
  }
  if (_.isObject(...value)) {
    return '[complex value]';
  }
  return value;
};
const plain = (tree) => {
  const iter = (elements, propPath) => {
    const result = elements.flatMap((element) => {
      const { name, value, status } = element;
      const [removed, added] = element.newValue ?? [];
      const propAcc = [...propPath, name];
      const main = `Property '${propAcc.join('.')}' was ${status}`;
      switch (status) {
        case 'updated':
          return `${main}. From ${normalize(removed.value)} to ${normalize(added.value)}`;
        case 'added':
          return `${main} with value: ${normalize(value)}`;
        case 'removed':
          return main;
        case 'nested':
          return iter(element.children, propAcc);
        default:
          return [];
      }
    });
    return result.join('\n');
  };
  return iter(tree, []);
};

export default plain;
