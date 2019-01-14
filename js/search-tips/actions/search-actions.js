export const search = () => {
    return {
        type: 'SEARCH'
    }
}
export const complete = (data) => {
    return {
        type: 'COMPLETE',
        data: data
    }
}
export const fail = () => {
    return {
        type: 'FAIL'
    }
}
