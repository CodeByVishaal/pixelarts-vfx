import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../components/admin/AdminDashboard.css";
import MediaUploadModal from "../../components/admin/MediaUploadModal";
import { useAdmin } from "../../contexts/AdminContext";

interface DashboardStats {
  totalMedia: number;
  totalImages: number;
  totalVideos: number;
  activeMedia: number;
  recentUploads: number;
  showreelCount: number;
  aiGenerationCount: number;
  moviesCount: number;
  seriesCount: number;
  postersCount: number;
}

const AdminDashboard = () => {
  const {
    currentAdmin,
    mediaItems,
    addMediaItem,
    updateMediaItem,
    deleteMediaItem,
    refreshMediaItems,
    loading,
    logout,
  } = useAdmin();

  const navigate = useNavigate();

  // Theme state
  //@ts-ignore
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [filter, setFilter] = useState<"all" | "image" | "video">("all");
  const [categoryFilter, setCategoryFilter] = useState<
    "all" | "showreel" | "ai-generation" | "movies" | "series" | "posters"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState<DashboardStats>({
    totalMedia: 0,
    totalImages: 0,
    totalVideos: 0,
    activeMedia: 0,
    recentUploads: 0,
    showreelCount: 0,
    aiGenerationCount: 0,
    moviesCount: 0,
    seriesCount: 0,
    postersCount: 0,
  });

  // Calculate stats whenever mediaItems change
  useEffect(() => {
    const newStats: DashboardStats = {
      totalMedia: mediaItems.length,
      totalImages: mediaItems.filter((item) => item.type === "image").length,
      totalVideos: mediaItems.filter((item) => item.type === "video").length,
      activeMedia: mediaItems.filter((item) => item.isActive).length,
      recentUploads: mediaItems.filter((item) => {
        const uploadDate = new Date(item.createdAt);
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        return uploadDate > weekAgo;
      }).length,
      showreelCount: mediaItems.filter((item) => item.category === "showreel")
        .length,
      aiGenerationCount: mediaItems.filter(
        (item) => item.category === "ai-generation"
      ).length,
      moviesCount: mediaItems.filter((item) => item.category === "movies")
        .length,
      seriesCount: mediaItems.filter((item) => item.category === "series")
        .length,
      postersCount: mediaItems.filter((item) => item.category === "posters")
        .length,
    };
    setStats(newStats);
  }, [mediaItems]);

  // Handlers
  const handleAddMedia = async (formData: FormData | any) => {
    try {
      await addMediaItem(formData);
      setIsUploadModalOpen(false);
      toast.success("Media uploaded successfully!");
    } catch (error) {
      console.error("Error uploading media:", error);
      toast.error("Failed to upload media. Please try again.");
    }
  };

  const handleEditMedia = async (formData: FormData) => {
    if (!editingItem) return;
    try {
      await updateMediaItem(editingItem._id, formData);
      setEditingItem(null);
      setIsUploadModalOpen(false);
      await refreshMediaItems();
      toast.success("Media updated successfully!");
    } catch (error) {
      console.error("Error updating media:", error);
      toast.error("Failed to update media. Please try again.");
    }
  };

  const handleDeleteMedia = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this media?")) {
      try {
        await deleteMediaItem(id);
        toast.success("Media deleted successfully!");
      } catch (error: any) {
        toast.error(
          error.message || "Failed to delete media. Please try again."
        );
      }
    }
  };

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      await logout();
      navigate("/admin/login");
      toast.success("Logged out successfully!");
    }
  };

  const openEditModal = (item: any) => {
    setEditingItem(item);
    setIsUploadModalOpen(true);
  };

  const closeModal = () => {
    setIsUploadModalOpen(false);
    setEditingItem(null);
  };

  useEffect(() => {
    refreshMediaItems();
  }, []);

  // Filter + search
  const filteredItems = mediaItems.filter((item) => {
    const matchesTypeFilter = filter === "all" || item.type === filter;
    const matchesCategoryFilter =
      categoryFilter === "all" || item.category === categoryFilter;
    const matchesSearch =
      searchTerm === "" ||
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags?.some((tag: string) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return matchesTypeFilter && matchesCategoryFilter && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "showreel":
        return "🎭";
      case "ai-generation":
        return "🤖";
      case "movies":
        return "🎬";
      case "series":
        return "📺";
      case "posters":
        return "🎨";
      default:
        return "📁";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "showreel":
        return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
      case "ai-generation":
        return "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)";
      case "movies":
        return "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)";
      case "series":
        return "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)";
      case "posters":
        return "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)";
      default:
        return "#6c757d";
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Pixel Arts VFX</title>
        <meta
          name="description"
          content="Admin dashboard for managing media content"
        />
      </Helmet>

      <div className={`admin-dashboard ${isDarkMode ? "dark-theme" : ""}`}>
        {/* Sidebar */}
        <div className="dashboard-sidebar">
          <div className="sidebar-header">
            <img
              src="/assets/img/pixelart-logo.png"
              alt="Pixel Arts VFX"
              className="logo"
            />
            <div style={{ marginTop: "1rem", textAlign: "center" }}>
              <small style={{ color: "#888", fontSize: "12px" }}>
                Welcome, {currentAdmin?.username || "Admin"}
              </small>
            </div>
          </div>
          <nav className="sidebar-nav">
            <button
              className={`nav-item ${
                filter === "all" && categoryFilter === "all" ? "active" : ""
              }`}
              onClick={() => {
                setFilter("all");
                setCategoryFilter("all");
              }}
            >
              <i className="fas fa-photo-video"></i>
              <span>All Media</span>
            </button>

            {/* Main Categories */}
            <div
              style={{
                borderTop: "1px solid #333",
                margin: "0.5rem 0",
                paddingTop: "0.5rem",
              }}
            >
              <small
                style={{
                  color: "#888",
                  padding: "0 1rem",
                  fontSize: "10px",
                  textTransform: "uppercase",
                }}
              >
                Main Categories
              </small>
            </div>
            <button
              className={`nav-item ${
                categoryFilter === "showreel" ? "active" : ""
              }`}
              onClick={() => setCategoryFilter("showreel")}
            >
              <i className="fas fa-film"></i>
              <span>Showreel</span>
            </button>
            <button
              className={`nav-item ${
                categoryFilter === "ai-generation" ? "active" : ""
              }`}
              onClick={() => setCategoryFilter("ai-generation")}
            >
              <i className="fas fa-robot"></i>
              <span>AI Generation</span>
            </button>

            {/* Project Categories */}
            <div
              style={{
                borderTop: "1px solid #333",
                margin: "0.5rem 0",
                paddingTop: "0.5rem",
              }}
            >
              <small
                style={{
                  color: "#888",
                  padding: "0 1rem",
                  fontSize: "10px",
                  textTransform: "uppercase",
                }}
              >
                Project Categories
              </small>
            </div>
            <button
              className={`nav-item ${
                categoryFilter === "movies" ? "active" : ""
              }`}
              onClick={() => setCategoryFilter("movies")}
            >
              <i className="fas fa-film"></i>
              <span>Movies</span>
            </button>
            <button
              className={`nav-item ${
                categoryFilter === "series" ? "active" : ""
              }`}
              onClick={() => setCategoryFilter("series")}
            >
              <i className="fas fa-tv"></i>
              <span>Series</span>
            </button>
            <button
              className={`nav-item ${
                categoryFilter === "posters" ? "active" : ""
              }`}
              onClick={() => setCategoryFilter("posters")}
            >
              <i className="fas fa-palette"></i>
              <span>Posters</span>
            </button>

            {/* Type Filters */}
            <div
              style={{
                borderTop: "1px solid #333",
                margin: "0.5rem 0",
                paddingTop: "0.5rem",
              }}
            >
              <small
                style={{
                  color: "#888",
                  padding: "0 1rem",
                  fontSize: "10px",
                  textTransform: "uppercase",
                }}
              >
                Type Filters
              </small>
            </div>
            <button
              className={`nav-item ${filter === "image" ? "active" : ""}`}
              onClick={() => {
                setFilter("image");
                setCategoryFilter("all");
              }}
            >
              <i className="fas fa-image"></i>
              <span>Images</span>
            </button>
            <button
              className={`nav-item ${filter === "video" ? "active" : ""}`}
              onClick={() => {
                setFilter("video");
                setCategoryFilter("all");
              }}
            >
              <i className="fas fa-video"></i>
              <span>Videos</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="dashboard-main">
          {/* Top Bar */}
          <div className="dashboard-topbar">
            <div className="search-bar">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search media..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="topbar-actions">
              {/* ✅ Top Group */}
              <div className="top-actions">
                <Link
                  to="/admin/change-password"
                  className="btn-topbar btn-green"
                >
                  <i className="fas fa-key"></i>
                  <span>Change Password</span>
                </Link>

                <button
                  className="btn-topbar btn-blue"
                  onClick={() => setIsUploadModalOpen(true)}
                >
                  <i className="fas fa-plus"></i>
                  <span>Add Media</span>
                </button>
                <button className="btn-topbar btn-red" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i>
                  <span>Logout</span>
                </button>
              </div>

              {/* ✅ Bottom Group */}

              <div className="bottom-actions">
                <Link to="/showreel" className="btn-topbar btn-pink">
                  <i className="fas fa-film"></i>
                  <span>Showreel</span>
                </Link>

                <Link to="/ai-generation" className="btn-topbar btn-pink">
                  <i className="fas fa-robot"></i>
                  <span>AI Gallery</span>
                </Link>

                <Link to="/project" className="btn-topbar btn-pink">
                  <i className="fas fa-project-diagram"></i>
                  <span>Projects</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div
            className="stats-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "16px",
              marginBottom: "2rem",
            }}
          >
            <div
              className="stat-card"
              style={{
                backgroundColor: isDarkMode ? "#2a2a2a" : "#ffffff",
                border: isDarkMode ? "1px solid #404040" : "1px solid #e1e5e9",
                borderRadius: "12px",
                padding: "16px",
                textAlign: "center",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
              }}
            >
              <div
                className="icon"
                style={{
                  fontSize: "24px",
                  marginBottom: "8px",
                  color: "#8e52ff",
                }}
              >
                <i className="fas fa-database"></i>
              </div>
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  margin: "4px 0",
                  color: isDarkMode ? "#ffffff" : "#1a1a1a",
                }}
              >
                {stats.totalMedia}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  color: isDarkMode ? "#888" : "#666",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Total Media
              </p>
            </div>
            <div
              className="stat-card"
              style={{
                backgroundColor: isDarkMode ? "#2a2a2a" : "#ffffff",
                border: isDarkMode ? "1px solid #404040" : "1px solid #e1e5e9",
                borderRadius: "12px",
                padding: "16px",
                textAlign: "center",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
              }}
            >
              <div
                className="icon"
                style={{
                  fontSize: "24px",
                  marginBottom: "8px",
                  color: "#667eea",
                }}
              >
                🎭
              </div>
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  margin: "4px 0",
                  color: isDarkMode ? "#ffffff" : "#1a1a1a",
                }}
              >
                {stats.showreelCount}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  color: isDarkMode ? "#888" : "#666",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Showreel
              </p>
            </div>
            <div
              className="stat-card"
              style={{
                backgroundColor: isDarkMode ? "#2a2a2a" : "#ffffff",
                border: isDarkMode ? "1px solid #404040" : "1px solid #e1e5e9",
                borderRadius: "12px",
                padding: "16px",
                textAlign: "center",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
              }}
            >
              <div
                className="icon"
                style={{
                  fontSize: "24px",
                  marginBottom: "8px",
                  color: "#ff6b6b",
                }}
              >
                🤖
              </div>
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  margin: "4px 0",
                  color: isDarkMode ? "#ffffff" : "#1a1a1a",
                }}
              >
                {stats.aiGenerationCount}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  color: isDarkMode ? "#888" : "#666",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                AI Generated
              </p>
            </div>
            <div
              className="stat-card"
              style={{
                backgroundColor: isDarkMode ? "#2a2a2a" : "#ffffff",
                border: isDarkMode ? "1px solid #404040" : "1px solid #e1e5e9",
                borderRadius: "12px",
                padding: "16px",
                textAlign: "center",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
              }}
            >
              <div
                className="icon"
                style={{
                  fontSize: "24px",
                  marginBottom: "8px",
                  color: "#f093fb",
                }}
              >
                🎬
              </div>
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  margin: "4px 0",
                  color: isDarkMode ? "#ffffff" : "#1a1a1a",
                }}
              >
                {stats.moviesCount}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  color: isDarkMode ? "#888" : "#666",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Movies
              </p>
            </div>
            <div
              className="stat-card"
              style={{
                backgroundColor: isDarkMode ? "#2a2a2a" : "#ffffff",
                border: isDarkMode ? "1px solid #404040" : "1px solid #e1e5e9",
                borderRadius: "12px",
                padding: "16px",
                textAlign: "center",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
              }}
            >
              <div
                className="icon"
                style={{
                  fontSize: "24px",
                  marginBottom: "8px",
                  color: "#4facfe",
                }}
              >
                📺
              </div>
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  margin: "4px 0",
                  color: isDarkMode ? "#ffffff" : "#1a1a1a",
                }}
              >
                {stats.seriesCount}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  color: isDarkMode ? "#888" : "#666",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Series
              </p>
            </div>
            <div
              className="stat-card"
              style={{
                backgroundColor: isDarkMode ? "#2a2a2a" : "#ffffff",
                border: isDarkMode ? "1px solid #404040" : "1px solid #e1e5e9",
                borderRadius: "12px",
                padding: "16px",
                textAlign: "center",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
              }}
            >
              <div
                className="icon"
                style={{
                  fontSize: "24px",
                  marginBottom: "8px",
                  color: "#43e97b",
                }}
              >
                🎨
              </div>
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  margin: "4px 0",
                  color: isDarkMode ? "#ffffff" : "#1a1a1a",
                }}
              >
                {stats.postersCount}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  color: isDarkMode ? "#888" : "#666",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Posters
              </p>
            </div>
          </div>

          {/* Filter Summary */}
          <div
            className="filter-summary"
            style={{
              padding: "1rem 1.5rem",
              backgroundColor: isDarkMode ? "#242526" : "#f8f9fa",
              borderRadius: "12px",
              marginBottom: "1.5rem",
              border: isDarkMode ? "1px solid #393a3b" : "1px solid #e0e0e0",
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span
                  style={{
                    color: isDarkMode ? "#e4e6eb" : "#333",
                    fontWeight: "500",
                  }}
                >
                  Showing: {filteredItems.length} items
                </span>
                {categoryFilter !== "all" && (
                  <span
                    style={{
                      marginLeft: "1rem",
                      padding: "4px 12px",
                      background: getCategoryColor(categoryFilter),
                      color: "white",
                      borderRadius: "15px",
                      fontSize: "12px",
                      fontWeight: "500",
                    }}
                  >
                    {getCategoryIcon(categoryFilter)}{" "}
                    {categoryFilter.charAt(0).toUpperCase() +
                      categoryFilter.slice(1)}
                  </span>
                )}
              </div>
              {(filter !== "all" || categoryFilter !== "all" || searchTerm) && (
                <button
                  onClick={() => {
                    setFilter("all");
                    setCategoryFilter("all");
                    setSearchTerm("");
                  }}
                  style={{
                    background: "none",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    padding: "4px 12px",
                    fontSize: "12px",
                    cursor: "pointer",
                    color: isDarkMode ? "#b0b3b8" : "#666",
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Media Grid */}
          <div className="media-grid">
            {loading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading media...</p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="empty-state">
                <div className="icon">{getCategoryIcon(categoryFilter)}</div>
                <h4>No media found</h4>
                <p>
                  {searchTerm
                    ? "Try adjusting your search terms or filters."
                    : categoryFilter !== "all"
                    ? `No ${categoryFilter} content yet. Upload some media to get started.`
                    : "Try uploading some media or adjust your filters."}
                </p>
              </div>
            ) : (
              filteredItems.map((item) => (
                <div key={item.id} className="media-card">
                  <div className="media-thumbnail">
                    {item.type === "image" ? (
                      <img src={item.url} alt={item.title} />
                    ) : (
                      <video src={item.url} controls />
                    )}
                    {/* Category Badge */}
                    <div
                      style={{
                        position: "absolute",
                        top: "8px",
                        left: "8px",
                        padding: "4px 8px",
                        borderRadius: "12px",
                        fontSize: "10px",
                        fontWeight: "600",
                        color: "white",
                        background: getCategoryColor(item.category),
                      }}
                    >
                      {getCategoryIcon(item.category)}{" "}
                      {item.category.toUpperCase()}
                    </div>
                  </div>
                  <div className="media-info">
                    <h6>{item.title || "Untitled"}</h6>
                    <p>{item.description || "No description"}</p>
                    <div
                      style={{
                        fontSize: "11px",
                        color: isDarkMode ? "#888" : "#666",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Category: {item.category || "uncategorized"} • Type:{" "}
                      {item.type} •
                      {new Date(item.uploadDate).toLocaleDateString()}
                    </div>
                    <div className="media-actions">
                      
                      <button
                        className="btn-edit"
                        onClick={() => openEditModal(item)}
                      >
                        <i className="fas fa-edit"></i> Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteMedia(item.id)}
                      >
                        <i className="fas fa-trash"></i> Delete
                      </button>
                      {item.isHeroImage && (
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
      background: "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)",
      boxShadow: "0 2px 8px rgba(255, 215, 0, 0.3)"
    }}
  >
    ⭐ HERO IMAGE
  </div>
)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Upload / Edit Modal */}
        {isUploadModalOpen && (
          <MediaUploadModal
            isOpen={isUploadModalOpen}
            onClose={closeModal}
            onSubmit={editingItem ? handleEditMedia : handleAddMedia}
            editingItem={editingItem}
          />
        )}
      </div>
    </>
  );
};

export default AdminDashboard;


