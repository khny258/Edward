import React from 'react';
import {FlexibleXYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineMarkSeries,DiscreteColorLegend} from 'react-vis';
// import DiscreteColorLegend from 'legends/discrete-color-legend';

const ITEMS = [
    {title: 'Current Assets', color:"#A873FC"},
    {title: 'Current Liabilities', color: '#0A0A23'}];

function LineChart({data1,data2}) {

    return (
        <>
        <DiscreteColorLegend orientation="horizontal" width={300} items={ITEMS} />      
        <FlexibleXYPlot
            margin={{left: 100}}
            // width={3000/data1.length}
            height={300}
            xType="ordinal">
      
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis title="in Millions" />
            <LineMarkSeries
                data = {data1}
                title = 'Current Assets'
                // data={[
                //     {x: 'facebook', y: 4},
                //     {x: 'apple', y: 2},
                //     {x: 'google', y: 6}
                // ]}
                color="#A873FC"/>
            <LineMarkSeries
                data = {data2}
                title = 'Current Liabilities'
                // data={[
                //     {x: 'facebook', y: 4},
                //     {x: 'apple', y: 2},
                //     {x: 'google', y: 6}
                // ]}
                color="#0A0A23"/>
                          
        </FlexibleXYPlot>
        
        </>
    );
}
export default LineChart;