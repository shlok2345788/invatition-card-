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
      
      // Create metallic/holographic gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#e6e6fa'); // Light lavender
      gradient.addColorStop(0.2, '#c0c0c0'); // Silver
      gradient.addColorStop(0.5, '#ffd700'); // Gold accent
      gradient.addColorStop(0.8, '#c0c0c0'); // Silver
      gradient.addColorStop(1, '#ffb6c1'); // Light pink

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Add a scratch instruction text
      ctx.font = "bold 24px 'Outfit', sans-serif";
      ctx.fillStyle = "#333";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Scratch to Reveal!", width / 2, height / 2);
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
