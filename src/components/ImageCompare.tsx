import React, { useState, useRef } from "react";

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

  return (
    <div
      ref={containerRef}
      className="position-relative w-100 mx-auto rounded shadow"
      style={{
        width: "100%", // take full width of its grid cell
        maxWidth: "400px", // 👈 limit width so two can fit side-by-side
        height: height === "auto" ? "250px" : height, // 👈 default height reduced
        aspectRatio: "16 / 9",
        overflow: "hidden",
        userSelect: "none",
      }}
      onMouseMove={(e) => dragging && updatePosition(e.clientX)}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
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
        onMouseDown={() => setDragging(true)}
        onTouchStart={(e) => updatePosition(e.touches[0].clientX)}
      >
        <span className="fw-bold text-muted">↔</span>
      </div>
    </div>
  );
};

export default ImageCompare;
