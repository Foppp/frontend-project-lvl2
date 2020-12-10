import _ from 'lodash';
import parseFile from './parser.js';
import stringify from './print.js';

export default (path1, path2) => {
  const file1 = parseFile(path1);
  const file2 = parseFile(path2);
  const sortedUniqKeys = _.union(Object.keys(file1), Object.keys(file2)).sort();
  const elementsWithStatus = sortedUniqKeys.reduce((acc, key) => {
    const newKey1 = `${key}: ${file1[key]}`;
    const newKey2 = `${key}: ${file2[key]}`;
    if (_.has(file1, key) && _.has(file2, key)) {
      if (file1[key] === file2[key]) {
        acc[newKey1] = 'unchanged';
      } else {
        acc[newKey1] = 'removed';
        acc[newKey2] = 'added';
      }
    } else if (_.has(file1, key) && !_.has(file2, key)) {
      acc[newKey1] = 'removed';
    } else {
      acc[newKey2] = 'added';
    }
    return acc;
  }, {});
  return stringify(elementsWithStatus);
};
