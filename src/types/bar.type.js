import BaseChart from "./base.type.js";


export default class BarChart extends BaseChart {

    _strokeStyle='#e48dec';
    _globalAlpha = 0.3
    _lineWidth = 1;

    amountBars = 0;

    constructor(id, options) {
        if (options.labels) {
            options.labels.push("");
        }
        super(id, options);
        this.amountBars = options.labels.length;
    }

    drawDatasets() {
        const { zeroPoint } = this._dataset;
        const ctx = this._dataset.canvas.ctx;

        ctx.lineWidth = this._lineWidth;
        ctx.globalAlpha = this._globalAlpha;
        ctx.lineCap = "round";
        const barWidth = (this._axis.stepX - 6) / this.options.datasets.length;

        let shift = 0;
        let margin = 3;

        for (let dataset of this.options.datasets) {

            ctx.fillStyle = dataset.color;
            ctx.strokeStyle = dataset.color;

            
            dataset.data.forEach((item, idx) => {
                const y = zeroPoint.y - (item * this._axis.stepY);
                const x = zeroPoint.x + (idx * this._axis.stepX);


                const height = zeroPoint.y - y;

                ctx.beginPath();
                // x1, y2,x2, y1 
                ctx.rect(margin + x + shift, y, barWidth, height);
                ctx.fill();

                ctx.globalAlpha = 0.7;
                ctx.stroke();

                ctx.globalAlpha = this._globalAlpha;
            })
            shift +=barWidth
        }
    }
}