import _ from 'lodash';
import parseFile from './parser.js';
import stringify from './print.js';

const makeStatus = (file1, file2, key) => {
  if (_.isObject(file1[key]) && _.isObject(file2[key])) {
    return 'nested';
  }
  if (_.has(file1, key) && _.has(file2, key)) {
    if (file1[key] === file2[key]) {
      return 'unchanged';
    }
    return 'changed';
  } if (_.has(file1, key) && !_.has(file2, key)) {
    return 'removed';
  }
  return 'added';
};
const genDiff = (path1, path2) => {
  const parsedFile1 = parseFile(path1);
  const parsedFile2 = parseFile(path2);
  const iter = (file1, file2) => {
    const uniqKeys = (_.union(Object.keys(file1), Object.keys(file2))).sort();
    const answer = uniqKeys.map((element) => {
      const status = makeStatus(file1, file2, element);
      return {
        name: element,
        value: file1[element],
        status,
        newValue: file2[element],
        children: status !== 'nested' ? [] : iter(file1[element], file2[element]),
      };
    });
    return stringify(answer);
  };
  return iter(parsedFile1, parsedFile2);
};

export default genDiff;
