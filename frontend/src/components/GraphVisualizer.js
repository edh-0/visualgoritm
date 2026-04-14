import React, { useEffect, useRef, useState } from 'react';
import './GraphVisualizer.css';

const GraphVisualizer = ({ graph, visitedNodes = [], queueNodes = [], currentNode = null }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });

  // Отслеживаем размер контейнера
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: Math.max(rect.width, 500),
          height: 400
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Автоматический расчёт позиций узлов (по кругу)
  const calculateNodePositions = (nodes, width, height) => {
    const count = nodes.length;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;

    return nodes.map((node, index) => {
      const angle = (index / count) * 2 * Math.PI - Math.PI / 2;
      return {
        ...node,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      };
    });
  };

  useEffect(() => {
    if (graph && graph.nodes && dimensions.width > 0) {
      drawGraph();
    }
  }, [graph, visitedNodes, queueNodes, currentNode, dimensions]);

  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const ctx = canvas.getContext('2d');
    const positionedNodes = calculateNodePositions(graph.nodes, dimensions.width, dimensions.height);

    ctx.clearRect(0, 0, dimensions.width, dimensions.height);

    // Рисуем рёбра
    ctx.beginPath();
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 2;

    for (const [from, toList] of Object.entries(graph.edges)) {
      const fromNode = positionedNodes.find(n => n.id === parseInt(from));
      if (!fromNode) continue;

      for (const to of toList) {
        const toNode = positionedNodes.find(n => n.id === to);
        if (!toNode) continue;

        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.stroke();
      }
    }

    // Рисуем узлы
    const nodeRadius = Math.min(dimensions.width, dimensions.height) * 0.05;

    for (const node of positionedNodes) {
      let color = '#2a2a2a';
      let borderColor = '#4ec9b0';
      let borderWidth = 2;

      if (currentNode === node.id) {
        color = '#4ec9b0';
        borderWidth = 4;
      } else if (visitedNodes.includes(node.id)) {
        color = '#2a5a3a';
      } else if (queueNodes.includes(node.id)) {
        color = '#5a4a2a';
        borderColor = '#dcdcaa';
      }

      ctx.beginPath();
      ctx.arc(node.x, node.y, nodeRadius, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = borderWidth;
      ctx.stroke();

      // Метка узла
      ctx.fillStyle = '#e0e0e0';
      ctx.font = `bold ${Math.max(14, nodeRadius * 0.8)}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.label, node.x, node.y);
    }
  };

  return (
    <div className="graph-visualizer" ref={containerRef}>
      <canvas
        ref={canvasRef}
        className="graph-canvas"
        style={{ width: '100%', height: 'auto', minHeight: '400px' }}
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
            <span>В очереди/стеке</span>
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