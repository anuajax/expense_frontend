import { Box, makeStyles, Card } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { Line } from "react-chartjs-2";
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    cards: {
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(3),
        backgroundColor: "rgba(8, 10, 12, 0.8)",

        padding: theme.spacing(1),
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'

    }
}))
const Chart = ({ data }) => {

    // const [chartData, setchartData] = useState();
    const [year, setYear] = useState(new Date().getFullYear());
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const label = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const currentYearData = data.filter(item => {
        let dt = item.date.split('/');
        return Number(dt[2]) === year;
    });
    const monthsData = (mon) => {
        return currentYearData.filter((item) => {
            let dt = item.date.split('/');
            return Number(dt[1]) === mon;
        })
    }
    const monnthsExpenses = (mon) => {
        return monthsData(mon).filter(item => !item.type).map(({ amount }) => Number(amount)).reduce((sum, i) => sum + i, 0)
    }
    const monnthsIncome = (mon) => {
        return monthsData(mon).filter(item => item.type).map(({ amount }) => Number(amount)).reduce((sum, i) => sum + i, 0)
    }
    const incomeData = label.map((mon) => monnthsIncome(mon));
    const expenseData = label.map((mon) => monnthsExpenses(mon));





    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Expenses',
                data: expenseData,
                // backgroundColor: 'rgba(200,150,100,0.6)',
                backgroundColor: 'rgba(200, 40, 40, 0.8)',
                borderColor: 'rgba(200, 40, 40, 0.8)',
                borderWidth: 2

            },
            {
                label: 'Income',
                data: incomeData,
                backgroundColor: 'rgba(100,150,100,0.8)',
                borderColor: 'rgba(100,150,100,0.8)',
                borderWidth: 2

            }
        ]
    }
    // const chartDataIncome = {
    //     labels: labels,
    //     datasets: [
    //         {
    //             label: 'Income',
    //             data: incomeData,
    //             backgroundColor: 'rgba(100,150,100,0.8)',
    //             borderColor: 'rgba(100,150,100,0.8)',
    //             borderWidth: 2

    //         }
    //     ]
    // }
    const handleChange = (e) => {
        setYear(e.target.value);
    }
    const styles = useStyles();
    return (
        <Box className={styles.container}>

            {/* <Line  width={800} height={600} data={chartDataExpense} options={{responsive: true}}  />
            <Line  width={800} height={600} data={chartDataIncome} options={{responsive: true}}  /> */}
            <Card className={styles.cards}>
                <Line width={800} height={600} data={chartData} options={{ responsive: true }} />
            </Card>
            {/* <Card className={styles.cards}>
                <Line width={800} height={600} data={chartDataIncome} options={{ responsive: true }} />
            </Card> */}
        </Box>
    )
}

export default Chart;
