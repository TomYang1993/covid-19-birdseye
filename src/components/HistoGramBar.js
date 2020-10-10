import React, {useEffect, useState} from 'react';
import * as d3 from "d3";

function HistoGramBar({data, scales}) {

    const {xScale, yScale} = scales;

    return (
        <g>
            {data.map(dailyData =>
                (<rect key={dailyData.date}
                       x={xScale(new Date(dailyData.date))}
                       y={yScale(dailyData.positive)}
                       height={350 - yScale(dailyData.positive)}
                       width={7}
                       fill={"teal"}
                />)
            )}
        </g>
    )
}

export default HistoGramBar;