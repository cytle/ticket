import Table from 'cli-table2';
import chalk from 'chalk';

import { formatRow } from '../helpers';

const renderReal = function ({ datas, searchDate, from, to, options }, next) {
    // instantiate
    var table = new Table({
        head: '车次 出发/到达站 出发/到达时间 历时 一等坐 二等坐 软卧 硬卧 硬座 起售'.split(' ')
        // colWidths: [100, 200]
    });

    table.push.apply(table, datas.map(options.formatRow || formatRow));

    const filterTypes = options.allowTrainTypes.join(',');

    console.log(table.toString());
    console.log('  %s -> %s %s 共计%d个车次 %s',
        from,
        to,
        chalk.bold.red('(' + searchDate.replace(/&nbsp;/g, ' ') + ')'),
        datas.length,
        (filterTypes ? `筛选类型: ${filterTypes}` : '')
    );

    next();
};

export default renderReal;
