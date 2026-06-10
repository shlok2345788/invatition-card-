import { useEffect, useRef, useState } from 'react';

interface ScratchCardProps {
  children: React.ReactNode;
  onReveal: () => void;
}

export const ScratchCard = ({ children, onReveal }: ScratchCardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas to match container
    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      fillCanvas();
    };

    const fillCanvas = () => {
      if (isRevealed) return;
      
      const width = canvas.width;
      const height = canvas.height;
      
      // Base luxury dark card background
      ctx.fillStyle = '#0f0f1c';
      ctx.fillRect(0, 0, width, height);

      // Gold pattern overlay (diagonal grid lines)
      ctx.strokeStyle = 'rgba(218, 165, 32, 0.04)';
      ctx.lineWidth = 1.5;
      for (let i = -width; i < width + height; i += 25) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + height, height);
        ctx.stroke();
      }

      // Draw premium gold borders
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.35)';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(18, 18, width - 36, height - 36);
      
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.12)';
      ctx.lineWidth = 1;
      ctx.strokeRect(24, 24, width - 48, height - 48);

      // Draw outer gold corner frames
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.55)';
      ctx.lineWidth = 2;
      // top-left
      ctx.beginPath(); ctx.moveTo(42, 24); ctx.lineTo(24, 24); ctx.lineTo(24, 42); ctx.stroke();
      // top-right
      ctx.beginPath(); ctx.moveTo(width - 42, 24); ctx.lineTo(width - 24, 24); ctx.lineTo(width - 24, 42); ctx.stroke();
      // bottom-left
      ctx.beginPath(); ctx.moveTo(42, height - 24); ctx.lineTo(24, height - 24); ctx.lineTo(24, height - 42); ctx.stroke();
      // bottom-right
      ctx.beginPath(); ctx.moveTo(width - 42, height - 24); ctx.lineTo(width - 24, height - 24); ctx.lineTo(width - 24, height - 42); ctx.stroke();

      // Central Golden Emblem
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Shadow for emblem depth
      ctx.shadowColor = 'rgba(255, 20, 147, 0.45)';
      ctx.shadowBlur = 18;

      // Outer glowing gradient ring
      const ringGrad = ctx.createRadialGradient(centerX, centerY, 60, centerX, centerY, 80);
      ringGrad.addColorStop(0, 'rgba(255, 20, 147, 0.6)');
      ringGrad.addColorStop(1, 'rgba(138, 43, 226, 0.05)');
      ctx.fillStyle = ringGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 80, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0; // Reset shadows

      // Gold Coin Base
      const goldGrad = ctx.createLinearGradient(centerX - 60, centerY - 60, centerX + 60, centerY + 60);
      goldGrad.addColorStop(0, '#ffd700');
      goldGrad.addColorStop(0.3, '#fff8dc');
      goldGrad.addColorStop(0.6, '#daa520');
      goldGrad.addColorStop(1, '#ffd700');
      
      ctx.fillStyle = goldGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 58, 0, Math.PI * 2);
      ctx.fill();

      // Inner Coin Border
      ctx.strokeStyle = '#8b6508';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 52, 0, Math.PI * 2);
      ctx.stroke();

      // Coin text "21"
      ctx.font = "900 40px 'Outfit', sans-serif";
      ctx.fillStyle = '#4a3b00';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText("21", centerX, centerY - 6);

      ctx.font = "800 9px 'Outfit', sans-serif";
      ctx.fillText("YEARS OLD", centerX, centerY + 18);

      // Gold text tags
      ctx.fillStyle = '#ffd700';
      ctx.font = "800 15px 'Outfit', sans-serif";
      ctx.fillText("RAHUL'S EXCLUSIVE", centerX, centerY - 95);
      ctx.font = "800 12px 'Outfit', sans-serif";
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.fillText("BIRTHDAY PARTY PASS", centerX, centerY - 78);

      // Scratch instructions button banner
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      
      // Fallback rounded rect draw for older browsers (Vite environments standard supports roundRect)
      if (typeof (ctx as any).roundRect === 'function') {
        (ctx as any).roundRect(centerX - 120, centerY + 100, 240, 36, 18);
      } else {
        ctx.rect(centerX - 120, centerY + 100, 240, 36);
      }
      ctx.fill();
      ctx.stroke();

      ctx.font = "800 11px 'Outfit', sans-serif";
      ctx.fillStyle = '#00ffff';
      ctx.fillText("⚡ SCRATCH TO ACTIVATE VIP ACCESS ⚡", centerX, centerY + 118);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => window.removeEventListener('resize', resizeCanvas);
  }, [isRevealed]);

  const getPointerPos = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const scratch = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (!isScratching || isRevealed) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const { x, y } = getPointerPos(e);

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 40, 0, Math.PI * 2); // 40px brush size
    ctx.fill();

    checkReveal();
  };

  const checkReveal = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let clearPixels = 0;

    // Check every 16th pixel for performance
    for (let i = 0; i < pixels.length; i += 64) {
      if (pixels[i + 3] === 0) { // Alpha channel is 0
        clearPixels++;
      }
    }

    const totalPixelsToCheck = pixels.length / 64;
    const clearPercentage = (clearPixels / totalPixelsToCheck) * 100;

    if (clearPercentage > 70) { // If more than 70% scratched
      setIsRevealed(true);
      // Clear entire canvas with animation
      canvas.style.transition = 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
      canvas.style.opacity = '0';
      canvas.style.transform = 'scale(1.2)';
      setTimeout(() => {
        canvas.style.display = 'none';
        onReveal();
      }, 800);
    }
  };

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsScratching(true);
    scratch(e);
  };

  const handlePointerUp = () => {
    setIsScratching(false);
  };

  return (
    <div className="scratch-container" ref={containerRef}>
      {children}
      <canvas
        ref={canvasRef}
        className="scratch-canvas"
        onMouseDown={handlePointerDown}
        onMouseMove={scratch}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={scratch}
        onTouchEnd={handlePointerUp}
        onTouchCancel={handlePointerUp}
      />
    </div>
  );
};
