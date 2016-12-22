'use strict';

import request from 'request';
import stationNames from '../data/stationNames';

const fromStation = stationNames['beijingbei'];
const toStation = stationNames['chongqingbei'];
const date = '2016-12-30';

request.get({
    uri: `https://kyfw.12306.cn/otn/lcxxcx/query?purpose_codes=ADULT&queryDate=${date}&from_station=${fromStation}&to_station=${toStation}`,
    rejectUnauthorized: false
}, function (error, response, body) {
    if (error) {
        console.error(error);
        return;
    }
    const result = JSON.parse(body);
    console.log(result.data.datas);
});
