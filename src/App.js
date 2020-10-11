import React, {useState} from 'react';
import WordCloud from './components/WordCloud';
import HistoGramBarChart from "./components/HistoGramBarChart";
import './App.css';


function App() {

    const [caseType, setCaseType] = useState("positive")


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
            <HistoGramBarChart width={900} height={400} caseType={caseType}/>
        </div>
    );
}

export default App;