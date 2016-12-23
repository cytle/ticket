import filterTrainType from './filterTrainType';
import formatWithThrough from './formatWithThrough';
import renderReal from './renderReal';

const middlewares = [
    filterTrainType,
    formatWithThrough,
    renderReal
];
const render = function (req) {
    let i = 0;

    const next = () => {
        const item = middlewares[i++];
        if (!item) {
            return;
        }

        try {
            item.call(this, req, next);
        } catch (err) {
            console.error(err);
        }
    };
    next();
};

export {
    render
};
