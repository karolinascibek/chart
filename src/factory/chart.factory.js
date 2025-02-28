import BarChart from "../types/bar.type.js";
import LineChart from "../types/line.type.js";
import PointChart from "../types/point.type.js";

const chartTypes = {
    "line": LineChart,
    "point": PointChart,
    "bar": BarChart
}

export default class ChartFactory {
    static create(type) {

        if(typeof type !== 'string') {
            throw new Error(`Type chart must be a string. (${type} is not a string).`);
        }

        const ChartClass = chartTypes[type];

        if(!ChartClass) {
            throw new Error(`Chart type "${type}" is unknown.`);
        }

        return ChartClass;
    }
}