import React, { useState } from "react";
import ProcessForm from "./components/ProcessForm";
import ProcessList from "./components/ProcessList";
import FCFSResult from "./components/FCFSResult";
import SJFResult from "./components/SJFResult";
import SRTFResult from "./components/SRTFResult.js";
import RRResult from "./components/RRResult.js";
import { fcfs } from "./algorithms/fcfs.js";
import { sjf } from "./algorithms/sjf.js";
import { srtf } from "./algorithms/srtf.js";
import { rr } from "./algorithms/rr.js";

function App() {
  const [processes, setProcesses] = useState([
    { id: "P1", arrival: 0, burst: 8 },
    { id: "P2", arrival: 1, burst: 4 },
    { id: "P3", arrival: 2, burst: 9 },
    { id: "P4", arrival: 3, burst: 5 },]);
  const [fcfsData, setFcfsData] = useState(null);
  const [sjfData, setSjfData] = useState(null);
  const [srtfData, setSrtfData] = useState(null);
  const [rrData, setRrData] = useState(null);
  const [quantum, setQuantum] = useState(2);

  const resetResults = () => {
    setFcfsData(null);
    setSjfData(null);
    setSrtfData(null);
    setRrData(null);
  };

  const handleAddProcess = (proc) => {
    setProcesses(prev => [...prev, proc]);
    resetResults();
  };

  const handleRunFCFS = () => {
    resetResults();
    const result = fcfs(processes);
    setFcfsData(result);
  };

  const handleRunSJF = () => {
    resetResults();
    const result = sjf(processes);
    setSjfData(result);
  };

  const handleRunSRTF = () => {
    resetResults();
    const result = srtf(processes);
    setSrtfData(result);
  };

  const handleRunRR = () => {
    resetResults();
    const result = rr(processes, quantum);
    setRrData(result);
  };
  

  return (
    <div className="App">
      <h1>Planificador CPU</h1>
      <ProcessForm onAddProcess={handleAddProcess} processes={processes} />
      <div>
        <label>Quantum: </label>
        <input
          type="number"
          value={quantum}
          onChange={(e) => setQuantum(Number(e.target.value))}
        />
      </div>
      <ProcessList processes={processes} />
      <button onClick={handleRunFCFS}>Ejecutar FCFS</button>
      <button onClick={handleRunSJF}>Ejecutar SJF</button>
      <button onClick={handleRunSRTF}>Ejecutar SRTF</button>
      <button onClick={handleRunRR}>Ejecutar RR</button>
      {fcfsData && <FCFSResult results={fcfsData.results} />}
      {sjfData && <SJFResult results={sjfData.results} />}
      {srtfData && <SRTFResult results={srtfData.results}/>}
      {rrData && <RRResult results={rrData.results} />}
    </div>
    
  );
}

export default App;
