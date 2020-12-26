import _ from 'lodash';

const makeAstElement = (element, status = 'unchanged') => {
  const stringElement = element ?? String(element);
  if (!_.isObject(element)) {
    return [stringElement];
  }
  return Object.entries(element)
    .map(([name, val]) => ({ name, value: makeAstElement(val), status }));
};

const normalize = (value) => {
  switch (true) {
    case value.join() === 'null':
      return null;
    case _.isString(...value):
      return `'${value}'`;
    case _.isObject(...value):
      return '[complex value]';
    default:
      return value;
  }
};

export { makeAstElement, normalize };
