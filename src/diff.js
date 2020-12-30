import _ from 'lodash';

const makeAstElement = (element, status = 'unchanged') => {
  const stringElement = element ?? String(element);
  if (!_.isObject(element)) {
    return [stringElement];
  }
  return Object.entries(element)
    .map(([name, val]) => ({ name, value: makeAstElement(val), status }));
};
const makeDiff = (file1, file2) => {
  const uniqKeys = _.sortBy(_.union(Object.keys(file1), Object.keys(file2)));
  const astTree = uniqKeys.flatMap((element) => {
    const firstElement = { [element]: file1[element] };
    const secondElement = { [element]: file2[element] };
    const removedElement = makeAstElement(firstElement, 'removed');
    const addedElement = makeAstElement(secondElement, 'added');
    const changedElement = makeAstElement(secondElement, 'updated');
    const nestedElement = makeAstElement(firstElement, 'nested');
    const unchangedElement = makeAstElement(firstElement);
    if (_.isObject(file1[element]) && _.isObject(file2[element])) {
      return _.merge(...nestedElement, { children: makeDiff(file1[element], file2[element]) });
    }
    if (!_.has(file2, element)) {
      return removedElement;
    }
    if (!_.has(file1, element)) {
      return addedElement;
    }
    if (file1[element] !== file2[element]) {
      return _.merge(...changedElement, { newValue: [...removedElement, ...addedElement] });
    }
    return unchangedElement;
  });
  return astTree;
};

export default makeDiff;
