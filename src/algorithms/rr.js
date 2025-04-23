export function rr(processes, quantum) {
    const queue = [];
    const n = processes.length;
    const sorted = [...processes].sort((a, b) => a.arrival - b.arrival);
    const remaining = sorted.map(p => p.burst);
    const arrivalMap = new Map();
    const result = [];
  
    sorted.forEach((p, i) => {
      arrivalMap.set(p.id, i);
    });
  
    const startTimes = new Array(n).fill(null);
    const endTimes = new Array(n).fill(0);
    const responseTimes = new Array(n).fill(null);
    const isCompleted = new Array(n).fill(false);
    const waitingTime = new Array(n).fill(0);
  
    let currentTime = 0;
    let index = 0;
  
    while (index < n || queue.length > 0) {
      while (index < n && sorted[index].arrival <= currentTime) {
        queue.push(index++);
      }
  
      if (queue.length === 0) {
        currentTime++;
        continue;
      }
  
      const current = queue.shift();
  
      if (startTimes[current] === null) {
        startTimes[current] = currentTime;
        responseTimes[current] = currentTime - sorted[current].arrival;
      }
  
      const execTime = Math.min(quantum, remaining[current]);
      remaining[current] -= execTime;
      currentTime += execTime;
  
      while (index < n && sorted[index].arrival <= currentTime) {
        queue.push(index++);
      }
  
      if (remaining[current] > 0) {
        queue.push(current); // aún tiene burst
      } else {
        isCompleted[current] = true;
        endTimes[current] = currentTime;
      }
    }
  
    const final = sorted.map((p, i) => {
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
  
    return { results: final };
  }
  