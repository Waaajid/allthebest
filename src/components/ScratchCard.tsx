import React, { useRef, useEffect, useState } from 'react';

interface ScratchCardProps {
  width: number;
  height: number;
  revealedContent: React.ReactNode;
  coverColor?: string;
  scratchRadius?: number;
  onScratchComplete?: () => void;
  thresholdPercent?: number; // Percentage of area to be scratched to consider it complete
}

const ScratchCard: React.FC<ScratchCardProps> = ({
  width,
  height,
  revealedContent,
  coverColor = '#C0C0C0', // Silver color
  scratchRadius = 20,
  onScratchComplete,
  thresholdPercent = 50,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratchedEnough, setIsScratchedEnough] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill the canvas with the cover color
    ctx.fillStyle = coverColor;
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'destination-out';
  }, [width, height, coverColor]);

  const getMousePosition = (canvas: HTMLCanvasElement, eventX: number, eventY: number) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: eventX - rect.left,
      y: eventY - rect.top,
    };
  };

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isScratchedEnough) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.arc(x, y, scratchRadius, 0, Math.PI * 2, true);
    ctx.fill();
  };

  const handleInteractionStart = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    let x, y;
    if ('touches' in event) {
      x = event.touches[0].clientX;
      y = event.touches[0].clientY;
    } else {
      x = event.clientX;
      y = event.clientY;
    }
    const { x: canvasX, y: canvasY } = getMousePosition(canvas, x, y);
    scratch(canvasX, canvasY);
  };

  const handleInteractionMove = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || isScratchedEnough) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    let x, y;
    if ('touches' in event) {
      x = event.touches[0].clientX;
      y = event.touches[0].clientY;
    } else {
      x = event.clientX;
      y = event.clientY;
    }
    const { x: canvasX, y: canvasY } = getMousePosition(canvas, x, y);
    scratch(canvasX, canvasY);
  };

  const handleInteractionEnd = () => {
    setIsDrawing(false);
    checkScratchCompletion();
  };
  
  const checkScratchCompletion = () => {
    const canvas = canvasRef.current;
    if (!canvas || isScratchedEnough) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, width, height);
    const pixelData = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixelData.length; i += 4) { // Check alpha channel
      if (pixelData[i] === 0) {
        transparentPixels++;
      }
    }

    const totalPixels = width * height;
    const scratchedPercentage = (transparentPixels / totalPixels) * 100;

    if (scratchedPercentage >= thresholdPercent) {
      setIsScratchedEnough(true);
      if (onScratchComplete) {
        onScratchComplete();
      }
      // Optionally, completely clear the canvas once threshold is met
      // ctx.clearRect(0, 0, width, height);
    }
  };


  return (
    <div style={{ position: 'relative', width, height, cursor: 'cell' }} className="rounded-lg overflow-hidden shadow-lg">
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '10px',
        }}
        className="bg-gray-100"
      >
        {revealedContent}
      </div>
      {!isScratchedEnough && (
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
          onMouseDown={handleInteractionStart}
          onMouseMove={handleInteractionMove}
          onMouseUp={handleInteractionEnd}
          onMouseLeave={handleInteractionEnd} // Stop drawing if mouse leaves canvas
          onTouchStart={handleInteractionStart}
          onTouchMove={handleInteractionMove}
          onTouchEnd={handleInteractionEnd}
        />
      )}
    </div>
  );
};

export default ScratchCard;
