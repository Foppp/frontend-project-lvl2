import { normalize as norm } from '../utils.js';

const plain = (tree) => {
  const iter = (elements, propPath) => {
    const result = elements.flatMap((element) => {
      const { name, value, status } = element;
      const [removed, added] = element.newValue ?? [];
      const propAcc = [...propPath, name];
      const main = `Property '${propAcc.join('.')}' was ${status}`;
      switch (status) {
        case 'updated':
          return `${main}. From ${norm(removed.value)} to ${norm(added.value)}`;
        case 'added':
          return `${main} with value: ${norm(value)}`;
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
