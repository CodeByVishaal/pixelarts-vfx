import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import DarkClass from "../components/classes/DarkClass";
import LayoutV1 from "../components/layouts/LayoutV1";
import { useAdmin } from "../contexts/AdminContext";

const AIGenerationPage = () => {
  const { mediaItems } = useAdmin();
  const [filter, setFilter] = useState<"all" | "image" | "video">("all");
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  // Filter items that have category 'ai-generation'
  const aiGenerationItems = mediaItems.filter(
    (item) => item.category === "ai-generation"
  );

  const filteredItems = aiGenerationItems.filter(
    (item) => filter === "all" || item.type === filter
  );

  const openModal = (url: string) => {
    setSelectedMedia(url);
  };

  const closeModal = () => {
    setSelectedMedia(null);
  };

  return (
    <>
      <DarkClass />
      <Helmet>
        <title>AI Generation - Pixel Arts VFX</title>
        <meta
          name="description"
          content="Explore our AI-generated visual effects and creative projects"
        />
      </Helmet>
      <LayoutV1>
        <Breadcrumb title="AI Generation" breadCrumb="ai-generation" />

        {/* Main Content */}
        <div className="services-area">
          <div className="container">
            {/* Header Section */}
            <div className="row mb-5">
              <div className="col-12 text-center">
                <div className="section-header mb-4">
                  <h2
                    className="mb-3"
                    style={{
                      color: "#ffffff",
                      fontSize: "2.5rem",
                      fontWeight: "700",
                    }}
                  >
                    AI-Powered Creations
                  </h2>
                  <p
                    style={{
                      color: "#cccccc",
                      fontSize: "1.1rem",
                      maxWidth: "600px",
                      margin: "0 auto",
                    }}
                  >
                    Discover our cutting-edge AI-generated visual effects,
                    digital art, and innovative content created with artificial
                    intelligence technology.
                  </p>
                </div>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="row mb-5">
              <div className="col-12">
                <div className="text-center">
                  <div
                    className="btn-group"
                    role="group"
                    style={{ marginBottom: "2rem" }}
                  >
                    {(["all", "image", "video"] as const).map((filterType) => (
                      <button
                        key={filterType}
                        type="button"
                        className={`btn ${
                          filter === filterType
                            ? "btn-primary"
                            : "btn-outline-primary"
                        }`}
                        onClick={() => setFilter(filterType)}
                        style={{
                          borderRadius:
                            filterType === "all"
                              ? "25px 0 0 25px"
                              : filterType === "video"
                              ? "0 25px 25px 0"
                              : "0",
                          padding: "10px 30px",
                          fontWeight: "500",
                          textTransform: "capitalize",
                          background:
                            filter === filterType
                              ? "linear-gradient(135deg, #9C57E9 0%, #9C57E9 100%)"
                              : "transparent",
                          border: "2px solid #9C57E9",
                          color: filter === filterType ? "#ffffff" : "#9C57E9",
                        }}
                      >
                        {filterType === "all"
                          ? "All Media"
                          : `AI ${filterType}s`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Media Grid */}
            {filteredItems.length === 0 ? (
              <div className="row">
                <div className="col-12">
                  <div className="text-center py-5">
                    <div style={{ fontSize: "5rem", opacity: 0.3 }}>🤖</div>
                    <h3 className="mt-4 mb-3" style={{ color: "#ffffff" }}>
                      No AI {filter === "all" ? "content" : filter + "s"}{" "}
                      available
                    </h3>
                    <p className="mb-4" style={{ color: "#cac3c3" }}>
                      Check back later for amazing AI-generated visual effects
                      content!
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row g-4">
                {/* @ts-ignore */}
                {filteredItems.map((item, index) => (
                  <div key={item.id} className="col-lg-4 col-md-6">
                    <div
                      className="card border-0 h-100"
                      style={{
                        borderRadius: "15px",
                        overflow: "hidden",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                      }}
                      onClick={() => openModal(item.url)}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.transform =
                          "translateY(-10px)";
                        (e.currentTarget as HTMLElement).style.boxShadow =
                          "0 20px 40px rgba(0,0,0,0.15)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.transform =
                          "translateY(0)";
                        (e.currentTarget as HTMLElement).style.boxShadow =
                          "0 10px 30px rgba(0,0,0,0.1)";
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          paddingTop: "60%",
                          background:
                            "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
                          overflow: "hidden",
                        }}
                      >
                        {item.type === "image" ? (
                          <img
                            src={item.url}
                            alt={item.title}
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              transition: "transform 0.3s ease",
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              background:
                                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "white",
                            }}
                          >
                            <div className="text-center">
                              <div
                                style={{
                                  fontSize: "3rem",
                                  marginBottom: "10px",
                                }}
                              >
                                🤖
                              </div>
                              <h6
                                className="mb-0"
                                style={{ fontWeight: "600" }}
                              >
                                AI Video
                              </h6>
                            </div>
                          </div>
                        )}

                        {/* Hover Overlay (same as Showreel) */}
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background:
                              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)",
                            opacity: 0,
                            transition: "opacity 0.3s ease",
                          }}
                          className="hover-overlay"
                        ></div>

                        {/* Badges (keep yours) */}
                        <span
                          className="badge position-absolute"
                          style={{
                            top: "15px",
                            left: "15px",
                            fontSize: "11px",
                            padding: "6px 10px",
                            borderRadius: "15px",
                            background: "linear-gradient(135deg, #A352DE 100%)",
                            color: "#ffffff",
                            fontWeight: "600",
                          }}
                        >
                          🤖 AI GENERATED
                        </span>

                        <span
                          className={`badge position-absolute ${
                            item.type === "image" ? "bg-success" : "bg-info"
                          }`}
                          style={{
                            backgroundColor: "black",
                            top: "15px",
                            right: "15px",
                            fontSize: "12px",
                            padding: "6px 12px",
                            borderRadius: "15px",
                          }}
                        >
                          {item.type.toUpperCase()}
                        </span>
                      </div>

                      <div
                        className="card-body"
                        style={{
                          padding: "1.5rem",
                          backgroundColor: "#242526", // dark background instead of white
                          color: "#ffffff",
                        }}
                      >
                        <h5
                          className="card-title mb-2"
                          style={{
                            color: "#FFFFFF",
                            fontWeight: "600",
                            fontSize: "1.1rem",
                          }}
                        >
                          {item.title}
                        </h5>
                        <p
                          className="card-text mb-3"
                          style={{
                            fontSize: "14px",
                            lineHeight: "1.5",
                            color: "#cccccc", // softer gray for description
                          }}
                        >
                          {item.description ||
                            "AI-generated visual content showcasing the latest in artificial intelligence creativity."}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Media Modal */}
        {selectedMedia && (
          <div
            className="modal show d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.9)", zIndex: 9999 }}
            onClick={closeModal}
          >
            <div className="modal-dialog modal-xl modal-dialog-centered">
              <div className="modal-content bg-transparent border-0">
                <div
                  className="modal-body p-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    className="btn-close btn-close-white position-absolute"
                    style={{ top: "20px", right: "20px", zIndex: 10000 }}
                    onClick={closeModal}
                  ></button>

                  {selectedMedia.includes(".mp4") ||
                  selectedMedia.includes("video") ? (
                    <video
                      src={selectedMedia}
                      controls
                      autoPlay
                      controlsList="nodownload noremoteplayback noplaybackrate" // ✅ disable download, remote playback, speed change
                      disablePictureInPicture
                      style={{
                        width: "100%",
                        height: "auto",
                        maxHeight: "80vh",
                        borderRadius: "10px",
                      }}
                    />
                  ) : (
                    <img
                      src={selectedMedia}
                      alt="AI Generated content preview"
                      style={{
                        width: "100%",
                        height: "auto",
                        maxHeight: "80vh",
                        borderRadius: "10px",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <style>{`
        .hover-overlay {
          opacity: 0 !important;
        }
        .card:hover .hover-overlay {
          opacity: 1 !important;
        }
        .card:hover img {
          transform: scale(1.05);
        }
      `}</style>
      </LayoutV1>
    </>
  );
};

export default AIGenerationPage;
