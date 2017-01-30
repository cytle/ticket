'use strict';

import requestTickets from './requestTickets';
import { render } from './middlewares';

const ticketTable = function (from, to, date, options) {
    requestTickets(from, to, date)
        .then(({ datas, searchDate = date }) =>
            render({ datas, searchDate, from, to, date, options }))
        .catch(console.log);
};

export default ticketTable;
