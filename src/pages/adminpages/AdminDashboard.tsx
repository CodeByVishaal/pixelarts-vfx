import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import MediaUploadModal from "../../components/admin/MediaUploadModal";
import { useAdmin } from "../../contexts/AdminContext";

const AdminDashboard = () => {
  const { mediaItems, logout, addMediaItem, updateMediaItem, deleteMediaItem } =
    useAdmin();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "title">("newest");
  const [filterType, setFilterType] = useState<"all" | "image" | "video">(
    "all"
  );
  const navigate = useNavigate();

  // Filter and sort media items
  const filteredAndSortedItems = mediaItems
    .filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      const matchesType = filterType === "all" || item.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
          );
        case "oldest":
          return (
            new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime()
          );
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const handleUpload = (formData: any) => {
    try {
      if (editingItem) {
        updateMediaItem(editingItem.id, formData);
        toast.success("Media updated successfully!");
        setEditingItem(null);
      } else {
        addMediaItem(formData);
        toast.success("Media added successfully!");
      }
      setShowUploadModal(false);
    } catch (error) {
      toast.error("Failed to save media. Please try again.");
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setShowUploadModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this media item?")) {
      try {
        deleteMediaItem(id);
        toast.success("Media deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete media. Please try again.");
      }
    }
  };

  const closeModal = () => {
    setShowUploadModal(false);
    setEditingItem(null);
  };

  const stats = {
    total: mediaItems.length,
    images: mediaItems.filter((item) => item.type === "image").length,
    videos: mediaItems.filter((item) => item.type === "video").length,
    recent: mediaItems.filter((item) => {
      const uploadDate = new Date(item.uploadDate);
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return uploadDate > oneWeekAgo;
    }).length,
  };

  const handleLogout = () => {
    navigate("/");
    logout();
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Pixel Arts VFX</title>
      </Helmet>

      <div
        className="admin-dashboard"
        style={{ minHeight: "100vh", backgroundColor: "#202020" }}
      >
        {/* Header */}
        <div
          className="dashboard-header"
          style={{
            backgroundColor: "#1e1e1e", // softer dark gray
            padding: "16px 24px",
            borderBottom: "1px solid #2a2a2a",
            position: "sticky",
            top: 0,
            zIndex: 1000,
          }}
        >
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            {/* Title */}
            <div>
              <h2 style={{ margin: 0, color: "#f5f5f5", fontWeight: "600" }}>
                Admin Dashboard
              </h2>
              <p style={{ margin: 0, color: "#9ca3af", fontSize: "14px" }}>
                Manage your media content
              </p>
            </div>

            {/* Actions */}
            <div className="d-flex gap-2 align-items-center flex-wrap">
              {/* Showreel */}
              <Link
                to="/showreel"
                className="btn btn-sm"
                style={{
                  borderRadius: "8px",
                  padding: "8px 16px",
                  backgroundColor: "#2d2d2d",
                  marginRight: "30px",
                  color: "#e5e7eb",
                  border: "1px solid #3b82f6",
                  textDecoration: "none",
                }}
              >
                📺 View Showreel
              </Link>

              {/* Add Media */}
              <button
                onClick={() => setShowUploadModal(true)}
                className="btn btn-sm"
                style={{
                  borderRadius: "8px",
                  padding: "8px 16px",
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  color: "#ffffff",
                  border: "none",
                  marginRight: "30px",
                }}
              >
                ➕ Add Media
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="btn btn-sm"
                style={{
                  borderRadius: "8px",
                  padding: "8px 16px",
                  backgroundColor: "#ef4444",
                  color: "#ffffff",
                  border: "none",
                }}
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>

        <div
          style={{ backgroundColor: "#202020" }}
          className="container-fluid py-4"
        >
          {/* Stats Cards */}
          <div className="row mb-4">
            {[
              {
                title: "Total Media",
                value: stats.total,
                icon: "📁",
                color: "#667eea",
              },
              {
                title: "Images",
                value: stats.images,
                icon: "🖼",
                color: "#28a745",
              },
              {
                title: "Videos",
                value: stats.videos,
                icon: "🎬",
                color: "#dc3545",
              },
              {
                title: "Recent Uploads",
                value: stats.recent,
                icon: "⚡",
                color: "#ffc107",
              },
            ].map((stat, index) => (
              <div key={index} className="col-lg-3 col-md-6 mb-3">
                <div
                  className="card border-0 h-100"
                  style={{
                    borderRadius: "15px",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                    backgroundColor: "#202020", // dashboard card base
                    transition: "transform 0.3s ease",
                  }}
                >
                  <div
                    className="card-body text-center p-4"
                    style={{
                      backgroundColor: "#272727", // inner section
                      borderRadius: "12px",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
                      border: "1px solid #333",
                    }}
                  >
                    <div
                      className="mb-3"
                      style={{
                        fontSize: "2.5rem",
                        color: "#7b2ff7", // purple accent for icons
                      }}
                    >
                      {stat.icon}
                    </div>
                    <h3
                      className="mb-1"
                      style={{
                        color: stat.color || "#e60000",
                        fontWeight: "700",
                        fontSize: "2rem",
                      }}
                    >
                      {stat.value}
                    </h3>
                    <p
                      className="mb-0"
                      style={{
                        fontWeight: "500",
                        color: "#cccccc", // muted text for dark mode
                      }}
                    >
                      {stat.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div
            className="card border-0 mb-4"
            style={{
              borderRadius: "15px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
            }}
          >
            <div
              className="card-body p-4"
              style={{
                backgroundColor: "#272727", // card background
                borderRadius: "12px",
                border: "1px solid #333333", // subtle border
              }}
            >
              <div className="row align-items-center">
                {/* Search Bar */}
                <div className="col-md-4">
                  <div className="input-group">
                    <span
                      className="input-group-text"
                      style={{
                        borderRadius: "8px 0 0 8px",
                        border: "2px solid #7b2ff7",
                        backgroundColor: "#202020",
                        color: "#ffffff",
                      }}
                    >
                      🔍
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search media..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{
                        borderRadius: "0 8px 8px 0",
                        border: "2px solid #7b2ff7",
                        borderLeft: "none",
                        backgroundColor: "#202020",
                        color: "#ffffff",
                      }}
                    />
                  </div>
                </div>

                {/* Filter Type */}
                <div className="col-md-3">
                  <select
                    className="form-select"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as any)}
                    style={{
                      borderRadius: "8px",
                      border: "2px solid #9f44d3",
                      backgroundColor: "#202020",
                      color: "#ffffff",
                    }}
                  >
                    <option value="all">All Types</option>
                    <option value="image">Images Only</option>
                    <option value="video">Videos Only</option>
                  </select>
                </div>

                {/* Sort By */}
                <div className="col-md-3">
                  <select
                    className="form-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    style={{
                      borderRadius: "8px",
                      border: "2px solid #e60000",
                      backgroundColor: "#202020",
                      color: "#ffffff",
                    }}
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="title">By Title</option>
                  </select>
                </div>

                {/* Item Counter */}
                <div className="col-md-2">
                  <div className="text-end">
                    <small style={{ color: "#aaaaaa" }}>
                      {filteredAndSortedItems.length} of {mediaItems.length}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Media Grid */}
          <div
            className="card border-0"
            style={{
              borderRadius: "15px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
            }}
          >
            {/* Card Header */}
            <div
              className="card-header border-0"
              style={{
                backgroundColor: "#272727", // card header bg
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px",
                padding: "1.5rem",
                borderBottom: "1px solid #333333",
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <h4
                  className="mb-0"
                  style={{ color: "#ffffff", fontWeight: "600" }}
                >
                  Media Gallery
                </h4>
                <span
                  className="badge"
                  style={{
                    fontSize: "12px",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    background:
                      "linear-gradient(135deg, #7b2ff7 0%, #9f44d3 100%)",
                    color: "#ffffff",
                  }}
                >
                  {filteredAndSortedItems.length} items
                </span>
              </div>
            </div>

            {/* Card Body */}
            <div
              className="card-body"
              style={{ padding: "1.5rem", backgroundColor: "#202020" }} // main body bg
            >
              {filteredAndSortedItems.length === 0 ? (
                <div className="text-center py-5">
                  <div style={{ fontSize: "4rem", opacity: 0.3 }}>
                    {searchTerm ? "🔍" : "📱"}
                  </div>
                  <h5 className="mt-3 mb-2" style={{ color: "#974fee" }}>
                    {searchTerm
                      ? "No matching media found"
                      : "No media uploaded yet"}
                  </h5>
                  <p style={{ color: "#aaaaaa" }}>
                    {searchTerm
                      ? "Try adjusting your search or filter criteria"
                      : 'Click "Add Media" to upload your first item'}
                  </p>
                  {searchTerm && (
                    <button
                      className="btn"
                      onClick={() => setSearchTerm("")}
                      style={{
                        borderRadius: "20px",
                        border: "1px solid #974fee",
                        color: "#974fee",
                        backgroundColor: "transparent",
                        padding: "6px 14px",
                        fontWeight: "500",
                      }}
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              ) : (
                <div className="row g-4">
                  {/* @ts-ignore */}
                  {filteredAndSortedItems.map((item, index) => (
                    <div key={item.id} className="col-xl-3 col-lg-4 col-md-6">
                      <div
                        className="card border-0 h-100 media-grid-item"
                        style={{
                          borderRadius: "12px",
                          overflow: "hidden",
                          backgroundColor: "#272727", // card bg for items
                          boxShadow: "0 3px 10px rgba(0,0,0,0.5)",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.transform =
                            "translateY(-5px)";
                          (e.currentTarget as HTMLElement).style.boxShadow =
                            "0 15px 30px rgba(0,0,0,0.6)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.transform =
                            "translateY(0)";
                          (e.currentTarget as HTMLElement).style.boxShadow =
                            "0 3px 10px rgba(0,0,0,0.5)";
                        }}
                      >
                        <div
                          style={{
                            position: "relative",
                            paddingTop: "60%",
                            background: "#202020", // media preview bg
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
                                  "https://via.placeholder.com/400x240/7b2ff7/ffffff?text=VFX+Image";
                              }}
                            />
                          ) : (
                            <>
                              <video
                                src={item.url}
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                                muted
                                onError={(e) => {
                                  (e.target as HTMLVideoElement).style.display =
                                    "none";
                                }}
                              />
                              <div
                                style={{
                                  position: "absolute",
                                  top: "50%",
                                  left: "50%",
                                  transform: "translate(-50%, -50%)",
                                  background: "rgba(0,0,0,0.7)",
                                  color: "white",
                                  borderRadius: "50%",
                                  width: "60px",
                                  height: "60px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "1.5rem",
                                }}
                              >
                                ▶
                              </div>
                            </>
                          )}

                          {/* Type Badge */}
                          <span
                            className="badge position-absolute"
                            style={{
                              top: "10px",
                              right: "10px",
                              fontSize: "10px",
                              padding: "4px 8px",
                              borderRadius: "12px",
                              fontWeight: "600",
                              background:
                                item.type === "image"
                                  ? "linear-gradient(135deg, #28a745, #3ddc97)"
                                  : "linear-gradient(135deg, #7b2ff7, #9f44d3)",
                              color: "#ffffff",
                            }}
                          >
                            {item.type.toUpperCase()}
                          </span>
                        </div>

                        <div
                          className="card-body"
                          style={{ padding: "1.25rem" }}
                        >
                          <h6
                            className="card-title mb-2"
                            style={{
                              color: "#ffffff",
                              fontWeight: "600",
                              fontSize: "1rem",
                              lineHeight: "1.3",
                            }}
                          >
                            {item.title}
                          </h6>
                          <p
                            className="card-text mb-3"
                            style={{
                              fontSize: "13px",
                              lineHeight: "1.4",
                              height: "2.8em",
                              overflow: "hidden",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              color: "#aaaaaa",
                            }}
                          >
                            {item.description || "No description available"}
                          </p>

                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <small
                              style={{ fontSize: "12px", color: "#999999" }}
                            >
                              {new Date(item.uploadDate).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </small>
                            <div className="btn-group btn-group-sm">
                              <button
                                onClick={() => handleEdit(item)}
                                className="btn"
                                style={{
                                  borderRadius: "6px 0 0 6px",
                                  fontSize: "12px",
                                  padding: "4px 8px",
                                  border: "1px solid #974fee",
                                  backgroundColor: "transparent",
                                  color: "#974fee",
                                }}
                                title="Edit"
                              >
                                ✏
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="btn"
                                style={{
                                  borderRadius: "0 6px 6px 0",
                                  fontSize: "12px",
                                  padding: "4px 8px",
                                  border: "1px solid #e60000",
                                  backgroundColor: "transparent",
                                  color: "#e60000",
                                }}
                                title="Delete"
                              >
                                🗑
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Upload Modal */}
        <MediaUploadModal
          isOpen={showUploadModal}
          onClose={closeModal}
          onSubmit={handleUpload}
          editingItem={editingItem}
        />

        {/* Toast Container */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>

      <style>{`
        .media-grid-item {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .media-grid-item:nth-child(1) {
          animation-delay: 0.1s;
        }
        .media-grid-item:nth-child(2) {
          animation-delay: 0.15s;
        }
        .media-grid-item:nth-child(3) {
          animation-delay: 0.2s;
        }
        .media-grid-item:nth-child(4) {
          animation-delay: 0.25s;
        }
        .media-grid-item:nth-child(5) {
          animation-delay: 0.3s;
        }
        .media-grid-item:nth-child(6) {
          animation-delay: 0.35s;
        }
        .media-grid-item:nth-child(7) {
          animation-delay: 0.4s;
        }
        .media-grid-item:nth-child(8) {
          animation-delay: 0.45s;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .dashboard-header .d-flex {
            flex-direction: column !important;
            gap: 1rem;
          }

          .dashboard-header .d-flex > div:last-child {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
};

export default AdminDashboard;
