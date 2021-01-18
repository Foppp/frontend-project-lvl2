import path, { dirname } from 'path';

import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const formats = ['json', 'yml'];
const expectedStylish = readFile('stylishResult.txt');
const expectedPlain = readFile('plainResult.txt');
const expectedJson = readFile('jsonResult.json');

describe('Compare two files', () => {
  test.each(formats)('%s files', (fileFormat) => {
    const file1 = getFixturePath(`file1.${fileFormat}`);
    const file2 = getFixturePath(`file2.${fileFormat}`);
    expect(genDiff(file1, file2, 'stylish')).toEqual(expectedStylish);
    expect(genDiff(file1, file2, 'plain')).toEqual(expectedPlain);
    expect(genDiff(file1, file2, 'json')).toEqual(expectedJson);
    expect(genDiff(file1, file2)).toEqual(expectedStylish);
  });
});
