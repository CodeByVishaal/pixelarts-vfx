import React, { useState, useRef, useEffect } from "react";

interface ImageCompareProps {
  leftImage: string;
  rightImage: string;
  height?: string | number;
}

const ImageCompare: React.FC<ImageCompareProps> = ({
  leftImage,
  rightImage,
  height = "auto", // default responsive
}) => {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let newX = ((clientX - rect.left) / rect.width) * 100;
    newX = Math.max(0, Math.min(100, newX));
    setPosition(newX);
  };

  const handleMouseDown = () => setDragging(true);
  const handleMouseUp = () => setDragging(false);
  const handleMouseMove = (e: MouseEvent) => {
    if (dragging) {
      updatePosition(e.clientX);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    updatePosition(e.touches[0].clientX);
  };

  

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]); // The effect re-runs when 'dragging' state changes

  return (
    <div
      ref={containerRef}
      className="position-relative w-100 mx-auto rounded shadow"
      style={{
        width: "100%", // full responsive width
        height: height === "auto" ? "100%" : height, // dynamic height
        aspectRatio: "16 / 9", // keeps proportions on resize
        overflow: "hidden",
        userSelect: "none",
      }}
      // Removed onMouseMove, onMouseUp, onMouseLeave from here
      onTouchStart={handleTouchStart}
      onTouchMove={(e) => updatePosition(e.touches[0].clientX)}
    >
      {/* Right Image */}
      <img
        src={rightImage}
        alt="Right"
        draggable={false}
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ objectFit: "cover", pointerEvents: "none" }}
      />

      {/* Left Image */}
      <img
        src={leftImage}
        alt="Left"
        draggable={false}
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          objectFit: "cover",
          clipPath: `inset(0 ${100 - position}% 0 0)`,
          pointerEvents: "none",
        }}
      />

      {/* Divider line */}
      <div
        className="position-absolute bg-white"
        style={{
          top: 0,
          bottom: 0,
          left: `${position}%`,
          width: "2px",
          transform: "translateX(-50%)",
          boxShadow: "0 0 5px rgba(0,0,0,0.3)",
        }}
      />

      {/* Draggable handle */}
      <div
        className="position-absolute bg-white border border-secondary rounded-circle d-flex align-items-center justify-content-center"
        style={{
          top: "50%",
          left: `${position}%`,
          width: "30px",
          height: "30px",
          transform: "translate(-50%, -50%)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          cursor: "grab",
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <span className="fw-bold text-muted">↔</span>
      </div>
    </div>
  );
};

export default ImageCompare;