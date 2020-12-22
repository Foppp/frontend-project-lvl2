import _ from 'lodash';

const makeAstElement = (element, status = 'unchanged') => {
  if (!_.isObject(element)) {
    return [element];
  }
  const r = Object.entries(element)
    .reduce((acc, [name, val]) => [...acc, { name, value: makeAstElement(val), status }], []);
  return r;
};

const makeDiff = (file1, file2) => {
  const uniqKeys = (_.union(Object.keys(file1), Object.keys(file2))).sort();
  const astTree = uniqKeys.flatMap((element) => {
    const firstElement = { [element]: file1[element] ?? String(file1[element]) };
    const secondElement = { [element]: file2[element] ?? String(file2[element]) };
    const removedElement = makeAstElement(firstElement, 'removed');
    const addedElement = makeAstElement(secondElement, 'added');
    const unchangedElement = makeAstElement(firstElement);
    switch (true) {
      case _.isObject(file1[element]) && _.isObject(file2[element]):
        return _.merge(...unchangedElement, { children: makeDiff(file1[element], file2[element]) });
      case !_.has(file2, element):
        return removedElement;
      case !_.has(file1, element):
        return addedElement;
      case file1[element] !== file2[element]:
        return [removedElement, addedElement];
      default:
        return unchangedElement;
    }
  });
  return astTree.flat();
};

export default makeDiff;
