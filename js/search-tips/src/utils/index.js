import data from '../data/words';

export const searchByRow = (row) => {
    if (!row) return;
    const arrayOfResults = [];

    for (let i=0; i<=data.length; i++) {
        if (data[i] && data[i].indexOf(row) !== -1) {
            arrayOfResults.push(data[i]);
            if (arrayOfResults.length === 5) return arrayOfResults;
        }
    }
    return arrayOfResults;
};