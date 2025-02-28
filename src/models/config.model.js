import { isObject } from "../helpers/utils.helper.js";

export default class Config {

    constructor(options) {

        if(!isObject(options)) {
            throw new Error('Wrong type. Options param should be object');
        }

        this.datasets = options.datasets;
        this.labels = options.labels;
        this.axis = options.axis;
    }
}