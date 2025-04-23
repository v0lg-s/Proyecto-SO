export function sjf(processes) {
    const procList = [...processes].map(p => ({ ...p }));
    const results = [];
    const gantt = [];
    let currentTime = 0;
  
    while (procList.length > 0) {
      // Filtrar los procesos que ya llegaron
      const ready = procList.filter(p => p.arrival <= currentTime);
      if (ready.length === 0) {
        currentTime += 1;
        continue;
      }
  
      // Escoger el de menor burst
      ready.sort((a, b) => a.burst - b.burst);
      const proc = ready[0];
      procList.splice(procList.findIndex(p => p.id === proc.id), 1);
  
      const startTime = currentTime < proc.arrival ? proc.arrival : currentTime;
  
      if (proc.block && proc.block.start < proc.burst) {
        gantt.push(
          { type: "exec", pid: proc.id, start: startTime, end: startTime + proc.block.start },
          { type: "block", pid: proc.id, start: startTime + proc.block.start, end: startTime + proc.block.start + proc.block.duration },
          { type: "exec", pid: proc.id, start: startTime + proc.block.start + proc.block.duration, end: startTime + proc.burst + proc.block.duration }
        );
  
        currentTime = startTime + proc.burst + proc.block.duration;
      } else {
        gantt.push({ type: "exec", pid: proc.id, start: startTime, end: startTime + proc.burst });
        currentTime = startTime + proc.burst;
      }
  
      const finish = currentTime;
      const returnTime = finish - proc.arrival;
      const waitTime = startTime - proc.arrival;
      const lostTime = returnTime - proc.burst;
      const penalty = returnTime / proc.burst;
      const responseTime = waitTime;
  
      results.push({
        pid: proc.id,
        arrival: proc.arrival,
        burst: proc.burst,
        start: startTime,
        finish,
        returnTime,
        waitTime,
        lostTime,
        penalty,
        responseTime
      });
    }
  
    return { results, gantt };
  }
  