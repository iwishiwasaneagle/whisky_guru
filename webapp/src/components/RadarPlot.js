import React, { Component } from 'react'
import Chart from 'chart.js';
import classes from "./RadarPlot.module.css";


// export class RadarPlot extends Component {
//     chartRef = React.createRef();

//     render = () => {
//         const { flavours, name, max} = this.props;

//         return <Radar ref={this.chartRef} data={data} options={options}/>
    
//     }
// }

export class RadarPlot extends Component {
    chartRef = React.createRef();

    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        
        const { flavours, name, max, selected} = this.props
        const data = {
            labels: Object.keys(flavours),
            datasets:[
                {
                label:name,
                data:Object.values(flavours),
                borderColor: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`,
                },
                {
                    label:'Your selection',
                    data:Object.values(selected)
                }
            ]
        }
        const options = {
            scale: {
                ticks: {
                    beginAtZero: true,
                    min: 0,
                    max: max ?? 0.4,
                }
            },
            // responsive: true
        }

        new Chart(myChartRef, {
            type: "radar",
            data: data,
            options: options 
        });
    }
    render() {
        return (
            <div className={classes.graphContainer}>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}