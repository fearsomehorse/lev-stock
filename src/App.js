import React from "react";
import nasdaq from "./data/nasdaq.json";
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import "./App.css";

const labels = nasdaq.map((_) => _.Date);
const nasdaqData = nasdaq.map((_) => _["Adj Close"]);

function App() {
    return (
        <div className="App">
            <LineChart width={1200} height={800} data={nasdaq}>
                <Line type="basis" dataKey="Adj Close" stroke="#8884d8" dot={false}/>
                <XAxis dataKey="Date" />
                <YAxis />
            </LineChart>
        </div>
    );
}

export default App;
