import React, { useState } from 'react'
import {Line} from "react-chartjs-2";

const Chart = () => {

    const [chartData, setchartData] = useState({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Expenses',
                data: [10000, 20000, 15000, 24000, 11000, 8000, 9000, 12500, 8700, 3200, 10000, 12313],
                backgroundColor: 'rgba(200,150,100,0.6)',
                borderColor: 'wheat',
                borderWidth: 2
            
            }
        ]
    });

    return (
        <div>
            <Line width={400} height={250} data={chartData} options={{responsive: true}}  />
        </div>
    )
}

export default Chart;
