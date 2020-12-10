import path, { dirname } from 'path';

import { fileURLToPath } from 'url';
import fs from 'fs';
import { describe } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('Difference between two files', () => {
  test('.json files', () => {
    const result = readFile('result1.txt');
    const beforeFile1 = getFixturePath('before1.json');
    const afterFile1 = getFixturePath('after1.json');
    expect(genDiff(beforeFile1, afterFile1)).toEqual(result);
  });

  test('.yml files', () => {
    const result2 = readFile('yamlResult1.txt');
    const beforeFile11 = getFixturePath('yamlFile1.yml');
    const afterFile22 = getFixturePath('yamlFile2.yml');
    expect(genDiff(beforeFile11, afterFile22)).toEqual(result2);
  });
});
