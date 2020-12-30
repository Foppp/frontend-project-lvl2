import parseFile from './src/parser.js';
import makeDiff from './src/diff.js';
import format from './src/formatters/index.js';

const genDiff = (path1, path2, formatName = 'stylish') => {
  const parsedFile1 = parseFile(path1);
  const parsedFile2 = parseFile(path2);
  const result = makeDiff(parsedFile1, parsedFile2);
  return format(formatName, result);
};
export default genDiff;
