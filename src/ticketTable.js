'use strict';

import request from 'request';
import Table from 'cli-table2';
import stationNames from '../data/stationNames';
import chalk from 'chalk';

// 获取车次运行时间
const getDuration = function (row) {
    return row.lishi;
    // const duration = row.lishi.replace(':', 'h') + 'm'
    // if duration.startswith('00'):
    //     return duration[4:]
    // if duration.startswith('0'):
    //     return duration[1:]
    // return duration
};

const render = function (data) {
    // instantiate
    var table = new Table({
        head: '车次 出发/到达站 出发/到达时间 历时 一等坐 二等坐 软卧 硬卧 硬座'.split(' ')
        // colWidths: [100, 200]
    });
    data = data.map(row => [
        // 车次
        row.station_train_code,
        // 出发、到达时间
        ([chalk.yellow(row.from_station_name),
                   chalk.green(row.to_station_name)]).join('->'),
        // 出发、到达站
        ([chalk.yellow(row.start_time),
                   chalk.green(row.arrive_time)]).join('->'),
        // 历时
        getDuration(row),
        // 一等坐
        row.zy_num,
        // 二等坐
        row.ze_num,
        // 软卧
        row.rw_num,
        // 软坐
        row.yw_num,
        // 硬坐
        row.yz_num
    ]);
    table.push.apply(table, data);
    console.log(table.toString());
};
const getStationName = name => stationNames[name];

const ticketTable = function (from, to, date, options) {
    const fromStation = getStationName(from);
    const toStation = getStationName(to);

    console.log('requesting tickets(from: %s, to: %s, date: %s)', from, to, date);
    request.get({
        uri: `https://kyfw.12306.cn/otn/lcxxcx/query?purpose_codes=ADULT&queryDate=${date}&from_station=${fromStation}&to_station=${toStation}`,
        rejectUnauthorized: false
    }, function (error, response, body) {
        if (error) {
            console.error(error);
            return;
        }

        const result = JSON.parse(body);
        render(result.data.datas);
    });
};

export default ticketTable;
