import React from 'react'
import { Chart } from 'react-google-charts'

function TickCharts(props) {
  const { tickets } = props
    return (
      <div>
        <Chart
          width={'600px'}
          height={'600px'}
          chartType='PieChart'
          loader={<div>Loading Chart</div>}
          data={[
            ['Priorities', 'Count'],
            [
              'High',
              tickets.filter(
                (ticket) => ticket.priority === 'high' && !ticket.isResolved).length,
            ],
            [
              'Medium',
              tickets.filter(
                (ticket) => ticket.priority === 'medium' && !ticket.isResolved).length,
            ],
            [
              'Low',
              tickets.filter(
                (ticket) => ticket.priority === 'low' && !ticket.isResolved).length,
            ],
          ]}
          options={{
            title: 'Ticket Priorities',
            // Just add this option
            pieHole: 0.4,
          }}
        />
        <Chart
          width={'600px'}
          height={'400px'}
          chartType='Bar'
          loader={<div>Loading Chart</div>}
          data={[['Departments', 'Tickets'], ...props.chartTable()]}
          options={{
            // Material design options
            chart: {
              title: 'Tickets by department',
            },
          }}
        />
      </div>
    )
}

export default TickCharts
