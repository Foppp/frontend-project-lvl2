import path, { dirname } from 'path';

import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const jsonFile1 = getFixturePath('nestedJsonFile1.json');
const jsonFile2 = getFixturePath('nestedJsonFile2.json');
const yamlFile1 = getFixturePath('yamlFileA.yml');
const yamlFile2 = getFixturePath('yamlFileB.yml');

const stylishResult = readFile('stylishResult.txt');
const plainResult = readFile('plainResult.txt');
const jsonResult = readFile('jsonResult.json');

const fileFormats = [['json', jsonFile1, jsonFile2], ['yaml', yamlFile1, yamlFile2]];
const resultFormats = [['stylish', stylishResult], ['plain', plainResult], ['json', jsonResult]];

describe.each(fileFormats)('Compare two .%s files', (fileFormat, file1, file2) => {
  test.each(resultFormats)(`.${fileFormat} file in %s formatter`, (formatter, expected) => {
    expect(genDiff(file1, file2, formatter)).toEqual(expected);
  });
});
