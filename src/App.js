import React, { useState } from "react";
import "./App.css";

import DropBox from "./components/DropBox";
import DateRange from "./components/DateRange";
import DataTrend from "./components/DataTrend";
import DataChange from "./components/DataChange";
import DataAverage from "./components/DataAverage";

/*
Return the default information for the website usage
*/
function Information() {
  return (
    <div>
      This website accepts Apple stock historical data csv - file. Insert or
      upload the file in the dropbox component, and then select date range.
    </div>
  );
}

/*
MVP - product ->
CSS is quickly done
*/
export default function App() {
  const [csvData, setCsvData] = useState([]);
  const [indexRange, setIndexRange] = useState([1, 1]);

  return (
    <div className="grid-main">
      <div className="grid-child-1">
        <DropBox setCsvData={setCsvData}></DropBox>
        <DateRange csvData={csvData} setIndexRange={setIndexRange} />
        <Information className="grid-child-2" />
      </div>
      <div className="grid-child-3">
        <DataTrend csvData={csvData} indexRange={indexRange} />
      </div>
      <div className="grid-child-4">
        <DataChange csvData={csvData} indexRange={indexRange} />
        <DataAverage csvData={csvData} indexRange={indexRange} />
      </div>
    </div>
  );
}
