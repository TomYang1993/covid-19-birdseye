import React, {useEffect, useState} from 'react';
import * as d3 from "d3";

function HistoGramBar({data, scales, highlightedBar, highlightBar, caseType}) {

    const {xScale, yScale} = scales;

    const colorWheel = {
        positive: {
            normal: "#FA8072",
            highlight: "#DC143C"
        },
        deathIncrease: {
            normal: "#808080",
            highlight: "#303030"
        },
        positiveIncrease: {
            normal: "#FFA500",
            highlight: "#FF4500"
        },

    }

    return (
        <g onMouseOut={() => highlightBar(null)}>
            {data.map((dailyData, index) =>
                (<rect key={dailyData.date}
                       x={xScale(new Date(dailyData.date))}
                       y={yScale(dailyData[caseType])}
                       height={350 - yScale(dailyData[caseType])}
                       width={6}
                       fill={highlightedBar === index ? colorWheel[caseType].highlight : colorWheel[caseType].normal}
                       onMouseOver={() => highlightBar(index)}
                />)
            )}
        </g>
    )
}

export default HistoGramBar;