import React from 'react';

const GanttChart = ({ data }) => {
  if (!data || data.length === 0) return <div>No data available</div>;

  // Calculate timeline bounds
  const minTime = Math.min(...data.map(item => item.startTime));
  const maxTime = Math.max(...data.map(item => item.endTime));
  const totalDuration = maxTime - minTime;

  // Group data by process ID
  const processGroups = data.reduce((groups, item) => {
    if (!groups[item.processId]) groups[item.processId] = [];
    groups[item.processId].push(item);
    return groups;
  }, {});

  // Color mapping for different states
  const stateColors = {
    Exec: '#4CAF50', // Green
    Wait: '#FFC107',    // Yellow
    Block: '#F44336', // Red
    IDLE: '#9E9E9E'     // Gray
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Gráfica de Procesos</h2>
      
      {/* Timeline Header */}
      <div style={{
        display: 'flex',
        position: 'relative',
        height: '30px',
        marginBottom: '40px',
        borderBottom: '1px solid #ddd'
      }}>
        {Array.from({ length: maxTime - minTime + 1 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${(i / (maxTime - minTime)) * 100}%`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <div style={{ height: '10px', borderLeft: '1px solid #999' }}></div>
            <span style={{ fontSize: '12px', marginTop: '5px' }}>{minTime + i}</span>
          </div>
        ))}
      </div>

      {/* Process Rows */}
      {Object.entries(processGroups).map(([processId, items]) => (
        <div key={processId} style={{ display: 'flex', marginBottom: '15px', alignItems: 'center' }}>
          <div style={{ width: '80px', fontWeight: 'bold' }}>{processId}</div>
          <div style={{
            position: 'relative',
            height: '30px',
            flexGrow: 1,
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            {items.sort((a, b) => a.startTime - b.startTime).map((item, index) => {
              const duration = item.endTime - item.startTime;
              const left = ((item.startTime - minTime) / totalDuration) * 100;
              const width = (duration / totalDuration) * 100;

              return (
                <div
                  key={index}
                  style={{
                    position: 'absolute',
                    left: `${left}%`,
                    width: `${width}%`,
                    height: '100%',
                    backgroundColor: stateColors[item.state] || '#9E9E9E',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    borderRight: '1px solid rgba(255,255,255,0.3)'
                  }}
                  title={`${processId} ${item.state} (${item.startTime}-${item.endTime})`}
                >
                  {duration > 1 ? duration : ''}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Legend */}
      <div style={{ display: 'flex', gap: '20px', marginTop: '30px', justifyContent: 'center' }}>
        {Object.entries(stateColors).map(([state, color]) => (
          <div key={state} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{
              width: '20px',
              height: '20px',
              backgroundColor: color,
              borderRadius: '3px'
            }}></div>
            <span>{state}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GanttChart;