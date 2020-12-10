import path, { dirname } from 'path';

import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('Difference between two .json files equal string', () => {
  const result = readFile('result1.txt');
  const beforeFile1 = getFixturePath('before1.json');
  const afterFile1 = getFixturePath('after1.json');
  expect(genDiff(beforeFile1, afterFile1)).toEqual(result);
});

test('Difference between two .yml files equal string', () => {
  const result2 = readFile('yamlResult1.txt');
  const beforeFile11 = getFixturePath('yamlFile1.yml');
  const afterFile22 = getFixturePath('yamlFile2.yml');
  expect(genDiff(beforeFile11, afterFile22)).toEqual(result2);
});
