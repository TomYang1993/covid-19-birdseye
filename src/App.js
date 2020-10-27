import React, {useEffect, useState} from 'react';
import WordCloud from './components/WordCloud';
import HistoGramBarChart from "./components/HistoGramBarChart";
import './App.css';


function App() {

    const [caseType, setCaseType] = useState("positive")
    const [usHistoryData, setUsHistoryData] = useState([]);

    console.log("App top level render")

    useEffect(() => {
        fetch('https://api.covidtracking.com/v1/us/daily.json').then((resp) => {
            if (!resp.ok) {
                throw new Error('Network response was not ok');
            }
            return resp.json();
        }).then((data) => {
            let displayData = data.slice(0, 88)
            displayData.forEach((ele) => {
                ele.date = ele.date.toString();
                let year = ele.date.slice(0, 4)
                let month = ele.date.slice(4, 6)
                let day = ele.date.slice(6, 8)
                ele.date = year + "-" + month + "-" + day;
            })
            console.log("comes back form API",displayData)
            displayData = displayData.reverse();
            setUsHistoryData(displayData)
        }).catch((error) => {
            console.error('Error:', error);
        });

        // componentWillUnmount
        return () => {
            // console.log("clean up side effects")
        }

    }, []);

    return (
        <div className="App">
            <WordCloud width={900} height={450}/>
            <div className="histogram-title">COVID 19 Cases in U.S.A</div>
            <div className="histogram-label-section">
                <div className="histogram-label" onClick={() => {setCaseType("positive")}}>
                    <span className="histogram-label-icon" style={{ backgroundColor: '#FA8072'}}></span> Overall cases
                </div>
                <div className="histogram-label" onClick={() => {setCaseType("positiveIncrease")}}>
                    <span className="histogram-label-icon" style={{ backgroundColor: '#FFA500'}}></span> New daily cases
                </div>
                <div className="histogram-label" onClick={() => {setCaseType("deathIncrease")}}>
                    <span className="histogram-label-icon" style={{ backgroundColor: '#808080'}}></span> New death cases
                </div>
            </div>
            <HistoGramBarChart width={900} height={400} caseType={caseType} data={usHistoryData}/>
        </div>
    );
}

export default App;