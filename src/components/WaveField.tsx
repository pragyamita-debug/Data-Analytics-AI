import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * Wireframe "terrain" of stacked lines — the little 3D wave panel from the design.
 * Drawn on a canvas so it can breathe continuously without touching the DOM.
 */
export function WaveField({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let raf = 0;
    let visible = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    // three soft peaks that drift and swell over time
    const height = (u: number, v: number, t: number) => {
      const peak = (cx: number, cy: number, s: number, a: number) => a * Math.exp(-((u - cx) ** 2 + (v - cy) ** 2) / s);
      return (
        peak(0.32 + Math.sin(t * 0.4) * 0.04, 0.55, 0.02, 0.9 + Math.sin(t * 0.7) * 0.15) +
        peak(0.6 + Math.cos(t * 0.3) * 0.05, 0.45, 0.03, 1.15 + Math.cos(t * 0.5) * 0.2) +
        peak(0.82, 0.6 + Math.sin(t * 0.35) * 0.05, 0.015, 0.6) +
        0.04 * Math.sin(u * 18 + t * 1.6) * Math.cos(v * 9 - t)
      );
    };

    const draw = (time: number) => {
      const t = time / 1000;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const rows = 26;
      const cols = 70;
      for (let r = 0; r < rows; r++) {
        const v = r / (rows - 1); // 0 = far, 1 = near
        const depth = 0.35 + v * 0.65; // perspective squeeze
        const baseY = h * (0.3 + v * 0.62);
        ctx.beginPath();
        for (let c = 0; c <= cols; c++) {
          const u = c / cols;
          const x = w * (0.5 + (u - 0.5) * (0.75 + v * 0.45));
          const y = baseY - height(u, v, t) * h * 0.32 * depth;
          if (c === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(225, 230, 238, ${0.12 + v * 0.5})`;
        ctx.lineWidth = dpr * (0.6 + v * 0.5);
        ctx.stroke();
      }
    };

    const loop = (time: number) => {
      if (visible) draw(time);
      raf = requestAnimationFrame(loop);
    };
    if (reduced) draw(4000);
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [reduced]);

  return <canvas ref={ref} className={className} aria-hidden />;
}
