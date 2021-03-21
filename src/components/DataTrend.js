import React, { useEffect, useState } from 'react';

/*
Calculate the number of days
which where between upward trend
*/
function UpwardTrend(arr, indexRange) {
    let counter = 1, tempCounter = 1;
    let array = [], tempArray = [];

    /*
    Index and data validation
    Check the values between valid index
    If data is rising, count up
    */
    arr[1].forEach((value, index) => {
        if (indexRange[1] <= index && index <= indexRange[0]) {
            if (parseFloat(value.substring(2)) > parseFloat(arr[1][index + 1].substring(2)) && index < indexRange[0]) {
                // Add to the temp counter and push the index to the temp array
                tempCounter++;
                tempArray.push(index);
                tempArray.push(index + 1);
            }
            else if (parseFloat(value.substring(2)) > parseFloat(arr[1][index + 1].substring(2)) && index === indexRange[0]) {
                if (counter < tempCounter) {
                    // Save the counter and the index
                    tempArray.push(index);
                    counter = tempCounter;
                    array = tempArray;
                }
            }
            else {
                if (counter < tempCounter) {
                    counter = tempCounter;
                    array = tempArray;
                }

                tempArray = [];
                tempCounter = 1;
            }
        }
    });

    // If the counter is 2 or higher return trend message
    if (counter >= 2) {
        return ('In Apple stock historical data the Close/Last price increased ' + counter + ' days in a row between ' + arr[0][array[array.length - 1]] + ' and ' + arr[0][array[0]]);
    } else return ('In Apple stock historical data the Close/Last price did not increase');
}

export default function DataTrend({ csvData, indexRange }) {
    const [isLoading, setLoading] = useState(true);

    // Check if data exists
    useEffect(() => {
        const fetchData = () => {
            if (csvData.length > 0) {
                setLoading(false);
            }
        };
        fetchData();
    }, [csvData])

    // Loop until data is valid
    if (isLoading) {
        return <div>Waiting for file</div>
    }

    return (
        <div>
            {UpwardTrend(csvData, indexRange)}
        </div>
    )
}
