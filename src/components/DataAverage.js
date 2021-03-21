import React, { useState, useEffect } from 'react';

function TransposeArray(arr) {
    return arr[0].map((_, c) => arr.map(r => r[c]));
}

/*
Return a stock data SMA - 5 Average calculation array
*/
function SimpleMovingAverage(csvArr, indexRange) {
    let returnArr = [], tempSma = [], tempPer = [], tempNum = 0;

    csvArr[3].forEach((value, index) => {
        if (indexRange[1] <= index && index <= indexRange[0]) {
            if ((index + 5) < csvArr[1].length) {
                for (let i = (index + 1); i <= (index + 5); i++) {
                    // Get the valid value sum
                    tempNum += parseFloat(csvArr[1][i].substring(2))
                }
                // Push the SMA - 5 for the day
                tempSma.push(tempNum / 5);
                // Push the opening price and SMA - 5 percentage difference
                tempPer.push((Math.abs(1 - (parseFloat(value.substring(2)) / (tempNum / 5))) * 100));
                tempNum = 0;
            }
        }
    });

    returnArr.push(tempPer);
    returnArr.push(tempSma);

    returnArr.push(csvArr[0].slice(indexRange[1], indexRange[0] + 1));
    returnArr = TransposeArray(returnArr);
    returnArr = returnArr.sort(function (a, b) {
        return b[0] - a[0];
    });

    // Add the % sign and convert to fixed point 2 string
    returnArr.forEach((value) => {
        value[0] = value[0].toFixed(2) + '%';
    });
    returnArr.forEach((value) => {
        value[1] = ' $' + value[1].toFixed(2);
    });

    return returnArr;
}

export default function DataAverage({ csvData, indexRange }) {
    const [isLoading, setLoading] = useState(true);

    // Check if data exists
    useEffect(() => {
        const fetchData = () => {
            // Check if the data and range is valid
            if (csvData.length > 1) {
                // Disable loading
                setLoading(false);
            }
        };
        fetchData();
    }, [csvData])

    // Loop until data is valid
    if (isLoading) {
        return <div>Waiting for file</div>
    }

    const renderTables = (section, index) => {
        return (
            <table key={index}>
                <tbody style={{ color: 'black' }}>
                    <tr key={index}>
                        <td>{section[0]} - {section[1]} - {section[2]}</td>
                    </tr>
                </tbody>
            </table>
        )
    }

    return (
        <div>
            <h1>SMA - 5</h1>
            {SimpleMovingAverage(csvData, indexRange).map(renderTables)}
        </div>
    )
}
