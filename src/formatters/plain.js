import _ from 'lodash';
import {
  getName, getValue, getStatus, getChildren, isNested, getNewValue,
} from './utils.js';

const normalize = (value) => {
  const strValue = _.isString(value) ? `'${value}'` : value;
  return _.isObject(value) ? '[complex value]' : strValue;
};

const print = (status, prop, value, newValue) => {
  const main = `Property '${prop.join('.')}' was ${status}`;
  const output = {
    removed: main,
    added: `${main} with value: ${normalize(value)}`,
    updated: `${main}. From ${normalize(value)} to ${normalize(newValue)}`,
  };
  return output[status];
};

const plain = (tree) => {
  const iter = (elements, propPath) => {
    const result = elements.flatMap((element) => {
      const name = getName(element);
      const status = getStatus(element);
      const value = getValue(element);
      const propAcc = [...propPath, name];
      if (!isNested(element)) {
        const printedOutput = print(status, propAcc, value, getNewValue(element));
        return printedOutput ?? [];
      }
      return iter(getChildren(element), propAcc);
    });
    return result.join('\n');
  };
  return iter(tree, []);
};

export default plain;
