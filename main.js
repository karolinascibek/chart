import Chart from "./src/canvas/chart.canvas.js";


const chart = new Chart('myChart', {
    labels:[ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sanday'],
    type: 'point',
    datasets: [
        {
            label:'Wykres 1',
            data: [500, 120, 200, 120, -110, 160, 120],
            color: 'blue'
        },
        {
            label:'Wykres 2',
            data: [90, 200, 105, 12, -4, 50, 0],
            color: 'purple'
        },
        {
            label:'Wykres 3',
            data: [300, 120, -50, -10, -44, -150, 0],
            color: 'green'
        },
        {
            label:'Wykres 2',
            data: [90, 200, 105, 12, -4, 50, 0],
            color: 'red'
        }
    ],
    axis: {
        x: {
            labelText: "start",
        },
        y: {
            y1: -200,
            y2: 500,
            step: 100
        }
    }
});


console.log("no hej", chart )












