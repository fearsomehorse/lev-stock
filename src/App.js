import React from "react";
import nasdaq from "./data/nasdaq.json";
import qld from "./data/qld.json";
import qqq from "./data/qqq.json";
import spy from "./data/spy.json";
import sso from "./data/sso.json";
import nasdaq100 from "./data/ndx.json";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Label } from "recharts";
import "./App.css";

let sum = 0;
let count = 0;
const qqqFirstIndex = qqq.findIndex((_) => _["Date"] === qld[0].Date);
for (let i = qqqFirstIndex; i < qqq.length; i++) {
    if ((i - qqqFirstIndex) % 30 === 0) {
        sum += 1 / qqq[i].Close;
        count++;
    }
    qqq[i].Val = sum * qqq[i].Close;
    qqq[i].MonthGain = ((qqq[i].Val - count) / count) * 100;
    qqq[i].Gain = ((qqq[i].Close - qqq[qqqFirstIndex].Close) / qqq[qqqFirstIndex].Close) * 100;
}

sum = 0;
count = 0;
for (let i = 0; i < qld.length; i++) {
    if (i % 30 === 0) {
        sum += 1 / qld[i].Close;
        count++;
    }
    qld[i].Val = sum * qld[i].Close;
    qld[i].MonthGain = ((qld[i].Val - count) / count) * 100;
    qld[i].Gain = ((qld[i].Close - qld[0].Close) / qld[0].Close) * 100;
}

const nasdaqFirstDateIndex = nasdaq100.findIndex((_) => _["Date"] === qld[0].Date);
for (let i = nasdaqFirstDateIndex; i < nasdaq100.length; i++) {
    nasdaq100[i].Gain = ((nasdaq100[i].Close - nasdaq100[nasdaqFirstDateIndex].Close) / nasdaq100[nasdaqFirstDateIndex].Close) * 100;
}

const nasdaqETF = qld.map((_, index) => ({
    qld: _.Gain,
    qldMonth: _.MonthGain,
    qqq: qqq[qqqFirstIndex + index].Gain,
    qqqMonth: qqq[qqqFirstIndex + index].MonthGain,
    Date: _.Date,
    nasdaq100: nasdaq100[nasdaqFirstDateIndex + index] ? nasdaq100[nasdaqFirstDateIndex + index].Gain : null,
}));

function App() {
    return (
        <div className="App">
            {/* <LineChart width={1600} height={500} data={nasdaq.slice(nasdaqFirstDateIndex)}>
                <Line type="basis" dataKey="Close" stroke="#8884d8" dot={false} />
                <XAxis dataKey="Date" />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
            </LineChart> */}
            <LineChart width={1800} height={800} data={nasdaqETF} style={{ padding: 40 }}>
                <Line type="basis" dataKey="qqq" stroke="#8884d8" dot={false} />
                <Line type="basis" dataKey="qqqMonth" stroke="#82ca9d" dot={false} />
                <Line type="basis" dataKey="qld" stroke="#bbbbbb" dot={false} />
                <Line type="basis" dataKey="qldMonth" stroke="rgb(255,125,125)" dot={false} />
                <XAxis dataKey="Date" />
                <YAxis tickCount={8} label={{ value: "% Change", position: "insideLeft", angle: -90 }} />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Legend />
            </LineChart>
        </div>
    );
}

export default App;
