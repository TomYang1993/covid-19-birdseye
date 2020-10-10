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
            console.log(data)
            data = data.slice(200)
            setUsHistoryData(data)
        }).catch((error) => {
            console.error('Error:', error);
        });

    }, []);

    return (
        <div className="histogram-bar-chart">
            <HistoGramBar data={usHistoryData}/>
        </div>
    )
}

export default HistoGramBarChart;