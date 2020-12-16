import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default (filePath) => {
  const extentions = {
    '.json': (p) => JSON.parse(fs.readFileSync(p)),
    '.yml': (y) => yaml.safeLoad(fs.readFileSync(y)),
  };
  const extPathName = path.extname(filePath);
  try {
    return extentions[extPathName](path.resolve(process.cwd(), filePath));
  } catch (e) {
    throw new Error('There is no such derictory or file!');
  }
};

// const first = '/Users/yurachemeris/Desktop/files-for-diff/long1.json';
// const second = '/Users/yurachemeris/Desktop/files-for-diff/long2.json';
// console.log(par(second));
