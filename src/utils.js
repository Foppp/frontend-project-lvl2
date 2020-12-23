import _ from 'lodash';

const makeAstElement = (element1, status = 'unchanged', element2 = {}) => {
  if (!_.isObject(element1)) {
    return [String(element1)];
  }
  const resultValue = Object.entries(element1)
    .map(([name, val]) => ({ name, value: makeAstElement(val), status }));
  if (status === 'changed') {
    const newValue = [...makeAstElement(element1, 'removed'), ...makeAstElement(element2, 'added')];
    return _.merge(...resultValue, { newValue });
  }
  return resultValue;
};

export default makeAstElement;
