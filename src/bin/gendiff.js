#! /usr/bin/env node

import program from 'commander';

import genDiff from '../index.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows difference.')
  .option('-f, --format [type]', 'output format');

program
  .arguments('<filepath1> <filepath2>')
  .description('Find difference between two files')
  .action((filepath1, filepath2) => console.log(genDiff(filepath1, filepath2)));

program.parse(process.argv);
