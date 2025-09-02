import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import FooterV3 from "../../components/footer/FooterV3";
import HeaderV1 from "../../components/header/HeaderV1";
import { useAdmin } from "../../contexts/AdminContext";

const ShowreelPage = () => {
  const { mediaItems } = useAdmin();
  const [filter, setFilter] = useState<"all" | "image" | "video">("all");
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  const filteredItems = mediaItems.filter(
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
      <Helmet>
        <title>Showreel - Pixel Arts VFX</title>
        <meta
          name="description"
          content="Explore our latest VFX work and creative projects"
        />
      </Helmet>

      <HeaderV1 />

      {/* Page Header */}
      <div
        className="breadcrumb-area shadow dark text-center bg-fixed text-light"
        style={{
          background:
            'linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%), url("https://via.placeholder.com/1920x600/333/fff?text=VFX+Background") center center',
          backgroundSize: "cover",
          padding: "120px 0 80px",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <h1
                style={{
                  fontSize: "3.5rem",
                  fontWeight: "700",
                  marginBottom: "20px",
                }}
              >
                Our Showreel
              </h1>
              <p style={{ fontSize: "1.2rem", opacity: 0.9 }}>
                Discover the magic behind our visual effects and creative
                projects
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="services-area default-padding">
        <div className="container">
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
                            ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                            : "transparent",
                        border: "2px solid #667eea",
                      }}
                    >
                      {filterType === "all" ? "All Media" : `${filterType}s`}
                      <span className="badge bg-light text-dark ms-2">
                        {filterType === "all"
                          ? mediaItems.length
                          : mediaItems.filter(
                              (item) => item.type === filterType
                            ).length}
                      </span>
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
                  <div style={{ fontSize: "5rem", opacity: 0.3 }}>🎬</div>
                  <h3 className="mt-4 mb-3" style={{ color: "#666" }}>
                    No {filter === "all" ? "media" : filter + "s"} available
                  </h3>
                  <p className="text-muted mb-4">
                    Check back later for amazing visual effects content!
                  </p>
                  <Link
                    to="/"
                    className="btn btn-primary"
                    style={{
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      border: "none",
                      borderRadius: "25px",
                      padding: "12px 30px",
                    }}
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="row g-4">
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
                          "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
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
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://via.placeholder.com/400x240/667eea/ffffff?text=VFX+Project";
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
                              style={{ fontSize: "3rem", marginBottom: "10px" }}
                            >
                              ▶️
                            </div>
                            <h6 className="mb-0" style={{ fontWeight: "600" }}>
                              Play Video
                            </h6>
                          </div>
                        </div>
                      )}

                      {/* Overlay */}
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

                      {/* Media Type Badge */}
                      <span
                        className={`badge position-absolute ${
                          item.type === "image" ? "bg-success" : "bg-primary"
                        }`}
                        style={{
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

                    <div className="card-body" style={{ padding: "1.5rem" }}>
                      <h5
                        className="card-title mb-2"
                        style={{
                          color: "#333",
                          fontWeight: "600",
                          fontSize: "1.1rem",
                        }}
                      >
                        {item.title}
                      </h5>
                      <p
                        className="card-text text-muted mb-3"
                        style={{
                          fontSize: "14px",
                          lineHeight: "1.5",
                        }}
                      >
                        {item.description ||
                          "Creative visual effects project showcasing our expertise in digital artistry."}
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">
                          {new Date(item.uploadDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </small>
                        <div className="d-flex align-items-center gap-2">
                          <span
                            style={{
                              background:
                                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                              color: "white",
                              padding: "4px 8px",
                              borderRadius: "12px",
                              fontSize: "12px",
                              fontWeight: "500",
                            }}
                          >
                            {index + 1}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Back to Home Button */}
          <div className="row mt-5">
            <div className="col-12 text-center">
              <Link
                to="/"
                className="btn btn-outline-primary btn-lg"
                style={{
                  borderRadius: "25px",
                  padding: "12px 40px",
                  fontWeight: "500",
                  borderWidth: "2px",
                }}
              >
                ← Back to Home
              </Link>
            </div>
          </div>
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
                    alt="Media preview"
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

      <FooterV3 />

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
    </>
  );
};

export default ShowreelPage;
