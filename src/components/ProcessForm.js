import React, { useState } from "react";


const ProcessForm = ({ onAddProcess,processes }) => {
  const [arrival, setArrival] = useState("");
  const [burst, setBurst] = useState("");
  const [blockStart, setBlockStart] = useState("");
  const [blockDuration, setBlockDuration] = useState("");

  const getNextId = () => {
    if (processes.length === 0) return "P1";
    
    // Extract all numeric parts of IDs and find the maximum
    const maxId = Math.max(...processes.map(proc => {
      const numPart = proc.id.replace(/^\D+/g, ''); // Remove non-digit characters
      console.log(numPart)
      return parseInt(numPart, 10) || 0;
    }));
    
    return `P${maxId + 1}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProcess({
      id: getNextId(),
      arrival: Number(arrival),
      burst: Number(burst),
      block: blockStart && blockDuration ? {
        start: Number(blockStart),
        duration: Number(blockDuration)
      } : null
    });
    setArrival(""); setBurst(""); setBlockStart(""); setBlockDuration("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Agregar Proceso</h3>
      <input type="number" placeholder="Llegada" value={arrival} onChange={e => setArrival(e.target.value)} required />
      <input type="number" placeholder="Burst Time" value={burst} onChange={e => setBurst(e.target.value)} required />
      <input type="number" placeholder="Inicio Bloqueo" value={blockStart} onChange={e => setBlockStart(e.target.value)} />
      <input type="number" placeholder="Duración Bloqueo" value={blockDuration} onChange={e => setBlockDuration(e.target.value)} />
      <button type="submit">Agregar</button>
      
    </form>
  );
};

export default ProcessForm;
