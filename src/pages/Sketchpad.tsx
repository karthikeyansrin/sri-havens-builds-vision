import React, { useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';

const PIXELS_PER_FOOT = 20;
const GRID_SIZE = 40;

const Sketchpad: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shapes, setShapes] = useState<any[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });
  const [currentTool, setCurrentTool] = useState<'line' | 'circle'>('line');

  useEffect(() => {
    drawAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shapes]);

  // Ensure canvas backing store matches visible size and handle DPR so grid covers full visible area
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const fitCanvas = () => {
      const rect = container.getBoundingClientRect();
      const cssW = Math.max(200, Math.floor(rect.width));
      const cssH = Math.max(200, Math.floor(rect.height));
      const dpr = window.devicePixelRatio || 1;

      // set CSS size
      canvas.style.width = cssW + 'px';
      canvas.style.height = cssH + 'px';

      // set backing store size
      canvas.width = Math.floor(cssW * dpr);
      canvas.height = Math.floor(cssH * dpr);

      const ctx = canvas.getContext('2d');
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      drawAll();
    };

    fitCanvas();
    window.addEventListener('resize', fitCanvas);
    return () => window.removeEventListener('resize', fitCanvas);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getCtx() {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.getContext('2d');
  }

  function setTool(tool: 'line' | 'circle') {
    setCurrentTool(tool);
  }

  function startDrawing(e: React.MouseEvent) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setStart({ x, y });
    setIsDrawing(true);
  }

  function drawPreview(e: React.MouseEvent) {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = getCtx();
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    drawAll();

    const dist = Math.hypot(mouseX - start.x, mouseY - start.y);
    const feet = (dist / PIXELS_PER_FOOT).toFixed(1);

    ctx.strokeStyle = '#e67e22';
    ctx.lineWidth = 3;
    ctx.beginPath();

    if (currentTool === 'line') {
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(mouseX, mouseY);
      ctx.stroke();
      drawMeasurementText((start.x + mouseX) / 2, (start.y + mouseY) / 2, `${feet} ft`);
    } else {
      ctx.arc(start.x, start.y, dist, 0, Math.PI * 2);
      ctx.stroke();
      drawMeasurementText(start.x, start.y - dist - 10, `R: ${feet} ft`);
    }
  }

  function endDrawing(e: React.MouseEvent) {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;
    const dist = Math.hypot(endX - start.x, endY - start.y);
    if (dist < 5) {
      setIsDrawing(false);
      return;
    }

    const feet = (dist / PIXELS_PER_FOOT).toFixed(1);

    setShapes(prev => [...prev, {
      type: currentTool,
      x1: start.x,
      y1: start.y,
      x2: endX,
      y2: endY,
      measurement: feet,
      dist
    }]);

    setIsDrawing(false);
  }

  function drawAll() {
    const canvas = canvasRef.current;
    const ctx = getCtx();
    if (!canvas || !ctx) return;

  const dpr = window.devicePixelRatio || 1;
  const cssWidth = canvas.width / dpr;
  const cssHeight = canvas.height / dpr;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, cssWidth, cssHeight);

  drawGrid();

    ctx.lineWidth = 3;
  shapes.forEach((shape) => {
      ctx.strokeStyle = '#2c3e50';
      ctx.beginPath();
      if (shape.type === 'line') {
        ctx.moveTo(shape.x1, shape.y1);
        ctx.lineTo(shape.x2, shape.y2);
        ctx.stroke();
        drawMeasurementText((shape.x1 + shape.x2) / 2, (shape.y1 + shape.y2) / 2, `${shape.measurement} ft`);
      } else if (shape.type === 'circle') {
        ctx.arc(shape.x1, shape.y1, shape.dist, 0, Math.PI * 2);
        ctx.stroke();
        drawMeasurementText(shape.x1, shape.y1 - shape.dist - 10, `R: ${shape.measurement} ft`);
      }
    });
  }

  function drawGrid() {
    const canvas = canvasRef.current;
    const ctx = getCtx();
    if (!canvas || !ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const cssWidth = canvas.width / dpr;
    const cssHeight = canvas.height / dpr;

    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x <= cssWidth; x += GRID_SIZE) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, cssHeight);
    }
    for (let y = 0; y <= cssHeight; y += GRID_SIZE) {
      ctx.moveTo(0, y);
      ctx.lineTo(cssWidth, y);
    }
    ctx.stroke();
  }

  function drawMeasurementText(x: number, y: number, text: string) {
    const ctx = getCtx();
    if (!ctx) return;
    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = 'white';
    const width = ctx.measureText(text).width;
    ctx.fillRect(x - width / 2 - 4, y - 14, width + 8, 18);
    ctx.fillStyle = '#d35400';
    ctx.textAlign = 'center';
    ctx.fillText(text, x, y);
  }

  function undo() {
    setShapes(prev => prev.slice(0, -1));
  }

  function clearCanvas() {
    setShapes([]);
  }

  function saveSketch() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'my-dream-home-sketch.png';
    link.href = canvas.toDataURL();
    link.click();
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-8">
        <section className="bg-gradient-to-br from-primary/10 to-accent/20 py-6">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-heading text-5xl font-bold text-foreground mb-4">Sketchpad</h1>
            <p className="font-body text-l text-muted-foreground max-w-2xl mx-auto">
              Draw walls and areas on the canvas below. Measurements are shown in feet.
            </p>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto flex items-start gap-6">
              <aside className="w-56 bg-white p-4 rounded-md shadow-sm flex flex-col gap-3">
                <button className={`w-full text-left px-3 py-2 rounded ${currentTool === 'line' ? 'bg-primary text-white' : ''}`} onClick={() => setTool('line')}>Draw Wall (Line)</button>
                <button className={`w-full text-left px-3 py-2 rounded ${currentTool === 'circle' ? 'bg-primary text-white' : ''}`} onClick={() => setTool('circle')}>Draw Area (Circle)</button>
                <button className="w-full text-left px-3 py-2 rounded" onClick={undo}>Undo Last</button>
                <button className="w-full text-left px-3 py-2 rounded text-red-600 border border-red-300" onClick={clearCanvas}>Clear All</button>
                <button className="w-full text-left px-3 py-2 rounded bg-green-600 text-white" onClick={saveSketch}>💾 Save Image</button>
                <div className="mt-2 text-sm text-muted-foreground">Scale: 1 Grid Square = 2 Feet</div>
              </aside>

              <div className="flex-1" style={{ boxShadow: '0 4px 10px rgba(0,0,0,0.1)', border: '2px solid #333', cursor: 'crosshair' }}>
                <div ref={containerRef} style={{ width: '100%', height: '70vh' }}>
                  <canvas ref={canvasRef} id="sketchCanvas"
                    onMouseDown={startDrawing}
                    onMouseMove={drawPreview}
                    onMouseUp={endDrawing}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Sketchpad;
