export default class ChartElement {
    constructor(canvas) {
        if(!canvas) {
            throw new Error('Chart element can not exist without canvas!')
        }
    }

    get canvas() {
        return this._canvas;
    }
}