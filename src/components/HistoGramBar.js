import React, {  useEffect, useState } from 'react';
import * as d3 from "d3";

function HistoGramBar({ data, scales }) {

    const {xScale, yScale} = scales;

    useEffect(() => {


    }, []);

    return (
        <g>
            {data.map(dailyData =>
                (<rect key={dailyData.date}
                      x={xScale(new Date(dailyData.date))}
                      y={300 - yScale(dailyData.positive)}
                      height={yScale(dailyData.positive)}
                      width={10}
                      fill={"teal"}
                />)
            )}
        </g>
    )
}

export default HistoGramBar;