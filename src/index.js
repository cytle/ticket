#!/usr/bin/env node
'use strict';

import ticketTable from './ticketTable';
import program from 'commander';

program
    .version('0.0.1')
    .arguments('<from> <to> <date>')
    .option('-g', '高铁')
    .option('-d', '动车')
    .option('-t', '特快')
    .option('-k', '快速')
    .option('-z', '直达')
    .action((from, to, date) => {
        ticketTable(from, to, date);
    })
    .parse(process.argv);

