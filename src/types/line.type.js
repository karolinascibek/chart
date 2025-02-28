import BaseChart from "./base.type.js";


export default class LineChart extends BaseChart {

    constructor(id, options) {
        options.showAxis = true;
        super(id, options);

        this._strokeStyle='#e48dec';
        this._globalAlpha = 0.5
        this._lineWidth = 2;
    }

    drawDatasets() {
        const ctx = this._dataset.canvas.ctx;

        const zeroX = this._dataset.zeroPoint.x;
        const zeroY = this._dataset.zeroPoint.y;

        console.log(this._axis)
        
        ctx.lineWidth = this._lineWidth;
        ctx.globalAlpha = this._globalAlpha;
        ctx.lineCap = "round";

        const { y } = this._axis;

        for(let dataset of this.options.datasets) {
            ctx.beginPath();

            for(let i=0; i<dataset.data.length; i++) {
                let item = dataset.data[i];

                let y1 = zeroY - (item * this._axis.stepY) ;
                let x1 = zeroX + (i * this._axis.stepX);
    
                let y2 = zeroY - (dataset.data[i + 1] * this._axis.stepY);
                let x2 = zeroX + ((i + 1) * this._axis.stepX);
                
                if(i < dataset.data.length - 1) {
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                }
            }

            ctx.strokeStyle = dataset.color || this._strokeStyle;
            ctx.stroke();
            ctx.closePath();
        }  
    }
}