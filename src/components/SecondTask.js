import React, { useState, useEffect, useRef } from 'react';

// Transpose the array ( column to row, row to column )
function TransposeArray(arr) {
    return arr[0].map((_, c) => arr.map(r => r[c]));
}

// Function to get change of High and Low sorted
function Change(csvArr, indexRange) {
    // Used to store the temporary and permanent values for array
    let returnArr = [], tempArr = [];

    // Use foreach function to get index, [5] is low, [4] is high
    csvArr[5].forEach((value, index) => {
        // Only push within range
        if (indexRange[1] <= index && index <= indexRange[0]) {
            // Push to array string, which is $(High - Low) to a fixed point of 2
            tempArr.push(parseFloat(csvArr[4][index].substring(2)) - parseFloat(value.substring(2)))
        }
    });

    // Push to create a 2D array
    returnArr.push(tempArr);
    // Slice the date before sorting
    returnArr.push(csvArr[0].slice(indexRange[1], indexRange[0] + 1));
    // Transpose the array for sorting
    returnArr = TransposeArray(returnArr);

    // Sort the array using float values
    returnArr = returnArr.sort(function (a, b) {
        return b[0] - a[0];
    });

    // Add the $ sign and convert to fixed point 2 string
    returnArr.forEach((value) => {
        value[0] = ' $' + value[0].toFixed(2);
    });

    // Return the 2D array
    return returnArr;
}

// Function to get volume sorted
function Volume(csvArr, indexRange) {
    // Used to store the permanent values for array
    let returnArr = [];

    // Push into returnArr the csv data, slice the range
    returnArr.push(csvArr[2].slice(indexRange[1], indexRange[0] + 1));
    returnArr.push(csvArr[0].slice(indexRange[1], indexRange[0] + 1));
    // Transpose the array for sorting
    returnArr = TransposeArray(returnArr);

    // Sort the array using volume
    returnArr = returnArr.sort(function (a, b) {
        return b[0] - a[0];
    });

    // Return the sorted array
    return returnArr;
}

export default function SecondTask({ csvData, indexRange }) {
    // The loading useState
    const [isLoading, setLoading] = useState(true);
    // The arrays for storing data useRef
    const volumeArr = useRef([]);
    const changeArr = useRef([]);

    // Check the data 
    useEffect(() => {
        const fetchData = () => {
            if (csvData.length > 1) {
                setLoading(false);
            }
        };
        fetchData();
    }, [csvData])

    // The loading return
    if (isLoading) {
        return <div>Waiting for file</div>
    }

    // Store the data into array
    changeArr.current = Change(csvData, indexRange);
    volumeArr.current = Volume(csvData, indexRange);

    // Render a row from array
    const renderTables = (section, index) => {
        return (
            <table key={index}>
                <tbody style={{ color: 'black' }}>
                    <tr key={index}>
                        <td>{section[0]} - {section[1]}</td>
                    </tr>
                </tbody>
            </table>
        )
    }

    // If loading is over, return
    return (
        <div className="grid-child-5">
            <div>
                <h1>Volume</h1>
                {volumeArr.current.map(renderTables)}
            </div>
            <div>
                <h1>Change</h1>
                {changeArr.current.map(renderTables)}
            </div>
        </div>
    )
}
