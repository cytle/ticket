
const filterTrainType = (req, next) => {
    // 过滤车次
    const allowTrainTypes = req.options.allowTrainTypes || [];
    if (allowTrainTypes.length > 0) {
        req.datas = req.datas.filter(row =>
            allowTrainTypes.indexOf(
                row.station_train_code[0].toLocaleLowerCase()
            ) !== -1
        );
    }

    next();
};

export default filterTrainType;
