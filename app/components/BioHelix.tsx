"use client";

import { useEffect, useRef, useState } from "react";

interface Node {
  index: number;
  strand: number;
  label: string;
  desc: string;
}

const HELIX_LABELS = [
  { label: "Cellular Bioavailability", desc: "98% absorption rate via liposomal nutrient preservation" },
  { label: "Raw Plant Synergy", desc: "Preserved natural co-factors mimicking active cellular food states" },
  { label: "Eco-Conscious Extraction", desc: "Solvent-free water extraction protecting botanical integrity" },
  { label: "Purity Guarantee", desc: "0% synthetic binders, binders, heavy metals, or chemical fillers" },
  { label: "Molecular Precision", desc: "Standardized active compounds for clinical performance reliability" },
  { label: "Bio-Engineered Potency", desc: "Synergistic botanical ratios that amplify cell receptivity" },
];

export default function BioHelix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<{ label: string; desc: string } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 350);

    let angle = 0;
    const numNodes = 8;
    const amplitude = height * 0.25;
    const centerY = height * 0.45;
    const startX = width * 0.12;
    const endX = width * 0.88;
    const helixWidth = endX - startX;

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      setHoveredNode(null);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render subtle tech gridlines
      ctx.strokeStyle = "rgba(6, 78, 59, 0.02)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      angle += 0.012;

      const nodePositions: { x: number; y: number; strand: number; label: string; desc: string; z: number }[] = [];

      // Generate points for two intertwining strands
      for (let i = 0; i < numNodes; i++) {
        const t = i / (numNodes - 1);
        const x = startX + t * helixWidth;

        const offset = t * Math.PI * 2.2;
        const currentAngle = angle + offset;

        // z values between -1 and 1
        const z0 = Math.cos(currentAngle);
        const z1 = Math.cos(currentAngle + Math.PI);

        const y0 = centerY + amplitude * Math.sin(currentAngle);
        const y1 = centerY + amplitude * Math.sin(currentAngle + Math.PI);

        const labelIndex0 = i % HELIX_LABELS.length;
        const labelIndex1 = (i + 3) % HELIX_LABELS.length;

        nodePositions.push({
          x,
          y: y0,
          strand: 0,
          label: HELIX_LABELS[labelIndex0].label,
          desc: HELIX_LABELS[labelIndex0].desc,
          z: z0,
        });

        nodePositions.push({
          x,
          y: y1,
          strand: 1,
          label: HELIX_LABELS[labelIndex1].label,
          desc: HELIX_LABELS[labelIndex1].desc,
          z: z1,
        });
      }

      // Draw connecting chemical bonds
      for (let i = 0; i < numNodes; i++) {
        const p0 = nodePositions[i * 2];
        const p1 = nodePositions[i * 2 + 1];

        const avgZ = (p0.z + p1.z) / 2;
        const opacity = 0.08 + (avgZ + 1) * 0.18; // range ~ [0.08, 0.44]
        
        ctx.strokeStyle = `rgba(0, 53, 39, ${opacity})`;
        ctx.lineWidth = 1.5 + (avgZ + 1) * 1.2;
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
      }

      // Sort nodes based on depth (Z-buffer style)
      const sortedNodes = [...nodePositions].sort((a, b) => a.z - b.z);

      let currentHovered: { label: string; desc: string } | null = null;

      for (const node of sortedNodes) {
        const sizeMultiplier = 0.95 + (node.z + 1) * 0.45; // size based on depth
        const radius = 6.5 * sizeMultiplier;

        const dist = Math.hypot(mouseX - node.x, mouseY - node.y);
        const isHovered = dist < radius + 14;

        if (isHovered) {
          currentHovered = { label: node.label, desc: node.desc };
        }

        const alpha = 0.25 + (node.z + 1) * 0.35;
        const color =
          node.strand === 0
            ? `rgba(0, 53, 39, ${alpha})` // Emerald primary
            : `rgba(71, 104, 0, ${alpha})`; // Olive secondary

        if (isHovered) {
          ctx.save();
          ctx.shadowColor = node.strand === 0 ? "#003527" : "#476800";
          ctx.shadowBlur = 18;
          ctx.strokeStyle = node.strand === 0 ? "rgba(0, 53, 39, 0.8)" : "rgba(71, 104, 0, 0.8)";
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius + 5, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw structural strand lines linking nodes
        const nextNode = nodePositions.find(
          (n) => n.strand === node.strand && n.x > node.x && Math.abs(n.x - node.x) < helixWidth / (numNodes - 2)
        );

        if (nextNode) {
          const avgSegmentZ = (node.z + nextNode.z) / 2;
          ctx.strokeStyle =
            node.strand === 0
              ? `rgba(0, 53, 39, ${0.08 + (avgSegmentZ + 1) * 0.22})`
              : `rgba(71, 104, 0, ${0.08 + (avgSegmentZ + 1) * 0.22})`;
          ctx.lineWidth = 1.2 + (avgSegmentZ + 1) * 1.2;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(nextNode.x, nextNode.y);
          ctx.stroke();
        }
      }

      if (currentHovered) {
        if (!hoveredNode || hoveredNode.label !== currentHovered.label) {
          setHoveredNode(currentHovered);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [hoveredNode]);

  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center select-none">
      <canvas ref={canvasRef} className="w-full h-[280px] md:h-[350px] cursor-crosshair" />
      <div className="h-20 flex items-center justify-center text-center px-4 max-w-lg w-full">
        {hoveredNode ? (
          <div className="bg-white/90 backdrop-blur-md border border-primary/10 rounded-2xl px-6 py-2.5 shadow-xl transition-all duration-300 transform scale-100">
            <h4 className="font-display font-extrabold text-sm text-primary tracking-tight uppercase flex items-center gap-1.5 justify-center">
              <span className="material-symbols-outlined text-xs text-secondary">science</span>
              {hoveredNode.label}
            </h4>
            <p className="text-xs text-on-surface-variant font-medium mt-1">
              {hoveredNode.desc}
            </p>
          </div>
        ) : (
          <p className="text-xs text-on-surface-variant/75 font-mono tracking-wider flex items-center gap-2">
            <span className="material-symbols-outlined animate-pulse text-primary text-sm">precision_manufacturing</span>
            Hover nodes to inspect Nutrillo's molecular synergy
          </p>
        )}
      </div>
    </div>
  );
}
