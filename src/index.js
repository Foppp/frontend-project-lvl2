import parseFile from './parser.js';
import makeDiff from './diff.js';
import format from './formatters/index.js';

const genDiff = (path1, path2, formatName = 'stylish') => {
  const parsedFile1 = parseFile(path1);
  const parsedFile2 = parseFile(path2);
  const result = makeDiff(parsedFile1, parsedFile2);
  return format(result, formatName);
};
export default genDiff;
