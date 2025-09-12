import React, { useEffect, useRef, useState } from "react";

import "../assets/css/gallery.css";
import { useAdmin } from "../contexts/AdminContext";

// Static images as fallback
const staticImages = [
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

interface MediaItem {
  _id: string;
  id: string;
  type: "image" | "video";
  url: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  category: string;
  isActive: boolean;
}

const SeriesGallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [allImages, setAllImages] = useState<(string | MediaItem)[]>([]);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const { mediaItems } = useAdmin();

  // Combine static images with admin-uploaded series content
  useEffect(() => {
    // Get active series media items from admin
    const seriesMediaItems = mediaItems.filter(
      (item: MediaItem) =>
        item.category === "series" && item.isActive && item.type === "image" // Series section typically shows poster images
    );

    // Combine admin content with static images
    const combinedImages = [...seriesMediaItems, ...staticImages];
    setAllImages(combinedImages);
  }, [mediaItems]);

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
        setCurrentIndex((i) => ((i ?? 0) + 1) % allImages.length);
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((i) => (i === 0 ? allImages.length - 1 : (i ?? 0) - 1));
      } else if (e.key === "Escape") {
        setCurrentIndex(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentIndex, allImages.length]);

  const getImageUrl = (item: string | MediaItem): string => {
    return typeof item === "string" ? item : item.url;
  };

  const getImageAlt = (item: string | MediaItem, index: number): string => {
    if (typeof item === "string") {
      return `Series Gallery ${index}`;
    }
    return item.title || `Series Gallery ${index}`;
  };

  const isAdminContent = (item: string | MediaItem): boolean => {
    return typeof item !== "string";
  };

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
        {allImages.map((item, idx) => (
          <div
            key={typeof item === "string" ? `static-${idx}` : item._id}
            className="thumb relative overflow-hidden rounded-lg"
            onClick={() => setCurrentIndex(idx)}
          >
            <img
              src={getImageUrl(item)}
              alt={getImageAlt(item, idx)}
              className="zoom rounded-lg shadow-lg cursor-pointer"
            />

            {/* Admin Content Badge
            {isAdminContent(item) && (
              <div
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  padding: "4px 8px",
                  borderRadius: "12px",
                  fontSize: "10px",
                  fontWeight: "600",
                  color: "white",
                  background:
                    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                }}
              >
                NEW
              </div>
            )} */}

            {/* Hover overlay with fade */}
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            {/* Title overlay for admin content */}
            {isAdminContent(item) && (
              <div
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  right: "0",
                  background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
                  color: "white",
                  padding: "20px 12px 12px",
                  fontSize: "12px",
                  fontWeight: "500",
                  opacity: "0",
                  transition: "opacity 0.3s",
                }}
                className="hover-title"
              >
                {(item as MediaItem).title}
              </div>
            )}
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
                currentIndex === 0 ? allImages.length - 1 : currentIndex - 1
              );
            }}
          >
            &#10094;
          </button>

          {/* Image */}
          <img
            src={getImageUrl(allImages[currentIndex])}
            alt="Preview"
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Image Info for Admin Content */}
          {isAdminContent(allImages[currentIndex]) && (
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(0,0,0,0.8)",
                color: "white",
                padding: "12px 20px",
                borderRadius: "8px",
                textAlign: "center",
                maxWidth: "80%",
              }}
            >
              <h4 style={{ margin: "0 0 8px 0", fontSize: "16px" }}>
                {(allImages[currentIndex] as MediaItem).title}
              </h4>
              {(allImages[currentIndex] as MediaItem).description && (
                <p style={{ margin: "0", fontSize: "12px", opacity: "0.8" }}>
                  {(allImages[currentIndex] as MediaItem).description}
                </p>
              )}
            </div>
          )}

          {/* Next */}
          <button
            className="absolute right-6 top-1/2 bg-danger -translate-y-1/2 text-white text-5xl z-50 hover:text-gray-300"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((currentIndex + 1) % allImages.length);
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
