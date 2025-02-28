import HTMLElementHelper from "../helpers/element.helper.js";
const defaultOptions = {
    padding: {
        left: 54,
        bottom: 23,
        right: 50,
        top: 111,
    },
    margin: 0
}

export default class Canvas {
    constructor(canvasId, options={}) {
        this._src = document.getElementById(canvasId);

        if(!this._src) {
            throw new Error(`Nie odnaleziono elementu HTML o id: ${canvasId}`)
        }
        this._ctx = this._src.getContext('2d');
        this._margin = options.margin || defaultOptions.margin;
        this._padding = options.padding || defaultOptions.padding;

        
    }

    get src() {
        return this._src;
    }

    get ctx() {
        return this._ctx;
    }

    get height() {
        return this.src.getBoundingClientRect().height;
    }

    get width() {
        return this.src.getBoundingClientRect().width;
    }

    get padding() {
        return this._padding;
    }

    get margin() {
        return this._margin;
    }


    setBackground(color) {
        HTMLElementHelper.setBackground(this.src, color)
    }

    setPosition(options) {
        HTMLElementHelper.setPosition(
            this.src,
            options.position,
            {
                top: options.top,
                left: options.left
            }
        );

    }

    setHeight(value) {
        HTMLElementHelper.setHeight(this.src, value);
    }

    setWidth(value) {
        HTMLElementHelper.setWidth(this.src, value);
    }

    scale() {
        const rect = this.src.getBoundingClientRect();
        const dpr = window.devicePixelRatio;

        this.src.width = rect.width * dpr;
        this.src.height = rect.height * dpr;

        this.ctx.scale(dpr, dpr);

        this.src.style.width = `${rect.width}px`;
        this.src.style.height = `${rect.height}px`;
    }
}