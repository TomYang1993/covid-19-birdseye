import React, { useEffect, useState } from "react";
import WordCloud from "./components/WordCloud";
import HistoGramBarChart from "./components/HistoGramBarChart";
import "./App.css";

function App() {
  const [caseType, setCaseType] = useState("new_case");
  const [usHistoryData, setUsHistoryData] = useState([]);

  // console.log("App top level render")

  useEffect(() => {
    const opts = {
      headers: {
        "X-App-Token": "GRSvmK72hJ6S3Mj4vxoEQGvTe",
      },
    };
    fetch("https://data.cdc.gov/resource/9mfq-cb36.json?state=PA&&$where=submission_date >= '2021-06-10T12:00:00'&&$order=submission_date", opts)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Network response was not ok");
        }
        return resp.json();
      })
      .then((data) => {
        let displayData = data.slice(0, 88);
        console.log(displayData);
        displayData.forEach((ele) => {
          ele.submission_date = ele.submission_date.slice(0,10);
        });
        console.log("comes back from API", displayData);
        displayData = displayData.reverse();
        setUsHistoryData(displayData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // componentWillUnmount
    return () => {
      // console.log("clean up side effects")
    };
  }, []);

  return (
    <div className="App">
      <WordCloud width={900} height={450} />
      <div className="histogram-title">COVID 19 Cases in U.S.A</div>
      <div className="histogram-label-section">
  
        <div
          className="histogram-label"
          onClick={() => {
            setCaseType("new_case");
          }}
        >
          <span className="histogram-label-icon" style={{ backgroundColor: "#FFA500" }}></span> New daily cases
        </div>
        <div
          className="histogram-label"
          onClick={() => {
            setCaseType("new_death");
          }}
        >
          <span className="histogram-label-icon" style={{ backgroundColor: "#808080" }}></span> New death cases
        </div>
        <div
          className="histogram-label"
          onClick={() => {
            setCaseType("tot_cases");
          }}
        >
          <span className="histogram-label-icon" style={{ backgroundColor: "#FA8072" }}></span> Overall cases
        </div>
      </div>
      <HistoGramBarChart width={900} height={400} caseType={caseType} data={usHistoryData} />
    </div>
  );
}

export default App;
