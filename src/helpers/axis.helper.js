/**
 * Funkcja oblicz skrajny zakres dla wartości na podstawie kroku.
 * @param { number} value
 * @param { number } step 
 * @returns { number } Najbardziej skarajna wartość. 
 */
const calcRangeUp = (value, step) => {
    const a = Math.abs(value);

    if(value>=0) {
        return Math.ceil(a/step) * step;
    } else {
        return Math.floor(a/step) * -step;
    }
}

const calcRangeDown = (value, step) => {
    const a = Math.abs(value);

    if(value >= 0) {
        return Math.floor(a/step) * step;
    }else {
        return Math.ceil(a/step) * -step; 
    }
}

/**
 * Oblicz ile wynosi długość dla jednostki.
 * @param { number } len Całkowita długosć odcinka
 * @param { number } a Współrzędna 1
 * @param { number } b Współrzędna 2
 * @returns { number } 
 */
const calcStep = (len, a, b) => {
    return (len / (Math.abs(a) + Math.abs(b)));
}

export { calcRangeDown, calcRangeUp, calcStep }