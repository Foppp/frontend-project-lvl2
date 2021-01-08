import _ from 'lodash';

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

export default (tree) => {
  const iter = (elements, propPath) => {
    const result = elements.flatMap((element) => {
      const { name, value, status } = element;
      const propAcc = [...propPath, name];
      if (status !== 'nested') {
        const printedOutput = print(status, propAcc, value, element.newValue);
        return printedOutput ?? [];
      }
      return iter(element.children, propAcc);
    });
    return result.join('\n');
  };
  return iter(tree, []);
};
