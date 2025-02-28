import BaseChart from "./base.type.js";


export default class PointChart extends BaseChart {

    constructor(id, options) {
        super(id, options);
    }

    drawDatasets() {
        const { zeroPoint } = this._dataset;
        const ctx = this._dataset.canvas.ctx;

        for(let dataset of this.options.datasets) {

            dataset.data.forEach( (item, idx) => {
                const y = zeroPoint.y - (item * this._axis.stepY);
                const x = zeroPoint.x + (idx * this._axis.stepX);

                ctx.fillStyle = dataset.color;
            
                ctx.beginPath();
                ctx.arc(x, y, 4, 0, 2 * Math.PI);
                ctx.fill();
            })
        }  
    }
}