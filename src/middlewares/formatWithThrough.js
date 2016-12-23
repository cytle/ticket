
import { formatRow } from '../helpers';
import requestTickets from '../requestTickets';

// 格式化一行数据附带途经站数据
const formatRowWithThrough = item => {
    const throughRow = formatRow(item.throughInfo);
    throughRow[0] = '';
    return formatRow(item).map((v, index) => v + '\n' + throughRow[index]);
};

const commonTrains = (datas1, datas2) => {
    // if (datas1.length > datas2.length) {
    //     [datas2, datas1] = [datas1, datas2];
    // }
    const a = datas2.map(item => item.train_no);
    return datas1.filter(item => {
        const index = a.indexOf(item.train_no);
        if (index === -1) {
            return false;
        }
        item.throughInfo = datas2[index];

        return true;
    });
};

const formatWithThrough = (req, next) => {
    const { options, from, date } = req;
    options.formatRow = !options.hasThrough
        ? formatRow
        : formatRowWithThrough;

    if (options.hasThrough) {
        requestTickets(from, options.through, date)
            .then(({ datas }) => {
                req.datas = commonTrains(req.datas, datas);
                next();
                return req.datas;
            })
            .catch(err => console.error(err));
    } else {
        next();
    }
};

export default formatWithThrough;
