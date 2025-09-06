import React from "react";

const Preloader: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const handleVideoEnd = () => {
    onFinish(); // only call after video finishes
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
        zIndex: 9999,
      }}
    >
      <video
        src="/assets/video/Loading Animation.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd} // wait for full video
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain", // show full video
        }}
      />
    </div>
  );
};

export default Preloader;
