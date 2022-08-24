#!/usr/bin/env node

const app = require('../lib');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
  .usage('init hdesign component from template.\nUsage: $0 [dir] --type=react')
  .option('type', {
    alias: 't',
    demand: true,
    describe: '组件类型',
    choices: ['vue', 'react']
  })
  .alias('h', 'help')
  .alias('v', 'version')
  .argv;

app.create(argv.type);

