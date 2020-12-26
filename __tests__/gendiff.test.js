import path, { dirname } from 'path';

import { fileURLToPath } from 'url';
import fs from 'fs';
import { describe, test } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('Difference between two .json files', () => {
  test('Compare stylish format', () => {
    const result1 = readFile('stylishResult.txt');
    const beforeFile1 = getFixturePath('nestedJsonFile1.json');
    const afterFile1 = getFixturePath('nestedJsonFile2.json');
    expect(genDiff(beforeFile1, afterFile1)).toEqual(result1);
  });
  test('Compare plain format', () => {
    const result1 = readFile('plainResult.txt');
    const beforeFile1 = getFixturePath('nestedJsonFile1.json');
    const afterFile1 = getFixturePath('nestedJsonFile2.json');
    expect(genDiff(beforeFile1, afterFile1, 'plain')).toEqual(result1);
  });
  test('Compare json format', () => {
    const result1 = readFile('jsonResult.json');
    const beforeFile1 = getFixturePath('nestedJsonFile1.json');
    const afterFile1 = getFixturePath('nestedJsonFile2.json');
    expect(genDiff(beforeFile1, afterFile1, 'json')).toEqual(result1);
  });
});
describe('Difference between two .yaml files', () => {
  test('Compare stylish format', () => {
    const result2 = readFile('stylishResult.txt');
    const beforeFile2 = getFixturePath('yamlFileA.yml');
    const afterFile2 = getFixturePath('yamlFileB.yml');
    expect(genDiff(beforeFile2, afterFile2)).toEqual(result2);
  });
  test('Compare plain format', () => {
    const result2 = readFile('plainResult.txt');
    const beforeFile2 = getFixturePath('yamlFileA.yml');
    const afterFile2 = getFixturePath('yamlFileB.yml');
    expect(genDiff(beforeFile2, afterFile2, 'plain')).toEqual(result2);
  });
  test('Compare json format', () => {
    const result2 = readFile('jsonResult.json');
    const beforeFile2 = getFixturePath('yamlFileA.yml');
    const afterFile2 = getFixturePath('yamlFileB.yml');
    expect(genDiff(beforeFile2, afterFile2, 'json')).toEqual(result2);
  });
});
