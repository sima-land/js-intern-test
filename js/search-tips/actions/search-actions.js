//action для изменения текущего фильтра
export const filterAction = (filter) =>{
    return {
        type:'FILTER_CHANGE',
        filter
    }
}