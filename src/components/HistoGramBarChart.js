import React, {useEffect, useState, useRef} from 'react';
import * as d3 from "d3";
import HistoGramBar from "./HistoGramBar";
import HistoGramAxis from "./HistoGramAxis"

function HistoGramBarChart({width, height, caseType, data}) {
    const margins = {bottom: 50, left: 70, top: 20, right: 50}
    const [currentHighlight, setCurrentHighlight] = useState(null);

    const findNearest = (caseMax) => {
        let str = caseMax.toString();
        let result = ''
        if (str[0] === '9') {
            return 10 ** (str.length)
        } else {
            return (str[0] * 1 + 1) * 10 ** (str.length - 1)
        }

    }

    let positiveCases = data.map(e => e.positive);
    let deathIncreaseCases = data.map(e => e.deathIncrease);
    let positiveIncreaseCases = data.map(e => e.positiveIncrease);
    let caseMax = Math.max(...positiveCases);


    const yMaxDomains = {
        positive: findNearest(caseMax),
        deathIncrease: 2000,
        positiveIncrease: 100000
    }
    const yScale = d3.scaleLinear()
        // scaleLinear domain required at least two values, min and max
        .domain([yMaxDomains[caseType], 0])
        .rangeRound([0, height - margins.bottom - margins.top])

    const yAxisProps = {
        orient: 'Left',
        scale: yScale,
        translate: `translate(70, 20)`,
        tickSize: 20,
    }
    console.log(yMaxDomains)


    const highlightBar = index => {
        setCurrentHighlight(index)
    }

    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 89 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    console.log("startDate the ", startDate)
    console.log("endDate the same", endDate)
    // scaleBand type
    const xScale = d3.scaleTime()
        .domain([new Date(startDate), new Date(endDate)])
        .rangeRound([margins.left, width - margins.right])
        .nice()

    const xAxisProps = {
        orient: 'Bottom',
        scale: xScale,
        translate: `translate(0, 350)`,
        tickSize: 25,
    }


    return (
        <div>
            {
                (data && data.length > 0) ? (<svg className="histogram-bar-chart" width={width} height={height}>
                    <HistoGramBar data={data} xScale={xScale} yScale={yScale} highlightBar={highlightBar}
                                  highlightedBar={currentHighlight} caseType={caseType}/>
                    <HistoGramAxis {...xAxisProps} />
                    <HistoGramAxis {...yAxisProps} caseType={caseType}/>
                </svg>) : <div></div>
            }
        </div>
    )
}

export default HistoGramBarChart;