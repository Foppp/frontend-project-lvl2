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
    const actualStylish = genDiff(file1, file2, 'stylish');
    const actualPlain = genDiff(file1, file2, 'plain');
    const actualJson = genDiff(file1, file2, 'json');
    expect(actualStylish).toEqual(expectedStylish);
    expect(actualPlain).toEqual(expectedPlain);
    expect(actualJson).toEqual(expectedJson);
  });
});
