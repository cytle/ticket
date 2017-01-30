#!/usr/bin/env node
'use strict';

import ticketTable from './ticketTable';
import program from 'commander';
import refreshStationNames from './refreshStationNames';
import packageJson from '../package.json';

program
    .description('查询12306车票信息,可筛选过站.\n  eg: ticket beijing hanzhou 2017-02-28')
    .arguments('<from> <to> <date>')
    .option('-g, --gao', '高铁')
    .option('-d, --dong', '动车')
    .option('-t, --te', '特快')
    .option('-k, --kuai', '快速')
    .option('-z, --zhi', '直达')
    .option('--through <station name>', '途径站')
    .action((from, to, date) => {
        const allowTrainTypes = (['gao', 'dong', 'te', 'kuai', 'zhi'])
            .filter(t => t && program[t])
            .map(t => t[0].toLocaleLowerCase());

        refreshStationNames()
        .then(
            () => {
                ticketTable(from, to, date, {
                    allowTrainTypes,
                    through: program.through,
                    hasThrough: !!program.through
                });
            }
        )
        .catch(console.error);
    })
    .version(packageJson.version)
    .parse(process.argv);
