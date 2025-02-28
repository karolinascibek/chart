import ChartFactory from "../factory/chart.factory.js";


class Chart {
    constructor(id, options={}) {
        this._id = id;
        this._type = options.type;

        const TypeChart = ChartFactory.create(this._type);
        const typeChart= new TypeChart(id, options);

        typeChart.create();
    }
}

export default Chart