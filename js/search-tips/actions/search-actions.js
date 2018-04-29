export const SEARCH = 'SEARCH';

export const search = text => {
    return {
        type: SEARCH,
        playroad: text,
        find: (words, targer) => {
            let res = [];

            if (targer.length == 0) {
                return res;
            }

            words.forEach(
                (item) => {
                    if (res.length > 5) {
                        return res;
                    }

                    if (item.indexOf(targer) !== -1) {
                        res.push(item)
                    }
                }
            );
            return res;
        }
    }
};
