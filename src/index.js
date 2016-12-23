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
    .option('-g, --gao', '高铁')
    .option('-d, --dong', '动车')
    .option('-t, --te', '特快')
    .option('-k, --kuai', '快速')
    .option('-z, --zhi', '直达')
    .action((from, to, date) => {
        const allowTrainTypes = (['gao', 'dong', 'te', 'kuai', 'zhi'])
            .filter(t => t && program[t])
            .map(t => t[0].toLocaleLowerCase());
        console.log(allowTrainTypes);
        ticketTable(from, to, date, {
            allowTrainTypes
        });
    })
    .parse(process.argv);
