import requestTickets from './requestTickets';
import { render } from './middlewares';

const ticketTable = function (from, to, date, options) {
    requestTickets(from, to, date)
        .then(({ datas, searchDate = date }) =>
            render({ datas, searchDate, from, to, date, options }))
        .catch(result => {
            console.log(result.msg || '未知错误');
            if (result.data) {
                console.log(result.data);
            }
        });
};

export default ticketTable;
