
import React, { useRef, useEffect } from 'react';
import * as d3 from "d3";
import cloud from 'd3-cloud';

const words = [
    {
      text: 'told',
      value: 64,
    },
    {
      text: 'mistake',
      value: 11,
    },
    {
      text: 'thought',
      value: 16,
    },
    {
      text: 'bad',
      value: 17,
    },
  ]


function WordCloud({width, height}) {


    const ref = useRef();

    useEffect(() => {
        const svg = d3.select(ref.current)
            .attr("width", width)
            .attr("height", height)
            .style("border", "1px solid black")
    }, []);

    // useEffect(() => {
    //     draw();
    // }, [data]);

    const draw = () => {
        
        const svg = d3.select(ref.current);
   
    }


    return (
        <div className="word-cloud">
            <svg ref={ref}>
            </svg>
        </div>
        
    )

}

export default WordCloud;