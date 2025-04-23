export function srtf(processes) {
    const sorted = [...processes].sort((a, b) => a.arrival - b.arrival);
    const n = sorted.length;
    const remaining = sorted.map(p => p.burst);
    const isCompleted = new Array(n).fill(false);
    const startTimes = new Array(n).fill(null);
    const endTimes = new Array(n).fill(0);
    const responseTimes = new Array(n).fill(null);
  
    let currentTime = 0;
    let completed = 0;
  
    while (completed < n) {
      let idx = -1;
      let minRemaining = Infinity;
  
      for (let i = 0; i < n; i++) {
        if (!isCompleted[i] && sorted[i].arrival <= currentTime && remaining[i] < minRemaining && remaining[i] > 0) {
          minRemaining = remaining[i];
          idx = i;
        }
      }
  
      if (idx === -1) {
        currentTime++;
        continue;
      }
  
      if (startTimes[idx] === null) startTimes[idx] = currentTime;
      if (responseTimes[idx] === null) responseTimes[idx] = currentTime - sorted[idx].arrival;
  
      remaining[idx]--;
      currentTime++;
  
      if (remaining[idx] === 0) {
        isCompleted[idx] = true;
        completed++;
        endTimes[idx] = currentTime;
      }
    }
  
    const results = sorted.map((p, i) => {
      const turnaround = endTimes[i] - p.arrival;
      const waiting = turnaround - p.burst;
      const lost = waiting;
      const penalty = +(turnaround / p.burst).toFixed(2);
      const response = responseTimes[i];
      return {
        ...p,
        start: startTimes[i],
        end: endTimes[i],
        retorno: turnaround,
        espera: waiting,
        perdido: lost,
        penalidad: penalty,
        respuesta: response,
      };
    });
  
    return { results };
  }
  