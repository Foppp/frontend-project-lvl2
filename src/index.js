import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import parseFile from './parser.js';
import makeDiff from './diff.js';
import format from './formatters/index.js';

const makeFullPath = (filepath) => path.resolve(process.cwd(), filepath);

const readFile = (filePath) => {
  const fullPath = makeFullPath(filePath);
  const data = fs.readFileSync(fullPath);
  return data;
};

const getExt = (extPath) => _.last(path.extname(extPath).split('.'));

export default (path1, path2, formatName = 'stylish') => {
  const file1 = readFile(path1);
  const file2 = readFile(path2);
  const fileExt1 = getExt(path1);
  const fileExt2 = getExt(path2);
  const parsedFile1 = parseFile(file1, fileExt1);
  const parsedFile2 = parseFile(file2, fileExt2);
  const astTree = makeDiff(parsedFile1, parsedFile2);
  return format(astTree, formatName);
};
