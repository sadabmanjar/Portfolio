import { useEffect } from 'react';

/**
 * useSmoothComet
 *
 * When called with no argument (or null), the canvas is mounted on
 * document.body and tracks mouse globally across the whole page.
 *
 * When called with a containerRef, the canvas is scoped to that element.
 *
 * @param {React.RefObject|null} containerRef
 */
const useSmoothComet = (containerRef = null) => {
  useEffect(() => {
    const isGlobal = !containerRef?.current;
    const el = isGlobal ? document.body : containerRef.current;
    if (!el) return;

    const canvas = document.createElement('canvas');
    if (isGlobal) {
      // Fixed full-viewport canvas — stays in place while scrolling
      canvas.style.cssText =
        'position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:9999;';
    } else {
      canvas.style.cssText =
        'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:2;';
    }
    el.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let tx = 0, ty = 0, cx = 0, cy = 0;
    let active = false, globalAlpha = 0;
    const pts = [], MAX = 55, SMOOTH = 0.20, FADE = 0.8;
    let lx = 0, ly = 0;
    let rafId;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // For global mode we listen on window; for scoped mode, on the element
    const target = isGlobal ? window : el;

    const onMove = (e) => {
      // Always use viewport coords (clientX/Y) so the canvas lines up with fixed pos
      tx = e.clientX;
      ty = e.clientY;
      active = true;
      globalAlpha = 1;
    };
    const onLeave = () => { active = false; };

    target.addEventListener('mousemove',  onMove);
    if (!isGlobal) target.addEventListener('mouseleave', onLeave);

    const draw = () => {
      cx += (tx - cx) * SMOOTH;
      cy += (ty - cy) * SMOOTH;

      const moved = Math.hypot(cx - lx, cy - ly);

      if (active && moved > 0.8) {
        pts.push({ x: cx, y: cy, a: 1 });
        lx = cx; ly = cy;
      }

      if (!active || moved < 0.5) {
        globalAlpha = Math.max(0, globalAlpha - FADE * 1.5);
      }

      pts.forEach((p) => { p.a = Math.max(0, p.a - (active ? 0.007 : FADE)); });
      while (pts.length > MAX || (pts.length && pts[0].a <= 0)) pts.shift();

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (pts.length > 1) {
        const head = pts[pts.length - 1];
        const tail = pts[0];

        // --- gradient tail ---
        const grad = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y);
        grad.addColorStop(0,   'rgba(0,229,255,0)');
        grad.addColorStop(0.4, `rgba(155,89,255,${head.a * 0.5})`);
        grad.addColorStop(1,   `rgba(255,255,255,${head.a * 0.95})`);

        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        pts.forEach((p) => ctx.lineTo(p.x, p.y));
        ctx.strokeStyle = grad;
        ctx.lineWidth   = 3.5;
        ctx.lineCap     = 'round';
        ctx.lineJoin    = 'round';
        ctx.stroke();

        // --- glowing head ---
        const glow = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 16);
        glow.addColorStop(0,   `rgba(255,255,255,${globalAlpha * 0.95})`);
        glow.addColorStop(0.4, `rgba(0,229,255,${globalAlpha * 0.5})`);
        glow.addColorStop(1,   'transparent');

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(head.x, head.y, 16, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      target.removeEventListener('mousemove',  onMove);
      if (!isGlobal) target.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', resize);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, []);
};

export default useSmoothComet;
