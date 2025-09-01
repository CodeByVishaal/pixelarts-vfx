import React, { useState, useEffect, useRef } from "react";
import "../assets/css/gallery.css";

const images = [
  "/assets/img/storyboard/1.jpg",
  "/assets/img/storyboard/5.jpg",
  "/assets/img/storyboard/9.jpg",
  "/assets/img/storyboard/11.jpg",
  "/assets/img/storyboard/13.jpg",
  "/assets/img/storyboard/18.jpg",
];

const images2 = [
  "/assets/img/finalout/1.jpg",
  "/assets/img/finalout/5.jpg",
  "/assets/img/finalout/9.jpg",
  "/assets/img/finalout/11.jpg",
  "/assets/img/finalout/13.jpg",
  "/assets/img/finalout/18.jpg",
];

const StoryBoard: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const galleryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={galleryRef}
      className={`gallery-container mb-10 text-center transition-all duration-1000 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Title */}
      <h2 className="text-3xl font-bold text-white mb-8">Story Board</h2>

      {/* Gallery Grid */}
      <div className="gallery-grid gap-6 px-6">
        {images.map((src, idx) => (
          <div
            className="thumb transform transition-transform duration-700 hover:scale-105 flex justify-center"
            key={idx}
          >
            <img
              src={src}
              alt={`Gallery ${idx}`}
              className="rounded-lg shadow-lg max-h-60 w-auto object-contain cursor-pointer"
              onClick={() => setSelected(src)}
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="modal fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <span className="close absolute top-4 right-6 text-4xl text-white cursor-pointer">
            &times;
          </span>
          <img
            className="modal-content max-w-[80%] max-h-[80vh] w-auto h-auto object-contain rounded-lg shadow-xl"
            src={selected}
            alt="Preview"
          />
        </div>
      )}

      <h2 className="text-3xl font-bold text-white mt-10 mb-8">Final Out</h2>

      {/* Gallery Grid */}
      <div className="gallery-grid gap-6 px-6">
        {images2.map((src, idx) => (
          <div
            className="thumb transform transition-transform duration-700 hover:scale-105 flex justify-center"
            key={idx}
          >
            <img
              src={src}
              alt={`Gallery ${idx}`}
              className="rounded-lg shadow-lg max-h-60 w-auto object-contain cursor-pointer"
              onClick={() => setSelected(src)}
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="modal fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <span className="close absolute top-4 right-6 text-4xl text-white cursor-pointer">
            &times;
          </span>
          <img
            className="modal-content max-w-[80%] max-h-[80vh] w-auto h-auto object-contain rounded-lg shadow-xl"
            src={selected}
            alt="Preview"
          />
        </div>
      )}
    </div>
  );
};

export default StoryBoard;
