'use strict';
/**
 * 获取站拼音和站代码
 */

import request from 'request';
import fs from 'fs';
import Promise from 'es6-promise';

const dataPath = './data';
const refreshStationNames = () =>
    new Promise((resolve, reject) => {
        // TODO 判断是否已经存在stationNames
        request
            .get(
            {
                uri: 'https://kyfw.12306.cn/otn/resources/js/framework/station_name.js?station_version=1.8968',
                rejectUnauthorized: false
            },
            function (error, response, body) {
                if (error) {
                    reject(error);
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

                resolve(names);
            });
    });

export default refreshStationNames;
