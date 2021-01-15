import path from 'path';
import fs from 'fs';
import parseFile from './parser.js';
import makeDiff from './diff.js';
import format from './formatters/index.js';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);

const getFormat = (extPath) => path.extname(extPath).slice(1);

const getData = (fullPath) => {
  const data = fs.readFileSync(fullPath, 'utf-8');
  const fileFormat = getFormat(fullPath);
  return parseFile(data, fileFormat);
};

export default (path1, path2, formatName = 'stylish') => {
  const data1 = getData(getFullPath(path1));
  const data2 = getData(getFullPath(path2));
  const astTree = makeDiff(data1, data2);
  return format(astTree, formatName);
};
