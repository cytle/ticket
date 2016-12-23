'use strict';

import Table from 'cli-table2';
import chalk from 'chalk';
import Promise from 'es6-promise';

import requestTickets from './requestTickets';
const render = function ({ datas, searchDate, from, to }, options) {
    // instantiate
    var table = new Table({
        head: '车次 出发/到达站 出发/到达时间 历时 一等坐 二等坐 软卧 硬卧 硬座 起售'.split(' ')
        // colWidths: [100, 200]
    });
    const allowTrainTypes = options.allowTrainTypes;
    const filterTypes = allowTrainTypes.join(',');
    // 过滤车次
    if (allowTrainTypes.length > 0) {
        datas = datas.filter(row =>
            allowTrainTypes.indexOf(
                row.station_train_code[0].toLocaleLowerCase()
            ) !== -1
        );
    }

    datas = datas
    .map(row => [
        // 车次
        row.station_train_code,
        // 出发、到达时间
        ([
            chalk.yellow(row.from_station_name),
            row.throughInfo ? row.throughInfo.to_station_name : '',
            chalk.green(row.to_station_name)
        ]).join('->'),
        // 出发、到达站
        ([
            chalk.yellow(row.start_time),
            row.throughInfo ? row.throughInfo.arrive_time : '',
            chalk.green(row.arrive_time)
        ]).join('->'),
        // 历时
        row.lishi,
        // 一等坐
        row.zy_num,
        // 二等坐
        row.ze_num,
        // 软卧
        row.rw_num,
        // 软坐
        row.yw_num,
        // 硬坐
        row.yz_num,
        // 备注
        row.note.replace('月', '/').replace('点', ':').replace(/分|起|售|日/g, '').replace('<br/>', ' ')
    ]);
    table.push.apply(table, datas);
    console.log(table.toString());
    console.log('  %s -> %s %s 共计%d个车次 %s',
        from,
        to,
        chalk.bold.red('(' + searchDate.replace(/&nbsp;/g, ' ') + ')'),
        datas.length,
        (filterTypes ? `筛选类型: ${filterTypes}` : '')
    );
};
const commonTrains = (datas1, datas2) => {
    // if (datas1.length > datas2.length) {
    //     [datas2, datas1] = [datas1, datas2];
    // }
    const a = datas2.map(item => item.train_no);
    return datas1.filter(item => {
        const index = a.indexOf(item.train_no);
        if (index === -1) {
            return false;
        }
        item.throughInfo = datas2[index];

        return true;
    });
};

const ticketTable = function (from, to, date, options) {
    let requestTo = requestTickets(from, to, date);
    if ('through' in options && options.through) {
        requestTo = Promise
            .all([
                requestTo,
                requestTickets(from, options.through, date)
            ])
            .then(([{ datas, searchDate }, { datas: throughDatas }]) =>
                ({
                    datas: commonTrains(datas, throughDatas),
                    searchDate
                }));
    }

    requestTo
        .then(({ datas, searchDate }) =>
            render({ datas, searchDate, from, to }, options))
        .catch(console.log);
};

export default ticketTable;
