import React from "react";

const SJFResult = ({ results }) => {
  return (
    <div>
      <h3>Resultados SJF</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Proceso</th>
            <th>Llegada</th>
            <th>Burst</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Retorno</th>
            <th>Espera</th>
            <th>Perdido</th>
            <th>Penalidad</th>
            <th>Respuesta</th>
          </tr>
        </thead>
        <tbody>
          {results.map(r => (
            <tr key={r.pid}>
              <td>{r.pid}</td>
              <td>{r.arrival}</td>
              <td>{r.burst}</td>
              <td>{r.start}</td>
              <td>{r.finish}</td>
              <td>{r.returnTime}</td>
              <td>{r.waitTime}</td>
              <td>{r.lostTime}</td>
              <td>{r.penalty.toFixed(2)}</td>
              <td>{r.responseTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SJFResult;
