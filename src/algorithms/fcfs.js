export function fcfs(processes) {
    // Ordenar por llegada
    const sorted = [...processes].sort((a, b) => a.arrival - b.arrival);
  
    let currentTime = 0;
    const results = [];
    const gantt = [];
  
    for (const proc of sorted) {
      const startTime = Math.max(currentTime, proc.arrival);
      const block = proc.block;
      let executionTimeline = [];
  
      if (block && block.start < proc.burst) {
        // Primera parte antes del bloqueo
        executionTimeline.push({
          type: "exec",
          start: startTime,
          end: startTime + block.start,
          pid: proc.id
        });
  
        // Bloqueo
        executionTimeline.push({
          type: "block",
          start: startTime + block.start,
          end: startTime + block.start + block.duration,
          pid: proc.id
        });
  
        // Segunda parte después del bloqueo
        executionTimeline.push({
          type: "exec",
          start: startTime + block.start + block.duration,
          end: startTime + proc.burst + block.duration,
          pid: proc.id
        });
  
        currentTime = startTime + proc.burst + block.duration;
      } else {
        executionTimeline.push({
          type: "exec",
          start: startTime,
          end: startTime + proc.burst,
          pid: proc.id
        });
  
        currentTime = startTime + proc.burst;
      }
  
      gantt.push(...executionTimeline);
  
      const finishTime = currentTime;
      const returnTime = finishTime - proc.arrival;
      const waitTime = startTime - proc.arrival;
      const lostTime = returnTime - proc.burst;
      const penalty = returnTime / proc.burst;
      const responseTime = waitTime;
  
      results.push({
        pid: proc.id,
        arrival: proc.arrival,
        burst: proc.burst,
        start: startTime,
        finish: finishTime,
        returnTime,
        waitTime,
        lostTime,
        penalty,
        responseTime
      });
    }
  
    return { results, gantt };
  }
  