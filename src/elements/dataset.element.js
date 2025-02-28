import ChartElement from "./element.js";


export default class Dataset extends ChartElement {
    constructor(canvas, axis) {

        super(canvas);

        if(!axis) {
            throw new Error('Dataset can not exist without axis!')
        }
        
        this.margin = 5;

        this._canvas = canvas;

        this._canvas.setPosition(
            {
                position: 'absolute',
                top: axis._position.topLeft.y - this.margin,
                left: axis._position.topLeft.x - this.margin
            }
        );

        // this._canvas.setBackground('rgba(12,12,2,0.5)');
        this._canvas.setWidth(axis.width + 1 * this.margin);
        this._canvas.setHeight(axis.height + 2 * this.margin);
        
        const { zeroPoint, position } = axis;

        this._zeroPoint = {
            x: zeroPoint.x - position.topLeft.x + this.margin,
            y: zeroPoint.y - position.topLeft.y + this.margin
        }
    }

    get zeroPoint() {
        return this._zeroPoint;
    }

}