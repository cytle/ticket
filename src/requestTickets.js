'use strict';

import request from 'request';
import Promise from 'es6-promise';

import { getStationName } from './helpers';

const requestTickets = function (from, to, date) {
    const fromStation = getStationName(from);
    const toStation = getStationName(to);

    console.log('requesting tickets(from: %s, to: %s, date: %s)', from, to, date);

    return new Promise((resolve, reject) =>
        request.get({
            uri: `https://kyfw.12306.cn/otn/lcxxcx/query?purpose_codes=ADULT&queryDate=${date}&from_station=${fromStation}&to_station=${toStation}`,
            rejectUnauthorized: false
        }, (error, response, body) => {
            if (error) {
                reject(error);
                return;
            }

            const result = JSON.parse(body);
            resolve(result.data, { from, to, date });
        })
    );
};

export default requestTickets;
