export function search(data){
    console.log('payload', data)
    return {
        type: 'search',
        payload: data,
    }
}