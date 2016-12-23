#!/usr/bin/env node
'use strict';

import ticketTable from './ticketTable';
import program from 'commander';
// import freshStations from './freshStationNames';

program
    .version('0.0.1');

// program
//     .command('refresh-stations', '刷新车站名称数据')
//     .arguments('')
//     .action(freshStations);

program
    .arguments('<from> <to> <date>')
    .option('-g', '高铁')
    .option('-d', '动车')
    .option('-t', '特快')
    .option('-k', '快速')
    .option('-z', '直达')
    .action((from, to, date, options) => {
        ticketTable(from, to, date);
    });

program.parse(process.argv);

