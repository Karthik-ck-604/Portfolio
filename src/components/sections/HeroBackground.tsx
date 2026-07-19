import React, { useEffect, useRef } from "react";

export const HeroBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: { x: number; y: number; originX: number; originY: number; radius: number }[] = [];
    const spacing = 40;

    // Create a grid of particles mapping the screen dimensions
    for (let x = 0; x < width; x += spacing) {
      for (let y = 0; y < height; y += spacing) {
        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          radius: 1,
        });
      }
    }

    const mouse = { x: -1000, y: -1000, radius: 120 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      // Re-initialize particles on screen resize
      particles.length = 0;
      for (let x = 0; x < width; x += spacing) {
        for (let y = 0; y < height; y += spacing) {
          particles.push({
            x,
            y,
            originX: x,
            originY: y,
            radius: 1,
          });
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Dark theme background fills
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, width, height);

      // Drawing dots
      ctx.fillStyle = "rgba(168, 168, 168, 0.15)";
      particles.forEach((p) => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          // Push particles slightly away from cursor focus
          const tx = p.x - Math.cos(angle) * force * 16;
          const ty = p.y - Math.sin(angle) * force * 16;
          p.x += (tx - p.x) * 0.1;
          p.y += (ty - p.y) * 0.1;
        } else {
          // Spring back to default resting positions
          p.x += (p.originX - p.x) * 0.08;
          p.y += (p.originY - p.y) * 0.08;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Bottom right ambient soft light
      ctx.beginPath();
      const radialCrimson = ctx.createRadialGradient(width * 0.8, height * 0.8, 0, width * 0.8, height * 0.8, 300);
      radialCrimson.addColorStop(0, "rgba(220, 38, 38, 0.03)");
      radialCrimson.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = radialCrimson;
      ctx.arc(width * 0.8, height * 0.8, 300, 0, Math.PI * 2);
      ctx.fill();

      // Top left accent ambient glow
      ctx.beginPath();
      const radialGlow = ctx.createRadialGradient(width * 0.1, height * 0.1, 0, width * 0.1, height * 0.1, 400);
      radialGlow.addColorStop(0, "rgba(220, 38, 38, 0.02)");
      radialGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = radialGlow;
      ctx.arc(width * 0.1, height * 0.1, 400, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
};
