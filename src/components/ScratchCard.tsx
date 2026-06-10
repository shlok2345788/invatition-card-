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

    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      fillCanvas();
    };

    const fillCanvas = () => {
      if (isRevealed) return;
      
      const width = canvas.width;
      const height = canvas.height;
      
      // Base dark card background
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);

      // Chrome holographic overlay pattern
      ctx.strokeStyle = 'rgba(147, 51, 234, 0.1)'; // Neon purple faint
      ctx.lineWidth = 1;
      for (let i = 0; i < width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }
      for (let i = 0; i < height; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
      }

      // Warning Tape (Top & Bottom)
      ctx.fillStyle = '#06B6D4'; // Cyan tape
      ctx.fillRect(0, 0, width, 12);
      ctx.fillRect(0, height - 12, width, 12);

      // Diagonal hazard lines on tape
      ctx.strokeStyle = '#050505';
      ctx.lineWidth = 2;
      for (let i = -width; i < width; i += 15) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + 12, 12);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(i, height - 12);
        ctx.lineTo(i + 12, height);
        ctx.stroke();
      }

      // Draw premium tech borders
      ctx.strokeStyle = 'rgba(147, 51, 234, 0.5)';
      ctx.lineWidth = 2;
      ctx.strokeRect(15, 25, width - 30, height - 50);

      // Central Emblem
      const centerX = width / 2;
      const centerY = height / 2;
      
      ctx.shadowColor = 'rgba(147, 51, 234, 0.8)';
      ctx.shadowBlur = 20;

      // Outer glowing ring
      ctx.strokeStyle = '#9333EA';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.shadowBlur = 0;

      // Lock icon / text
      ctx.font = "900 24px 'Orbitron', sans-serif";
      ctx.fillStyle = '#06B6D4';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText("LOCKED", centerX, centerY);

      // Top text tags
      ctx.fillStyle = '#EC4899';
      ctx.font = "800 16px 'Rajdhani', sans-serif";
      ctx.fillText("TOP SECRET", centerX, centerY - 100);
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = "800 12px 'Space Grotesk', sans-serif";
      ctx.fillText("ENCRYPTED MISSION DIRECTIVE", centerX, centerY - 80);

      // Scratch instructions button banner
      ctx.fillStyle = 'rgba(6, 182, 212, 0.1)';
      ctx.strokeStyle = '#06B6D4';
      ctx.lineWidth = 1;
      ctx.beginPath();
      
      if (typeof (ctx as any).roundRect === 'function') {
        (ctx as any).roundRect(centerX - 130, centerY + 90, 260, 40, 4);
      } else {
        ctx.rect(centerX - 130, centerY + 90, 260, 40);
      }
      ctx.fill();
      ctx.stroke();

      ctx.font = "800 14px 'Rajdhani', sans-serif";
      ctx.fillStyle = '#06B6D4';
      ctx.fillText("[ SYSTEM: SCRATCH TO DECRYPT ]", centerX, centerY + 110);
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

    for (let i = 0; i < pixels.length; i += 64) {
      if (pixels[i + 3] === 0) { 
        clearPixels++;
      }
    }

    const totalPixelsToCheck = pixels.length / 64;
    const clearPercentage = (clearPixels / totalPixelsToCheck) * 100;

    if (clearPercentage > 60) {
      setIsRevealed(true);
      canvas.style.transition = 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
      canvas.style.opacity = '0';
      canvas.style.transform = 'scale(1.1) translateY(-20px)';
      canvas.style.filter = 'brightness(2) hue-rotate(90deg)';
      setTimeout(() => {
        canvas.style.display = 'none';
        onReveal();
      }, 500);
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
