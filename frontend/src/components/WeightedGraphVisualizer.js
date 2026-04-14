import React, { useEffect, useRef, useState } from 'react';
import './GraphVisualizer.css';

const WeightedGraphVisualizer = ({ graph, distances = {}, visitedNodes = [], currentNode = null }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });

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
  }, [graph, visitedNodes, currentNode, distances, dimensions]);

  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!graph || !graph.nodes) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const ctx = canvas.getContext('2d');
    const positionedNodes = calculateNodePositions(graph.nodes, dimensions.width, dimensions.height);
    const nodeRadius = Math.min(dimensions.width, dimensions.height) * 0.05;

    ctx.clearRect(0, 0, dimensions.width, dimensions.height);

    // Рисуем рёбра с весами
    ctx.beginPath();
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 2;
    ctx.font = '12px Arial';
    ctx.fillStyle = '#b0b0b0';

    // Получаем рёбра из графа (поддерживаем оба формата)
    let edges = graph.edges || graph.graph || {};
    
    for (const [from, toList] of Object.entries(edges)) {
      const fromNode = positionedNodes.find(n => n.id === parseInt(from));
      if (!fromNode) continue;

      for (const edge of toList) {
        const toNodeId = typeof edge === 'object' ? edge.node : edge;
        const toNode = positionedNodes.find(n => n.id === toNodeId);
        if (!toNode) continue;

        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.stroke();

        // Рисуем вес ребра (если есть)
        const weight = typeof edge === 'object' ? edge.weight : null;
        if (weight !== null) {
          const midX = (fromNode.x + toNode.x) / 2;
          const midY = (fromNode.y + toNode.y) / 2;
          ctx.fillStyle = '#4ec9b0';
          ctx.fillText(weight, midX, midY - 5);
        }
      }
    }

    // Рисуем узлы
    for (const node of positionedNodes) {
      let color = '#2a2a2a';
      let borderColor = '#4ec9b0';
      let borderWidth = 2;

      if (currentNode === node.id) {
        color = '#4ec9b0';
        borderWidth = 4;
      } else if (visitedNodes.includes(node.id)) {
        color = '#2a5a3a';
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

      // Расстояние от старта
      const dist = distances[node.id];
      if (dist !== undefined && dist !== Infinity && dist !== 0) {
        ctx.fillStyle = '#ffd700';
        ctx.font = `11px Arial`;
        ctx.fillText(dist, node.x, node.y - nodeRadius - 5);
      } else if (dist === 0) {
        ctx.fillStyle = '#4ec9b0';
        ctx.font = `11px Arial`;
        ctx.fillText('START', node.x, node.y - nodeRadius - 5);
      }
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
            <div className="legend-color unvisited"></div>
            <span>Не посещенные</span>
          </div>
          <div className="legend-item">
            <span style={{ color: '#ffd700' }}>📊</span>
            <span>Текущее расстояние</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightedGraphVisualizer;