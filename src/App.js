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
import GanttChart from "./components/GanttChart";

function App() {

  //ejemplos de datos para el gantt: así se debe estructurar la lista gantt de cada algoritmo
  const testData = [
    { processId: 'P1', state: 'Exec', startTime: 0, endTime: 3 },
    { processId: 'P1', state: 'Block', startTime: 3, endTime: 5 },
    { processId: 'P2', state: 'Wait', startTime: 0, endTime: 3 },
    { processId: 'P1', state: 'Exec', startTime: 5, endTime: 8 },
    { processId: 'P2', state: 'Exec', startTime: 3, endTime: 6 },
    { processId: 'P2', state: 'Block', startTime: 6, endTime: 8 },
    { processId: 'P3', state: 'Wait', startTime: 0, endTime: 8 },
    { processId: 'P3', state: 'Exec', startTime: 8, endTime: 10 },
    
    // CPU desocupada
    { processId: 'IDLE', state: 'IDLE', startTime: 10, endTime: 11 },
    { processId: 'P4', state: 'Wait', startTime: 11, endTime: 13 }
  ];
  
  // uso: <GanttChart data={testData} /> en vez de test data se pone la data del algoritmo seguido de ".gantt" EJ: <GanttChart data={FcfsData.gantt} />
  // por eso cada algoritmo debe hacer return de dos listas: return { results, gantt }; 
  // results es lo que se muestra en la tabla y gantt es lo que se envía al ganttchart
  //  Se pone en el return (linea 96)

  const [processes, setProcesses] = useState([
    {
      id: "P1",
      arrival: 0,
      burst: 10,
      block: { 
        start: 3, 
        duration: 2 
      }
    },
    {
      id: "P2",
      arrival: 2,
      burst: 5,
      block: { 
        start: 6, 
        duration: 1
      }
    }
  ]);
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
      {fcfsData && (<> <FCFSResult results={fcfsData.results} /> <GanttChart data={testData} /> </>)}
      {sjfData && (<> <SJFResult results={sjfData.results} /> <GanttChart data={testData} /> </>)}
      {srtfData && <SRTFResult results={srtfData.results}/>}
      {rrData && <RRResult results={rrData.results} />}
    </div>
    
  );
}

export default App;
