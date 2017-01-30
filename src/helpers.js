import chalk from 'chalk';

import stationNames from '../data/stationNames';

const isString = s => typeof s === 'string';
const getStationName = name => stationNames[name];

// 格式化一行数据
const formatRow = row => [
    // 车次
    row.station_train_code,
    // 出发、到达时间
    ([
        chalk.yellow(row.from_station_name),
        // row.throughInfo ? row.throughInfo.to_station_name : '',
        chalk.green(row.to_station_name)
    ]).join('->'),
    // 出发、到达站
    ([
        chalk.yellow(row.start_time),
        // row.throughInfo ? row.throughInfo.arrive_time : '',
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
    isString(row.note)
    ? row.note.replace('月', '/').replace('点', ':').replace(/分|起|售|日/g, '').replace('<br/>', ' ')
    : ''
];

export {
    getStationName,
    formatRow
};
