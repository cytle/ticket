/**
 * 获取站拼音和站代码
 */

import request from 'request';
import fs from 'fs';
import Promise from 'es6-promise';
import path from 'path';

const filePath = path.resolve('data', 'stationNames.json');

/**
 * 创建一个文件夹
 * @param  {String} dir 需要创建的文件夹地址
 * @return {Object}     返回一个promise对象
 */
const mkdir = dir => new Promise((resolve, reject) =>
    fs.stat(dir, (error, stat) => {
        error
        ? fs.mkdir(dir, err =>
            err
            ? reject(err)
            : resolve()
        )
        : resolve();
    })
);

/**
 * 请求并且写入车站信息
 * @param  {String} writeFilePath 写入文件的路径
 * @return {Object}               返回一个promise对象
 */
const requestAndWriteStationNames = writeFilePath => new Promise((resolve, reject) =>
    request
        .get(
        {
            uri: 'https://kyfw.12306.cn/otn/resources/js/framework/station_name.js?station_version=1.8968',
            rejectUnauthorized: false
        },
        (error, response, body) => {
            if (error) return reject(error);

            const regx = /([A-Z]+)\|([a-z]+)/g;
            const names = {};
            let matchs;

            while ((matchs = regx.exec(body))) {
                names[matchs[2]] = matchs[1];
            }

            fs.writeFile(writeFilePath, JSON.stringify(names), (err) =>
                err
                ? reject(err)
                : resolve()
            );
        })
);

export const refresh = () => mkdir(path.dirname(filePath))
    .then(() => requestAndWriteStationNames(filePath));

