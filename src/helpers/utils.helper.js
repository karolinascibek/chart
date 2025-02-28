const isObject = (param) => {
    return  typeof param === 'object' && param !== null && !Array.isArray(param);
}

export {
    isObject
}