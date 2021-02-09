import React, { useState, useEffect, useRef } from 'react';

// Transpose the array ( column to row, row to column )
function TransposeArray(arr) {
    return arr[0].map((_, c) => arr.map(r => r[c]));
}

// Function to get SMA - 5
// SMA - 5 of N is ( N-5 + N-4 ... N-1 ) / 5
function SimpleMovingAverage(csvArr, indexRange) {
    // Used to store the temporary and permanent values for array
    let returnArr = [], tempSma = [], tempPer = [], tempNum = 0;

    // Use foreach function
    csvArr[3].forEach((value, index) => {
        // Only push within range
        if (indexRange[1] <= index && index <= indexRange[0]) {
            // Check if the data is at max
            if ((index + 5) < csvArr[1].length) {
                for (let i = (index + 1); i <= (index + 5); i++) {
                    //console.log(parseFloat(csvArr[1][i].substring(2)));
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

    // Push the tempPer as a row
    returnArr.push(tempPer);
    // Push the tempSma as a row
    returnArr.push(tempSma);
    // Slice the date before transposing
    returnArr.push(csvArr[0].slice(indexRange[1], indexRange[0] + 1));
    // Transpose the array for sorting
    returnArr = TransposeArray(returnArr);

    // Sort the array using float values
    returnArr = returnArr.sort(function (a, b) {
        return b[0] - a[0];
    });

    // Add the % sign and convert to fixed point 2 string
    returnArr.forEach((value) => {
        value[0] = value[0].toFixed(2) + '%';
    });
    // Add the $ sign and convert to fixed point 2 string
    returnArr.forEach((value) => {
        value[1] = ' $' + value[1].toFixed(2);
    });

    // Return the 2D array
    return returnArr;
}

export default function ThirdTask({ csvData, indexRange }) {
    // The loading useState
    const [isLoading, setLoading] = useState(true);
    // The arrays for storing data useRef
    const averageArr = useRef([]);

    // Check the data 
    useEffect(() => {
        // Validation data function
        const fetchData = () => {
            // Check if the data and range is valid
            if (csvData.length > 1) {
                // Disable loading
                setLoading(false);
            }
        };
        // Use validation data function
        fetchData();
    }, [csvData])

    // The loading return
    if (isLoading) {
        return <div>Waiting for file</div>
    }

    // Store the data into array
    averageArr.current = SimpleMovingAverage(csvData, indexRange);

    // Render a row from array
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

    // If loading is over, return
    return (
        <div>
            <h1>SMA - 5</h1>
            {averageArr.current.map(renderTables)}
        </div>
    )
}
