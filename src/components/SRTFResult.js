import React from "react";

const SRTFResult = ({ results }) => {
  return (
    <div>
      <h2>Resultados SRTF</h2>
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
          {results.map((p, i) => (
            <tr key={i}>
              <td>{p.id}</td>
              <td>{p.arrival}</td>
              <td>{p.burst}</td>
              <td>{p.start}</td>
              <td>{p.end}</td>
              <td>{p.retorno}</td>
              <td>{p.espera}</td>
              <td>{p.perdido}</td>
              <td>{p.penalidad}</td>
              <td>{p.respuesta}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SRTFResult;
