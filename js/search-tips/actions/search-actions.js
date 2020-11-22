export const ActionType = {
    CHANGE_SEARCH_STRING: 'CHANGE_SEARCH_STRING'
};

export const ActionCreator = {
    changeSearchString: (string) => ({
        type: ActionType.CHANGE_SEARCH_STRING,
        payload: string
    })
};