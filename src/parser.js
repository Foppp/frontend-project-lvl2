import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const readFile = (filePath) => {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const data = fs.readFileSync(absolutePath);
  return data;
};
const parseFile = (filePath) => {
  const fileData = readFile(filePath);
  const extName = path.extname(filePath);
  const extentions = {
    '.json': (p) => JSON.parse(p),
    '.yml': (y) => yaml.safeLoad(y),
  };
  return extentions[extName](fileData);
};

export default parseFile;
