import React, { useState } from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import nearestDate from 'nearest-date';

// Import the parent variables
export default function DateRange({ csvData, setIndexRange }) {
    // Used to store date from daterange component, set the time to 0 for nearest 
    const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));
    const [endDate, setEndDate] = useState(null);
    // Function to set new date on change
    const onChange = dates => {
        const [start, end] = dates;
        // Set the dates for the datepicker
        setStartDate(start);
        setEndDate(end);

        // Check that the date is not null and there is data
        if (start != null && end != null && csvData.length > 0) {
            // Store the data into a new array for nearest-date component
            var array = csvData[0].map((date) => new Date(date));
            // remove the invalid date
            array.shift();

            // Find the nearest indexes and add the shift removal index back
            // Used to control overflow
            if (nearestDate(array, start) + 1 === csvData[0].length - 1) {
                setIndexRange([nearestDate(array, start), nearestDate(array, end) + 1]);
            } else {
                setIndexRange([nearestDate(array, start) + 1, nearestDate(array, end) + 1]);
            }
        }
    };

    return (
        <div>
            <DatePicker
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
            />
        </div>
    );
}