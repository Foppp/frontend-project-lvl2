import path, { dirname } from 'path';

import { fileURLToPath } from 'url';
import fs from 'fs';
import { describe, test } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('Difference between two files', () => {
  test('Compare .json files', () => {
    const result = readFile('nestedJsonResult.txt');
    const beforeFile1 = getFixturePath('nestedJsonFile1.json');
    const afterFile1 = getFixturePath('nestedJsonFile2.json');
    expect(genDiff(beforeFile1, afterFile1)).toEqual(result);
  });

  test('Compare .yml files', () => {
    const result2 = readFile('yamlResultAB.txt');
    const beforeFile11 = getFixturePath('yamlFileA.yml');
    const afterFile22 = getFixturePath('yamlFileB.yml');
    expect(genDiff(beforeFile11, afterFile22)).toEqual(result2);
  });
});
