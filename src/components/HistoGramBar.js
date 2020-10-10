import React, {  useEffect, useState } from 'react';
import * as d3 from "d3";

function HistoGramBar({ data }) {

    useEffect(() => {


    }, []);

    return (
        <div className="histogram-bar">
            {data.length > 0 ? <div>{data[0].date}</div>: <div></div>}
        </div>
    )
}

export default HistoGramBar;