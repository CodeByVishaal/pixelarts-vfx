import React, { useEffect, useRef, useState } from "react";
import "../assets/css/gallery.css";

const images = [
  "/assets/img/seriesposters/1.jpg",
  "/assets/img/seriesposters/2.jpg",
  "/assets/img/seriesposters/3.jpg",
  "/assets/img/seriesposters/4.jpg",
  "/assets/img/seriesposters/5.jpg",
  "/assets/img/seriesposters/6.jpg",
  "/assets/img/seriesposters/7.jpg",
  "/assets/img/seriesposters/8.jpg",
  "/assets/img/seriesposters/9.jpg",
  "/assets/img/seriesposters/10.jpg",
];

const SeriesGallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const galleryRef = useRef<HTMLDivElement | null>(null);

  // Fade-in section on scroll
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
    if (galleryRef.current) observer.observe(galleryRef.current);
    return () => observer.disconnect();
  }, []);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === "ArrowRight") {
        setCurrentIndex((i) => ((i ?? 0) + 1) % images.length);
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((i) => (i === 0 ? images.length - 1 : (i ?? 0) - 1));
      } else if (e.key === "Escape") {
        setCurrentIndex(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentIndex]);

  return (
    <div
      ref={galleryRef}
      className={`gallery-container mb-10 text-center transition-all duration-1000 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <h2 className="text-3xl font-bold text-white mb-8">Web Series</h2>

      {/* Grid */}
      <div className="gallery-grid">
        {images.map((src, idx) => (
          <div
            key={idx}
            className="thumb relative overflow-hidden rounded-lg"
            onClick={() => setCurrentIndex(idx)}
          >
            <img
              src={src}
              alt={`Gallery ${idx}`}
              className="zoom rounded-lg shadow-lg cursor-pointer"
            />
            {/* Hover overlay with fade */}
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {currentIndex !== null && (
        <div className="modal" onClick={() => setCurrentIndex(null)}>
          {/* Close */}
          <span className="close" onClick={() => setCurrentIndex(null)}>
            &times;
          </span>

          {/* Prev */}
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-danger text-white text-5xl z-50 hover:text-gray-300"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(
                currentIndex === 0 ? images.length - 1 : currentIndex - 1
              );
            }}
          >
            &#10094;
          </button>

          {/* Image */}
          <img
            src={images[currentIndex]}
            alt="Preview"
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          <button
            className="absolute right-6 top-1/2 bg-danger -translate-y-1/2 text-white text-5xl z-50 hover:text-gray-300"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((currentIndex + 1) % images.length);
            }}
          >
            &#10095;
          </button>
        </div>
      )}
    </div>
  );
};

export default SeriesGallery;
