import React, {useEffect, useState} from 'react';
import * as d3 from "d3";

function HistoGramBar({data, xScale, yScale, highlightedBar, highlightBar, caseType}) {

    const colorWheel = {
        tot_cases: {
            normal: "#FA8072",
            highlight: "#DC143C"
        },
        new_death: {
            normal: "#808080",
            highlight: "#303030"
        },
        new_case: {
            normal: "#FFA500",
            highlight: "#FF4500"
        },

    }

    return (
        <g onMouseOut={() => highlightBar(null)}>
            { data.map((dailyData, index) =>
                (<rect key={dailyData.submission_date}
                       x={xScale(new Date(dailyData.submission_date))}
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