export function fcfs(processes) {
    const readyQueue = [];
    const blockedQueue = [];
    const sortedProcesses = [...processes].sort((a, b) => a.arrival - b.arrival);
    let currentTime = 0;
    const results = [];
    const gantt = [];
// Estructura de gantt:
// lista de diccionarios
// gantt = [{ processId: 'P1', state: 'Exec', startTime: 0, endTime: 3 }, { processId: 'P2', state: 'Exec', startTime: 3, endTime: 6 }]

    readyQueue.push(...sortedProcesses);
//ESTE NO ESTÁ FUNCIONANDO
// LOS OTROS SI FUNCIONAN PERO LES FALTA LA LOGICA DE BLOQUEOS
   
    
    return { results, gantt };
}