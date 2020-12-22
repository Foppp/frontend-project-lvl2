import parseFile from './parser.js';
import makeDiff from './diff.js';
import print from './print.js';

export default (path1, path2) => {
  const parsedFile1 = parseFile(path1);
  const parsedFile2 = parseFile(path2);
  const result = makeDiff(parsedFile1, parsedFile2);
  return print(result);
};
