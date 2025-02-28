import Axis from '../elements/axis.element.js';
import Config from '../models/config.model.js'
import Canvas from '../canvas/canvas.js';
import Dataset from '../elements/dataset.element.js';
import HTMLElementHelper from '../helpers/element.helper.js';


export default class BaseChart {
    constructor(id, options) {

        this._canvas = new Canvas(id);
        this.options = new Config(options);
        this._showAxis = 'showAxis' in options ? options.showAxis : true;
        this._axis = new Axis(this._canvas, this.options);


        const datasetCanvasHTMLElement = HTMLElementHelper.create('chart-dataset', 'canvas');
        const parent = this._canvas.src.parentElement;
        parent.insertBefore(datasetCanvasHTMLElement, this._canvas.src);

        const datasetCanvas = new Canvas(datasetCanvasHTMLElement.id);
        this._dataset = new Dataset(datasetCanvas, this._axis);
    }

    get canvas() {
        return this._canvas;
    }

    get x() {
        return this.canvas.src.getBoundingClientRect().x;
    }

    get y() {
        return this.canvas.src.getBoundingClientRect().y;
    }

    create() {
        this.canvas.scale();

        if (this._showAxis) {
            this._axis.draw();
        }

        this._dataset.canvas.scale();

        this.drawDatasets();
    }

    drawDatasets() {
        throw new Error("Function drawDatasets() is not define.")
    }
}