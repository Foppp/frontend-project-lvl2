import fs from 'fs';
import path from 'path';

export default (filePath) => {
  const extentions = {
    '.json': (p) => JSON.parse(fs.readFileSync(p).toString()),
  };
  const extPathName = path.extname(filePath);
  try {
    return extentions[extPathName](path.resolve(process.cwd(), filePath));
  } catch (e) {
    throw new Error('There is no such derictory or file!');
  }
};
