import React, { useState, useEffect, useRef } from 'react';

function TransposeArray(arr) {
    return arr[0].map((_, c) => arr.map(r => r[c]));
}

/*
Sort the data and return a stock - high & low array
*/
function Change(csvArr, indexRange) {
    let returnArr = [], tempArr = [];

    // Use foreach function to get index, [5] is low, [4] is high
    csvArr[5].forEach((value, index) => {
        if (indexRange[1] <= index && index <= indexRange[0]) {
            // Push to array string, which is $(High - Low) to a fixed point of 2
            tempArr.push(parseFloat(csvArr[4][index].substring(2)) - parseFloat(value.substring(2)))
        }
    });

    returnArr.push(tempArr);
    returnArr.push(csvArr[0].slice(indexRange[1], indexRange[0] + 1));

    returnArr = TransposeArray(returnArr);
    returnArr = returnArr.sort(function (a, b) {
        return b[0] - a[0];
    });

    // Add the $ sign and convert to fixed point 2 string
    returnArr.forEach((value) => {
        value[0] = ' $' + value[0].toFixed(2);
    });

    return returnArr;
}

/*
Sort the data and return a stock - volume array
*/
function Volume(csvArr, indexRange) {
    let returnArr = [];

    // Push into returnArr the csv data, slice the range
    returnArr.push(csvArr[2].slice(indexRange[1], indexRange[0] + 1));
    returnArr.push(csvArr[0].slice(indexRange[1], indexRange[0] + 1));

    returnArr = TransposeArray(returnArr);
    returnArr = returnArr.sort(function (a, b) {
        return b[0] - a[0];
    });

    return returnArr;
}

export default function DataChange({ csvData, indexRange }) {
    const [isLoading, setLoading] = useState(true);
    const volumeArr = useRef([]);
    const changeArr = useRef([]);

    // Check if data exists
    useEffect(() => {
        const fetchData = () => {
            if (csvData.length > 1) {
                setLoading(false);
            }
        };
        fetchData();
    }, [csvData])

    // Loop until data is valid
    if (isLoading) {
        return <div>Waiting for file</div>
    }

    changeArr.current = Change(csvData, indexRange);
    volumeArr.current = Volume(csvData, indexRange);

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
