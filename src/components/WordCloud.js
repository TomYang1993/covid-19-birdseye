
import React, { useRef, useEffect } from 'react';
import * as d3 from "d3";
import cloud from 'd3-cloud';


function WordCloud({width, height}) {


    const ref = useRef();

 

    useEffect(() => {
        const svg = d3.select(ref.current)
        .attr("width", width)
        .attr("height", height)
        .style("border", "2px solid black")

        const draw = (words) => {
            svg
            .append("g")
              .attr("transform", "translate(" + 250 + "," + 250 + ")")
            .selectAll("text")
              .data(words)
            .enter().append("text")
              .style("font-size", function(d) { return d.size + "px"; })
              .style("font-family", "Impact")
              .attr("text-anchor", "middle")
              .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
              })
              .text(function(d) { return d.text; });
        }

        let layout = cloud()
        .size([500, 500])
        .words([
          "Hello", "world", "normally", "you", "want", "more", "words",
          "than", "this"].map(function(d) {
          return {text: d, size: 10 + Math.random() * 90, test: "haha"};
        }))
        .padding(5)
        .rotate(function() { return ~~(Math.random() * 2) * 90; })
        .font("Impact")
        .fontSize(function(d) { return d.size; })
        .on("end", draw);

    
        layout.start();
      
    }, []);

    return (
        <div className="word-cloud">
            <svg ref={ref}>
            </svg>
        </div>
        
    )

}

export default WordCloud;