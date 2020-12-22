import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const pathResolve = (filepath) => path.resolve(process.cwd(), filepath);

const parseFile = (filePath) => {
  const extentions = {
    '.json': (p) => JSON.parse(fs.readFileSync(p)),
    '.yml': (y) => yaml.safeLoad(fs.readFileSync(y)),
  };
  const resolvedPath = pathResolve(filePath);
  const extPathName = path.extname(resolvedPath);
  return extentions[extPathName](resolvedPath);
};

export default parseFile;
