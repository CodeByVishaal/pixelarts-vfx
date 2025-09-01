import React, { useState, useRef } from "react";

interface ImageCompareProps {
  leftImage: string;
  rightImage: string;
}

const ImageCompare: React.FC<ImageCompareProps> = ({
  leftImage,
  rightImage,
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragging) updatePosition(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      updatePosition(e.touches[0].clientX);
    }
  };

  return (
    <div
      ref={containerRef}
      className="position-relative w-100 mx-auto rounded shadow"
      style={{
        maxWidth: "800px",
        height: "400px",
        overflow: "hidden",
        userSelect: "none", // 🚫 disable text/image selection
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
    >
      {/* Right Image */}
      <img
        src={rightImage}
        alt="Right"
        draggable={false} // 🚫 disable image drag ghost
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          objectFit: "cover",
          userSelect: "none",
          pointerEvents: "none",
        }}
      />

      {/* Left Image */}
      <img
        src={leftImage}
        alt="Left"
        draggable={false} // 🚫 disable drag
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          objectFit: "cover",
          clipPath: `inset(0 ${100 - position}% 0 0)`,
          userSelect: "none",
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
          width: "40px",
          height: "40px",
          transform: "translate(-50%, -50%)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          cursor: "grab",
          userSelect: "none",
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={(e) => updatePosition(e.touches[0].clientX)}
      >
        <span className="fw-bold text-muted">↔</span>
      </div>
    </div>
  );
};

export default ImageCompare;
