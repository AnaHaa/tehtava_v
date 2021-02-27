import React, { useRef, useEffect, useState } from 'react';

function UpwardTrend(arr, indexRange) {
    let counter = 1, tempCounter = 1;
    let array = [], tempArray = [];

    arr[1].forEach((value, index) => {
        if (indexRange[1] <= index && index <= indexRange[0]) {
            if (parseFloat(value.substring(2)) > parseFloat(arr[1][index + 1].substring(2)) && index < indexRange[0]) {
                // Add to the temp counter and push the index to the temp array
                tempCounter++;

                // The array is used to save index, first index is beginning, last is the last index, since it is saved in pairs
                tempArray.push(index);
                tempArray.push(index + 1);
            }
            // Check if the value is higher than the next day ( comparing 01/07/2021 > 01/06/2021 ), if last index do counter save
            else if (parseFloat(value.substring(2)) > parseFloat(arr[1][index + 1].substring(2)) && index === indexRange[0]) {
                // Check if the temp is higher than the current saved
                if (counter < tempCounter) {
                    // Save the counter and the index's
                    tempArray.push(index);
                    counter = tempCounter;
                    array = tempArray;
                }
            }
            // If still counting and value is not what is expected, reset
            else {
                // Check if the temp is higher than the current saved
                if (counter < tempCounter) {
                    // Save the counter and the index's
                    counter = tempCounter;
                    array = tempArray;
                }

                // Return the temp - variables to zero
                tempArray = [];
                tempCounter = 1;
            }
        }
    });

    // Check if there are atleast 2 days in the trend
    if (counter >= 2) {
        // The return message
        return ('In Apple stock historical data the Close/Last price increased ' + counter + ' days in a row between ' + arr[0][array[array.length - 1]] + ' and ' + arr[0][array[0]]);
    } else return ('In Apple stock historical data the Close/Last price did not increase');
}

export default function FirstTask({ csvData, indexRange }) {
    // The loading useState
    const [isLoading, setLoading] = useState(true);
    // Variables for storing the return message
    const message = useRef('No data / No range');

    // Check the validation 
    useEffect(() => {
        const fetchData = () => {
            if (csvData.length > 0) {
                setLoading(false);
            }
        };
        // Use validation function
        fetchData();
    }, [csvData])

    // The loading return
    if (isLoading) {
        return <div>Waiting for file</div>
    }

    // Set the current message ( useRef ) using the function
    message.current = UpwardTrend(csvData, indexRange);

    return (
        <div>
            {message.current}
        </div>
    )
}
