import React, {  useEffect, useState } from 'react';
import * as d3 from "d3";
import HistoGramBar from "./HistoGramBar";

function HistoGramBarChart({ width, height }) {

    const [usHistoryData, setUsHistoryData] = useState([]);

    useEffect(() => {
        fetch('https://api.covidtracking.com/v1/us/daily.json').then((resp) => {
            if (!resp.ok) {
                throw new Error('Network response was not ok');
            }
            return resp.json();
        }).then((data) => {
            let displayData = data.slice(0,90)
            displayData.forEach((ele) => {
                ele.date = ele.date.toString();
                let year = ele.date.slice(0,4)
                let month = ele.date.slice(4,6)
                let day = ele.date.slice(6,8)
                ele.date = year + "-" + month + "-" + day;
            })
            console.log(displayData)
            displayData = displayData.reverse();
            setUsHistoryData(displayData)
        }).catch((error) => {
            console.error('Error:', error);
        });

    }, []);

    // scaleBand type
    const xScale = d3.scaleTime()
        .domain([new Date("2020-07-12"), new Date("2020-10-09")])
        .rangeRound([0, 900])

    // scaleLinear type
    const yScale = d3.scaleLinear()
        // scaleLinear domain required at least two values, min and max
        .domain([0, 8000000])
        .rangeRound([0,300])

    return (
        <svg className="histogram-bar-chart" width={900} height={350}>
            <HistoGramBar data={usHistoryData} scales={{ xScale, yScale }}/>
        </svg>
    )
}

export default HistoGramBarChart;