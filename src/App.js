import React, { useState } from 'react';
import './App.css'

// Import child components
import DropBox from './components/DropBox';
import DateRange from './components/DateRange';
import FirstTask from './components/FirstTask';
import SecondTask from './components/SecondTask';
import ThirdTask from './components/ThirdTask';

export default function App() {
  // Variables for child components
  // Used to store csv data from dropbox component
  const [csvData, setCsvData] = useState([]);
  // Used to store the date range index's, 1 is default
  const [indexRange, setIndexRange] = useState([1, 1]);

  return (
    <div className="grid-main">
      <div className="grid-child-1">
        <DropBox setCsvData={setCsvData}></DropBox>
        <DateRange csvData={csvData} setIndexRange={setIndexRange} />
        <div className="grid-child-2">
          This website accepts Apple stock historical data csv - file.
          Insert or upload the file in the dropbox component, and then select date range.
        </div>
      </div>
      <div className="grid-child-3">
        <FirstTask csvData={csvData} indexRange={indexRange} />
      </div>
      <div className="grid-child-4">
        <SecondTask csvData={csvData} indexRange={indexRange} />
        <ThirdTask csvData={csvData} indexRange={indexRange} />
      </div>
    </div>
  );
}