"use client";

import { useEffect, useRef } from "react";

interface Blob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  targetX: number;
  targetY: number;
}

export default function BioBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const colors = [
      "rgba(149, 211, 186, 0.4)",  // soft bioactive teal-green
      "rgba(191, 243, 101, 0.3)",  // vibrant secondary lime
      "rgba(6, 78, 59, 0.15)",     // deep forest shadow
      "rgba(254, 240, 138, 0.35)", // warm soft gold
      "rgba(209, 250, 229, 0.4)"   // light mint green
    ];

    const blobs: Blob[] = Array.from({ length: 15 }, () => {
      const radius = 60 + Math.random() * 80;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius,
        color: colors[Math.floor(Math.random() * colors.length)],
        targetX: 0,
        targetY: 0,
      };
    });

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      blobs.forEach((blob) => {
        // Natural drift
        blob.x += blob.vx;
        blob.y += blob.vy;

        // Boundaries bounce (accounts for radius so orbs bounce smoothly offscreen)
        if (blob.x - blob.radius < -100 && blob.vx < 0) {
          blob.vx = Math.abs(blob.vx);
        } else if (blob.x + blob.radius > width + 100 && blob.vx > 0) {
          blob.vx = -Math.abs(blob.vx);
        }
        if (blob.y - blob.radius < -100 && blob.vy < 0) {
          blob.vy = Math.abs(blob.vy);
        } else if (blob.y + blob.radius > height + 100 && blob.vy > 0) {
          blob.vy = -Math.abs(blob.vy);
        }

        // Interactive mouse repulsion - pushes orbs gently away
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - blob.x;
          const dy = mouseRef.current.y - blob.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 300) {
            const force = (300 - dist) / 300;
            blob.x -= (dx / dist) * force * 0.8;
            blob.y -= (dy / dist) * force * 0.8;
          }
        }

        const gradient = ctx.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          blob.radius
        );
        gradient.addColorStop(0, blob.color);
        // Transition to full transparency
        gradient.addColorStop(1, "rgba(247, 249, 251, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: "multiply", filter: "blur(48px)" }}
    />
  );
}
