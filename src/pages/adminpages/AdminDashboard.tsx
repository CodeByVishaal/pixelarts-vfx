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
        style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
      >
        {/* Header */}
        <div
          className="dashboard-header"
          style={{
            backgroundColor: "#0e0f11",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            padding: "1rem 2rem",
            borderBottom: "1px solid #e9ecef",
            position: "sticky",
            top: 0,
            zIndex: 1000,
          }}
        >
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div>
              <h2 style={{ margin: 0, color: "#e30513", fontWeight: "600" }}>
                Admin Dashboard
              </h2>
              <p style={{ margin: 0, color: "white", fontSize: "14px" }}>
                Manage your media content
              </p>
            </div>
            <div className="d-flex gap-2 align-items-center flex-wrap">
              <Link
                to="/showreel"
                className="btn btn-outline-primary btn-sm"
                style={{ borderRadius: "8px", padding: "8px 16px" }}
              >
                📺 View Showreel
              </Link>
              <button
                onClick={() => setShowUploadModal(true)}
                className="btn btn-primary btn-sm"
                style={{
                  borderRadius: "8px",
                  padding: "8px 16px",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                }}
              >
                ➕ Add Media
              </button>
              <button
                onClick={handleLogout}
                className="btn btn-outline-danger btn-sm"
                style={{ borderRadius: "8px", padding: "8px 16px" }}
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>

        <div className="container-fluid py-4">
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
                icon: "🖼️",
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
                    boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
                    transition: "transform 0.3s ease",
                  }}
                >
                  <div className="card-body text-center p-4">
                    <div className="mb-3" style={{ fontSize: "2.5rem" }}>
                      {stat.icon}
                    </div>
                    <h3
                      className="mb-1"
                      style={{
                        color: stat.color,
                        fontWeight: "700",
                        fontSize: "2rem",
                      }}
                    >
                      {stat.value}
                    </h3>
                    <p
                      className="text-muted mb-0"
                      style={{ fontWeight: "500" }}
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
            <div className="card-body p-4">
              <div className="row align-items-center">
                <div className="col-md-4">
                  <div className="input-group">
                    <span
                      className="input-group-text"
                      style={{
                        borderRadius: "8px 0 0 8px",
                        border: "2px solid #e1e5e9",
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
                        border: "2px solid #e1e5e9",
                        borderLeft: "none",
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <select
                    className="form-select"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as any)}
                    style={{ borderRadius: "8px", border: "2px solid #e1e5e9" }}
                  >
                    <option value="all">All Types</option>
                    <option value="image">Images Only</option>
                    <option value="video">Videos Only</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <select
                    className="form-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    style={{ borderRadius: "8px", border: "2px solid #e1e5e9" }}
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="title">By Title</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <div className="text-end">
                    <small className="text-muted">
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
            <div
              className="card-header border-0 bg-white"
              style={{
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px",
                padding: "1.5rem",
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <h4
                  className="mb-0"
                  style={{ color: "#333", fontWeight: "600" }}
                >
                  Media Gallery
                </h4>
                <span
                  className="badge bg-primary"
                  style={{ fontSize: "12px", padding: "6px 12px" }}
                >
                  {filteredAndSortedItems.length} items
                </span>
              </div>
            </div>
            <div className="card-body" style={{ padding: "1.5rem" }}>
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
                  <p className="text-primary">
                    {searchTerm
                      ? "Try adjusting your search or filter criteria"
                      : 'Click "Add Media" to upload your first item'}
                  </p>
                  {searchTerm && (
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => setSearchTerm("")}
                      style={{ borderRadius: "20px" }}
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
                          boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.transform =
                            "translateY(-5px)";
                          (e.currentTarget as HTMLElement).style.boxShadow =
                            "0 15px 30px rgba(0,0,0,0.15)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.transform =
                            "translateY(0)";
                          (e.currentTarget as HTMLElement).style.boxShadow =
                            "0 3px 10px rgba(0,0,0,0.1)";
                        }}
                      >
                        <div
                          style={{
                            position: "relative",
                            paddingTop: "60%",
                            background: "#0e0f11",
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
                                  "https://via.placeholder.com/400x240/667eea/ffffff?text=VFX+Image";
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
                                ▶️
                              </div>
                            </>
                          )}

                          {/* Type Badge */}
                          <span
                            className={`badge position-absolute ${
                              item.type === "image"
                                ? "bg-success"
                                : "bg-primary"
                            }`}
                            style={{
                              top: "10px",
                              right: "10px",
                              fontSize: "10px",
                              padding: "4px 8px",
                              borderRadius: "12px",
                              fontWeight: "600",
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
                              color: "#333",
                              fontWeight: "600",
                              fontSize: "1rem",
                              lineHeight: "1.3",
                            }}
                          >
                            {item.title}
                          </h6>
                          <p
                            className="card-text text-muted mb-3"
                            style={{
                              fontSize: "13px",
                              lineHeight: "1.4",
                              height: "2.8em",
                              overflow: "hidden",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {item.description || "No description available"}
                          </p>

                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <small
                              className="text-muted"
                              style={{ fontSize: "12px" }}
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
                                className="btn btn-outline-primary"
                                style={{
                                  borderRadius: "6px 0 0 6px",
                                  fontSize: "12px",
                                  padding: "4px 8px",
                                }}
                                title="Edit"
                              >
                                ✏️
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="btn btn-outline-danger"
                                style={{
                                  borderRadius: "0 6px 6px 0",
                                  fontSize: "12px",
                                  padding: "4px 8px",
                                }}
                                title="Delete"
                              >
                                🗑️
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
