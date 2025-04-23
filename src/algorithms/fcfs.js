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
    while (readyQueue.length > 0 || blockedQueue.length > 0){
        for (let i = blockedQueue.length - 1; i >= 0; i--) {
            const blockedProcess = blockedQueue[i];
            if (currentTime >= blockedProcess.block.start + blockedProcess.block.duration) {
                readyQueue.push(blockedProcess);
                blockedQueue.splice(i, 1);
            }
        }


    }
    while (readyQueue.length > 0 || blockedQueue.length > 0) {
        // Primero, manejar los procesos bloqueados
        

        if (readyQueue.length > 0) {
            const currentProcess = readyQueue.shift();
            const startTime = Math.max(currentTime, currentProcess.arrival);
            const block = currentProcess.block;
            let execStart = startTime;

            if (block && startTime < currentProcess.arrival + block.start && currentProcess.arrival + block.start < startTime + currentProcess.burst) {
                // Ejecutar antes del bloqueo
                if (execStart < currentProcess.arrival + block.start) {
                    gantt.push({
                        type: "exec",
                        start: execStart,
                        end: currentProcess.arrival + block.start,
                        pid: currentProcess.id
                    });
                    currentTime = currentProcess.arrival + block.start;
                    execStart = currentTime;
                }

                // Bloquear
                gantt.push({
                    type: "block",
                    start: currentTime,
                    end: currentTime + block.duration,
                    pid: currentProcess.id
                });
                const blockEndTime = currentTime + block.duration;
                blockedQueue.push(currentProcess);

                // Ejecutar otros procesos mientras este está bloqueado
                while (currentTime < blockEndTime && readyQueue.length > 0) {
                    const nextProcess = readyQueue.shift();
                    const nextStartTime = Math.max(currentTime, nextProcess.arrival);
                    const executeTime = Math.min(blockEndTime - currentTime, nextProcess.burst);

                    gantt.push({
                        type: "exec",
                        start: nextStartTime,
                        end: nextStartTime + executeTime,
                        pid: nextProcess.id
                    });
                    currentTime = nextStartTime + executeTime;
                    nextProcess.burst -= executeTime; // Reducir el tiempo restante

                    if (nextProcess.burst > 0) {
                        readyQueue.push(nextProcess); // Aún necesita más tiempo
                    } else {
                        const finishTime = currentTime;
                        const returnTime = finishTime - nextProcess.arrival;
                        const waitTime = nextStartTime - nextProcess.arrival;
                        const lostTime = returnTime - nextProcess.burst;
                        const penalty = (nextProcess.burst !== 0) ? returnTime / nextProcess.burst : 0;
                        const responseTime = waitTime;

                        if (isFinite(finishTime) && isFinite(returnTime) && isFinite(waitTime) && isFinite(lostTime) && isFinite(penalty) && isFinite(responseTime)) {
                            results.push({
                                pid: nextProcess.id,
                                arrival: nextProcess.arrival,
                                burst: nextProcess.burst,
                                start: nextStartTime,
                                finish: finishTime,
                                returnTime,
                                waitTime,
                                lostTime,
                                penalty,
                                responseTime
                            });
                        }
                    }
                }
                currentTime = blockEndTime;

            } else {
                // Ejecutar hasta el final
                gantt.push({
                    type: "exec",
                    start: execStart,
                    end: startTime + currentProcess.burst,
                    pid: currentProcess.id
                });
                currentTime = startTime + currentProcess.burst;

                const finishTime = currentTime;
                const returnTime = finishTime - currentProcess.arrival;
                const waitTime = startTime - currentProcess.arrival;
                const lostTime = returnTime - currentProcess.burst;
                const penalty = (currentProcess.burst !== 0) ? returnTime / currentProcess.burst : 0;
                const responseTime = waitTime;

                if (isFinite(finishTime) && isFinite(returnTime) && isFinite(waitTime) && isFinite(lostTime) && isFinite(penalty) && isFinite(responseTime)) {
                    results.push({
                        pid: currentProcess.id,
                        arrival: currentProcess.arrival,
                        burst: currentProcess.burst,
                        start: startTime,
                        finish: finishTime,
                        returnTime,
                        waitTime,
                        lostTime,
                        penalty,
                        responseTime
                    });
                }
            }
        } else {
            // Si no hay procesos listos, pero hay bloqueados, avanzar el tiempo
            if (blockedQueue.length > 0) {
                currentTime++;
                gantt.push({ processId: null, state: 'Wait', startTime: currentTime - 1, endTime: currentTime });
            } else {
                break; // No hay nada que hacer, salir del bucle
            }
        }
    }
    console.log(gantt)
    return { results, gantt };
}