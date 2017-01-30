import request from 'request';
import Promise from 'es6-promise';

import { getStationName } from './helpers';

const requestTickets = (from, to, date) =>
    new Promise((resolve, reject) => {
        const fromStation = getStationName(from);
        const toStation = getStationName(to);

        if (!fromStation) {
            reject({
                msg: '出发站代码未找到',
                data: null
            });
            return;
        }

        if (!toStation) {
            reject({
                msg: '到站代码未找到',
                data: null
            });
            return;
        }

        // const requestUrl = `https://kyfw.12306.cn/otn/lcxxcx/query?purpose_codes=ADULT&queryDate=${date}&from_station=${fromStation}&to_station=${toStation}`;
        const requestUrl = `https://kyfw.12306.cn/otn/leftTicket/queryZ?leftTicketDTO.train_date=${date}&leftTicketDTO.from_station=${fromStation}&leftTicketDTO.to_station=${toStation}&purpose_codes=ADULT`;

        console.log('requesting tickets(from: %s, to: %s, date: %s)', from, to, date);
        console.log(requestUrl);

        request.get({
            uri: requestUrl,
            rejectUnauthorized: false
        }, (error, response, body) => {
            if (error) {
                reject({
                    msg: '获取车票信息失败',
                    data: error
                });
                return;
            }

            const result = JSON.parse(body);
            // const data = result.data;
            const data = {
                searchDate: date,
                datas: result.data.map(({ queryLeftNewDTO }) => queryLeftNewDTO)
            };

            resolve(data, { from, to, date });
        });
    });

export default requestTickets;
