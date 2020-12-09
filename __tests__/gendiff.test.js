import fs from 'fs';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

test('Difference between two .json files equal string', () => {
  const beforeFile1 = `${__dirname}/../__fixtures__/before1.json`;
  const afterFile1 = `${__dirname}/../__fixtures__/before2.json`;
  const result = fs.readFileSync(`${__dirname}/../__fixtures__/result1.txt`, 'utf-8');
  expect(genDiff(beforeFile1, afterFile1)).toEqual(result);
});
