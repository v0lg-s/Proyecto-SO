import React from "react";

const ProcessList = ({ processes }) => {
  return (
    <div>
      <h3>Procesos</h3>
      <ul>
        {processes.map(proc => (
          <li key={proc.id}>
            Proceso {proc.id} | Llegada: {proc.arrival}, Burst: {proc.burst}
            {proc.block ? `, Bloqueo desde ${proc.block.start} durante ${proc.block.duration}` : ""}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProcessList;
