/**
 * 获取站拼音和站代码
 */

import request from 'request';
import fs from 'fs';
import Promise from 'es6-promise';
import path from 'path';

const dataPath = path.resolve('data');

export const getPath = () => path.resolve(dataPath, 'stationNames.json');

export const refresh = () =>
    new Promise((resolve, reject) => {
        fs.stat(dataPath, function (err, stat) {
            if (err === null) {
                resolve();
                return;
            }
            fs.mkdir(dataPath, function (err2) {
                if (err2) {
                    reject(err2);
                    return;
                }
                resolve();
            });
        });
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
                function writeFile () {
                    const regx = /([A-Z]+)\|([a-z]+)/g;
                    const names = {};
                    let matchs;

                    while ((matchs = regx.exec(body))) {
                        names[matchs[2]] = matchs[1];
                    }

                    fs.writeFile(getPath(), JSON.stringify(names), (err) =>
                        err ? reject(error) : resolve(names)
                    );
                }

                fs.stat(dataPath, function (err, stat) {
                    if (err === null) {
                        writeFile();
                        return;
                    }
                    fs.mkdir(dataPath, function (err2) {
                        if (err2) {
                            reject(err2);
                            return;
                        }
                        writeFile();
                    });
                });
            });
    })
    .then();

