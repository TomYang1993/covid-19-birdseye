import React, {useEffect, useState} from 'react';
import * as d3 from "d3";
import HistoGramBar from "./HistoGramBar";
import HistoGramAxis from "./HistoGramAxis"

function HistoGramBarChart({width, height, caseType}) {
    const margins = {bottom: 50, left: 70, top: 20, right: 50}
    const [usHistoryData, setUsHistoryData] = useState([]);
    const [currentHighlight, setCurrentHighlight] = useState(null);


    const yMaxDomains ={
        positive: 8000000,
        deathIncrease: 2000,
        positiveIncrease: 100000
    }

    useEffect(() => {
        fetch('https://api.covidtracking.com/v1/us/daily.json').then((resp) => {
            if (!resp.ok) {
                throw new Error('Network response was not ok');
            }
            return resp.json();
        }).then((data) => {
            let displayData = data.slice(0, 88)
            displayData.forEach((ele) => {
                ele.date = ele.date.toString();
                let year = ele.date.slice(0, 4)
                let month = ele.date.slice(4, 6)
                let day = ele.date.slice(6, 8)
                ele.date = year + "-" + month + "-" + day;
            })
            console.log(displayData)
            displayData = displayData.reverse();
            setUsHistoryData(displayData)
        }).catch((error) => {
            console.error('Error:', error);
        });

        // componentWillUnmount
        return () => {
            console.log("clean up side effects")
        }

    }, []);

    const highlightBar = index => {
        setCurrentHighlight(index)
    }


    // scaleBand type
    const xScale = d3.scaleTime()
        .domain([new Date("2020-07-13"), new Date("2020-10-09")])
        .rangeRound([margins.left, width - margins.right])
        .nice()

    // scaleLinear type
    const yScale = d3.scaleLinear()
        // scaleLinear domain required at least two values, min and max
        .domain([yMaxDomains[caseType], 0])
        .rangeRound([0, height - margins.bottom - margins.top])

    const xAxisProps = {
        orient: 'Bottom',
        scale: xScale,
        translate: `translate(0, 350)`,
        tickSize: 25,
    }

    const yAxisProps = {
        orient: 'Left',
        scale: yScale,
        translate: `translate(70, 20)`,
        tickSize: 20,
    }

    return (
        <svg className="histogram-bar-chart" width={width} height={height}>
            <HistoGramBar data={usHistoryData} scales={{xScale, yScale}} highlightBar={highlightBar} highlightedBar={currentHighlight} caseType={caseType}/>
            <HistoGramAxis {...xAxisProps} />
            <HistoGramAxis {...yAxisProps} caseType={caseType}/>
        </svg>
    )
}

export default HistoGramBarChart;