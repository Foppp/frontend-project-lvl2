import { normalize as norm } from '../utils.js';

const output = {
  removed: (p) => `Property '${p}' was removed`,
  added: (p, val) => `Property '${p}' was added with value: ${norm(val)}`,
  updated: (p, val, nVal) => `Property '${p}' was updated. From ${norm(val)} to ${norm(nVal)}`,
  nested: () => [],
};
const plain = (elements, propPath = []) => {
  const result = elements
    .filter((el) => el.status !== 'unchanged')
    .flatMap((element) => {
      const { name, value, status } = element;
      const propAcc = [...propPath, name];
      if (status !== 'nested') {
        if (status === 'updated') {
          const [removed, added] = element.newValue;
          return output[status](propAcc.join('.'), removed.value, added.value);
        }
        return output[status](propAcc.join('.'), value);
      }
      return plain(element.children, propAcc);
    });
  return result.join('\n');
};

export default plain;
