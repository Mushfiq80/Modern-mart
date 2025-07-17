import React, { useRef, useState } from "react";

interface ImageZoomProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  containerClassName?: string;
  zoomLevel?: number;
}

export function ImageZoom({ 
  src, 
  alt = "Image", 
  width = 600, 
  height = 600, 
  className = "",
  containerClassName = "",
  zoomLevel = 2
}: ImageZoomProps) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !isHovered) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    containerRef.current.style.backgroundPosition = `${x}% ${y}%`;
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (containerRef.current) {
      containerRef.current.style.backgroundPosition = "50% 50%";
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden cursor-zoom-in ${containerClassName}`}
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: `${zoomLevel * 100}%`,
        backgroundPosition: "50% 50%",
        backgroundRepeat: "no-repeat"
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isHovered ? "opacity-0" : "opacity-100"
        } ${className}`}
        style={{ display: "block" }}
      />
    </div>
  );
} 