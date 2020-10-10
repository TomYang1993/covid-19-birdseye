import React from 'react';
import WordCloud from './components/WordCloud';
import HistoGramBarChart from "./components/HistoGramBarChart";
import logo from './logo.svg';
import './App.css';



function App() {
  
  return (
    <div className="App">
      <WordCloud width={960} height={500}/>
        <HistoGramBarChart />
    </div>
  );
}

export default App;


