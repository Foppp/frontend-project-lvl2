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
    const result = readFile('jsonResultAB.txt');
    const beforeFile1 = getFixturePath('jsonFileA.json');
    const afterFile1 = getFixturePath('jsonFileB.json');
    expect(genDiff(beforeFile1, afterFile1)).toEqual(result);
  });

  test('.yml files', () => {
    const result2 = readFile('yamlResultAB.txt');
    const beforeFile11 = getFixturePath('yamlFileA.yml');
    const afterFile22 = getFixturePath('yamlFileB.yml');
    expect(genDiff(beforeFile11, afterFile22)).toEqual(result2);
  });
});
