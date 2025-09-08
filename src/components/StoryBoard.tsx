import React, { useEffect, useRef, useState } from "react";
import ImageCompare from "./ImageCompare";

const images = [
  {
    left: "/assets/img/storyboard/1.jpg",
    right: "/assets/img/storyboard/1 (2).jpg",
  },
  {
    left: "/assets/img/storyboard/2.jpg",
    right: "/assets/img/storyboard/2 (2).jpg",
  },
  {
    left: "/assets/img/storyboard/3.jpg",
    right: "/assets/img/storyboard/3 (2).jpg",
  },
  {
    left: "/assets/img/storyboard/4.jpg",
    right: "/assets/img/storyboard/4.gif",
  },
  {
    left: "/assets/img/storyboard/5.jpg",
    right: "/assets/img/storyboard/5 (2).jpg",
  },
  {
    left: "/assets/img/storyboard/6.jpg",
    right: "/assets/img/storyboard/6 (2).jpg",
  },
  {
    left: "/assets/img/storyboard/7.jpg",
    right: "/assets/img/storyboard/7 (2).jpg",
  },
  {
    left: "/assets/img/storyboard/8.jpg",
    right: "/assets/img/storyboard/8 (2).jpg",
  },
  {
    left: "/assets/img/storyboard/9.jpg",
    right: "/assets/img/storyboard/9 (2).jpg",
  },
  {
    left: "/assets/img/storyboard/10.jpg",
    right: "/assets/img/storyboard/10 (2).jpg",
  },
  {
    left: "/assets/img/storyboard/11.jpg",
    right: "/assets/img/storyboard/11 (2).jpg",
  },
  {
    left: "/assets/img/storyboard/12.jpg",
    right: "/assets/img/storyboard/12 (2).jpg",
  },
  {
    left: "/assets/img/storyboard/13.jpg",
    right: "/assets/img/storyboard/13 (2).jpg",
  },
  {
    left: "/assets/img/storyboard/14.jpg",
    right: "/assets/img/storyboard/14 (2).jpg",
  },
  {
    left: "/assets/img/storyboard/15.jpg",
    right: "/assets/img/storyboard/15 (2).jpg",
  },
  {
    left: "/assets/img/storyboard/16.jpg",
    right: "/assets/img/storyboard/16 (2).jpg",
  },
  {
    left: "/assets/img/storyboard/17.jpg",
    right: "/assets/img/storyboard/17 (2).jpg",
  },
  {
    left: "/assets/img/storyboard/18.jpg",
    right: "/assets/img/storyboard/18 (2).jpg",
  },
  {
    left: "/assets/img/storyboard/19.jpg",
    right: "/assets/img/storyboard/19 (2).jpg",
  },
];

// Custom Lazy Loader (no dependency)
const LazyImageCompare: React.FC<{
  left: string;
  right: string;
  height?: string;
}> = ({ left, right, height = "350px" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ minHeight: "300px" }}
      className="col-lg-4 col-md-6 col-12"
    >
      {isVisible && (
        <ImageCompare leftImage={left} rightImage={right} height={height} />
      )}
    </div>
  );
};

const StoryBoard: React.FC = () => {
  const [page, setPage] = useState(1);
  const perPage = 6;

  const totalPages = Math.ceil(images.length / perPage);
  const start = (page - 1) * perPage;
  const currentImages = images.slice(start, start + perPage);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4" style={{ color: "#fff" }}>
        Story Board
      </h2>

      <div className="row g-4">
        {currentImages.map((img, idx) => (
          <LazyImageCompare key={idx} left={img.left} right={img.right} />
        ))}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center align-items-center mt-4">
        <button
          className="btn btn-dark btn-circle mx-2"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          «
        </button>

        <span className="text-white mx-2">
          {page} / {totalPages}
        </span>

        <button
          className="btn btn-dark btn-circle mx-2"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default StoryBoard;
