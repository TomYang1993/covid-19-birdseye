
import React, { useRef, useEffect } from 'react';
import * as d3 from "d3";
import cloud from 'd3-cloud';
import {output} from './wordcloudJSON'

function WordCloud({ width, height }) {
    const fillColors = d3.scaleOrdinal(d3.schemeDark2);
    const ref = useRef();

    useEffect(() => {
        // console.log(output)
        const svg = d3.select(ref.current)
            .attr("width", width)
            .attr("height", height)
            // .style("border", "2px solid black")


        const draw = (words) => {
            const group = svg
                .append("g")
                .attr("transform", "translate(480,250)");

                group.selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function (d) { return d.size + "px"; })
                .style("font-family", "Impact")
                .style("fill", function(d) { return fillColors(d.size); })
                .attr("text-anchor", "middle")
                .attr("transform", function (d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function (d) { return d.text; });

            // let X0 = d3.min( words, function (d) {
            //         return d.x - (d.width/2);
            //     }),
            //     X1 = d3.max( words, function (d) {
            //         return d.x + (d.width/2);
            //     });
            //
            // let Y0 = d3.min( words, function (d) {
            //         return d.y - (d.height/2);
            //     }),
            //     Y1 = d3.max( words, function (d) {
            //         return d.y + (d.height/2);
            //     });
            //
            // let scaleX = (X1 - X0) / (width);
            // let scaleY = (Y1 - Y0) / (height);
            //
            // let scale = 1 / Math.max(scaleX, scaleY);
            //
            // let translateX = Math.abs(X0) * scale;
            // let translateY = Math.abs(Y0) * scale;
            // // console.log("scale", scale)
            // // console.log("X", translateX)
            // // console.log("Y", translateY)
            //
            //
            // group.attr(
            //     " scale(" + scale + ")");
        }

        let layout = cloud()
            .size([960, 500])
            .words(output.map(function (d) {
                    return { text: d.key, size: 10 + d.value * 4, test: "haha" };
                }))
            .padding(5)
            .rotate(function () { return d3.randomInt(-60, 60)(); })
            .font("Impact")
            .fontSize(function (d) { return d.size; })
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