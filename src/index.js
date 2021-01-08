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
  const firstFile = readFile(path1);
  const secondFile = readFile(path2);
  const firstFileExt = getExt(path1);
  const secondFileExt = getExt(path2);
  const parsedFile1 = parseFile(firstFile, firstFileExt);
  const parsedFile2 = parseFile(secondFile, secondFileExt);
  const astTree = makeDiff(parsedFile1, parsedFile2);
  return format(astTree, formatName);
};
