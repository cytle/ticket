'use strict';

import request from 'request';
import fs from 'fs';

const dataPath = './data';
const freshStationNames = () => {
    request
        .get(
        {
            uri: 'https://kyfw.12306.cn/otn/resources/js/framework/station_name.js?station_version=1.8968',
            rejectUnauthorized: false
        },
        function (error, response, body) {
            if (error) {
                console.error(error);
                return;
            }

            const regx = /([A-Z]+)\|([a-z]+)/g;
            const names = {};
            let matchs;

            while ((matchs = regx.exec(body))) {
                names[matchs[2]] = matchs[1];
            }
            fs.stat(dataPath, function (err, stat) {
                if (err == null) {
                    return;
                }
                fs.mkdirSync(dataPath);
            });

            fs.writeFile(dataPath + '/stationNames.json', JSON.stringify(names), 'utf8');
            console.info('success');
        });
};

// TODO判断是否是命令环境
freshStationNames();
// export default freshStationNames;
