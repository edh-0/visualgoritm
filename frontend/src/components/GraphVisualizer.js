import React, { useEffect, useRef } from 'react';
import './GraphVisualizer.css';

const GraphVisualizer = ({ graph, visitedNodes = [], queueNodes = [], currentNode = null }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    if (graph && graph.nodes) {
      drawGraph();
    }
  }, [graph, visitedNodes, queueNodes, currentNode]);
  
  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Очищаем canvas
    ctx.clearRect(0, 0, width, height);
    
    // Рисуем ребра
    ctx.beginPath();
    ctx.strokeStyle = '#3a3a3a';
    ctx.lineWidth = 2;
    
    for (const [from, toList] of Object.entries(graph.edges)) {
      const fromNode = graph.nodes.find(n => n.id === parseInt(from));
      if (!fromNode) continue;
      
      for (const to of toList) {
        const toNode = graph.nodes.find(n => n.id === to);
        if (!toNode) continue;
        
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.stroke();
      }
    }
    
    // Рисуем узлы
    for (const node of graph.nodes) {
      let color = '#2a2a2a';
      let borderColor = '#4ec9b0';
      let borderWidth = 2;
      
      if (currentNode === node.id) {
        color = '#4ec9b0';
        borderColor = '#4ec9b0';
        borderWidth = 4;
      } else if (visitedNodes.includes(node.id)) {
        color = '#2a5a3a';
        borderColor = '#4ec9b0';
      } else if (queueNodes.includes(node.id)) {
        color = '#5a4a2a';
        borderColor = '#dcdcaa';
      }
      
      // Рисуем круг
      ctx.beginPath();
      ctx.arc(node.x, node.y, 25, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = borderWidth;
      ctx.stroke();
      
      // Рисуем метку
      ctx.fillStyle = '#e0e0e0';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.label, node.x, node.y);
    }
  };
  
  return (
    <div className="graph-visualizer">
      <canvas
        ref={canvasRef}
        width={600}
        height={350}
        className="graph-canvas"
      />
      <div className="graph-info">
        <div className="graph-legend">
          <div className="legend-item">
            <div className="legend-color current"></div>
            <span>Текущий узел</span>
          </div>
          <div className="legend-item">
            <div className="legend-color visited"></div>
            <span>Посещенные</span>
          </div>
          <div className="legend-item">
            <div className="legend-color queue"></div>
            <span>В очереди</span>
          </div>
          <div className="legend-item">
            <div className="legend-color unvisited"></div>
            <span>Не посещенные</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphVisualizer;