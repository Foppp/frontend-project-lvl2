import _ from 'lodash';

const makeAstElement = (obj, status = 'unchanged', obj2 = {}) => {
  if (!_.isObject(obj)) {
    const strElement = obj ?? String(obj);
    return [strElement];
  }
  const resultValue = Object.entries(obj)
    .map(([name, val]) => ({ name, value: makeAstElement(val), status }));
  if (status === 'updated') {
    const newValue = [...makeAstElement(obj, 'removed'), ...makeAstElement(obj2, 'added')];
    return _.merge(...resultValue, { newValue });
  }
  return resultValue;
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
