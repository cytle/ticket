import { refresh } from './stationNames';

refresh()
    .then(() => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(0);
    });
