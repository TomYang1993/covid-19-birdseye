import React, {useEffect, useRef} from 'react'
import * as d3 from 'd3'

export default function HistoGramAxis({orient, scale, tickSize, translate, caseType}) {

    const d3AxisContainer = useRef(null)

    const renderAxis = () => {
        if (d3AxisContainer.current) {
            console.log(d3AxisContainer.current)
            const axisType = `axis${orient}`
            const axis = d3[axisType]()
                .scale(scale)
                .tickPadding([12])

            d3.select(d3AxisContainer.current).call(axis)
        }
    }

    useEffect(() => {
        renderAxis();
    }, [caseType])

    return (
        <g
            className={`Axis Axis-${orient}`}
            ref={d3AxisContainer}
            transform={translate}
        />
    )
}