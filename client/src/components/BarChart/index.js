import React from 'react';
import {FlexibleXYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalBarSeries} from 'react-vis';

function BarChart({data}) {

        return (
            <FlexibleXYPlot
                margin={{left: 100}}
                // width={2000/data.length}
                height={350}
                xType="ordinal"
                >
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis title="in Millions" />
                <VerticalBarSeries
                    data = {data}
                    // data={[
                    //     {x: 'facebook', y: 4},
                    //     {x: 'apple', y: 2},
                    //     {x: 'google', y: 6}
                    // ]}
                    color="#A873FC"/>
            </FlexibleXYPlot>
        );
}
export default BarChart;