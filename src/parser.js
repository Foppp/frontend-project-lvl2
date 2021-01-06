import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const makeAbsPath = (filepath) => path.resolve(process.cwd(), filepath);

const readFile = (filePath) => {
  const data = fs.readFileSync(makeAbsPath(filePath));
  return data;
};
const extentions = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
};
const parseFile = (filePath) => {
  const fileData = readFile(filePath);
  const extName = path.extname(filePath);
  return extentions[extName](fileData);
};

export default parseFile;
