import { calcRangeDown, calcRangeUp, calcStep } from "../helpers/axis.helper.js";
import ChartElement from "./element.js";


class Axis extends ChartElement {
    color = 'gray';
    label = 'purple';
    lineWidth = 0.5;
    markerXlength = 4;
    markerYlength = 4;

    labelMarginY = 5;
    labelMarginX = 15;
    labelTextAlign = "center";

    constructor(canvas, options) {
        super(canvas);

        if(!options.labels) {
            throw new Error('Axis can not exist without labels!')
        }

        this._canvas = canvas;
        this._labels = options.labels;

        this._x = {};
        this._x.x1 = (options.axis.x && options.axis.x.x1) || 0;
        this._x.x2 = (options.axis.x && options.axis.x.x2) || (this._labels.length - 1);

        this.labelTextAlign = options.axis.x && options.axis.x.labelText;
        
        const { left, top, bottom, right } = canvas.padding; 
        const {y1, y2, step} = options.axis.y;

        this.height = canvas.height - bottom - top;
        this.width = canvas.width - left - right;
        
        this._y = {
            y1: calcRangeDown(y1, step),
            y2: calcRangeUp(y2, step),
            step
        };

        this._stepY = calcStep(this.height, this._y.y1, this._y.y2);
        this._stepX = calcStep(this.width, this._x.x1, this._x.x2);

        const posY1 = this._stepY * (this._y.y2 - this._y.y1) + top;
        const posX2 = this._stepX * (this._x.x2 - this._x.x1) + left;

        this._position = {
            topLeft: { x: left, y: top },
            topRight: { x: posX2, y: top },
            bottomLeft: { x: left, y: posY1 },
            bottomRight: { x: posX2, y: posY1 }
        }

        this._zeroPoint = {
            x: this._position.bottomLeft.x,
            y: this._position.bottomLeft.y - ( Math.abs(this._y.y1) * this._stepY),
        }
    }

    get stepX() {
        return this._stepX;
    }

    get stepY() {
        return this._stepY;
    }

    get position() {
        return this._position;
    }

    get zeroPoint() {
        return this._zeroPoint;
    }

    get canvas() {
        return this._canvas;
    }

    get ctx() {
        return this._canvas.ctx;
    }

    get y() {
        return {...this._y};
    }

    draw() {
        this.#_drawGridY();
        this.#_drawGridX();
    }

    #_drawLine(x1, y1, x2, y2) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }

    #_drawText({text, x, y, baseline = 'middle', font = '10px Arial', textAlign = "start",  fillStyle = 'black'}) {
        this.ctx.textBaseline = baseline;
        this.ctx.font = font;
        this.ctx.fillStyle = fillStyle;
        this.ctx.textAlign = textAlign;
        this.ctx.fillText(text, x, y)
    }

    #_drawGridX() {
        const { bottomLeft, topLeft } = this.position;

        let moveX = topLeft.x;

        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.lineWidth;

        for(let label of this._labels) {
            this.#_drawLine(moveX, topLeft.y, moveX, bottomLeft.y + this.markerXlength);
            
            this.#_drawText({
                text: label, 
                x: moveX, 
                y: bottomLeft.y + this.labelMarginX,
                textAlign: this.labelTextAlign
            });
            
            moveX += this._stepX;
        }
    }

    #_generateLabelsY(start, stop, step=1) {
        const labels = [];
        
        for(let i=stop; i>=start; i-=step){
            labels.push(i);
        }

        return labels;
    }

    #_defaultLineStyle() {
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.lineWidth;
    }

    #_isZeroPoint(y) {
        return y === 0;
    }

    #_drawGridY() {
        const { topLeft, topRight } = this.position;

        let moveY = topLeft.y;

        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.lineWidth;

        const labels = this.#_generateLabelsY(this._y.y1, this._y.y2, this._y.step);
        let fillStyle = 'black';

        for(let label of labels) {

            if(this.#_isZeroPoint(label)) {
                this.ctx.strokeStyle = 'red';
                this.ctx.lineWidth = 1;
                fillStyle = 'red';
            }
            
            this.#_drawLine(topLeft.x - this.markerYlength, moveY, topRight.x, moveY);
            this.#_drawText({text: `${label}`, x: topLeft.x - this.markerYlength - this.labelMarginY, y: moveY, textAlign:'right', fillStyle});
            moveY += this._stepY * this._y.step;

            if(this.#_isZeroPoint(label)){
                this.#_defaultLineStyle();
                fillStyle = 'black';
            }
        }
    }
}

export default Axis;