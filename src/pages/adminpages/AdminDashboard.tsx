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
    "all" | "showreel" | "ai-generation"
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
        const success = await deleteMediaItem(id);
        if (success) {
          toast.success("Media deleted successfully!");
        }
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
              <Link
                to="/showreel"
                className="btn-showreel"
                title="View Showreel"
              >
                <i className="fas fa-film"></i>
                <span>Showreel</span>
              </Link>
              <Link
                to="/ai-generation"
                className="btn btn-info btn-sm"
                style={{
                  borderRadius: "8px",
                  padding: "8px 16px",
                  backgroundColor: "#ff6b6b",
                  color: "white",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
                title="View AI Generation"
              >
                <i className="fas fa-robot"></i>
                <span>AI Gallery</span>
              </Link>
              <button
                className="btn-add"
                onClick={() => setIsUploadModalOpen(true)}
              >
                <i className="fas fa-plus"></i>
                <span>Add Media</span>
              </button>
              <button
                className="btn-logout"
                onClick={handleLogout}
                title="Logout"
              >
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="icon">📁</div>
              <h3>{stats.totalMedia}</h3>
              <p>Total Media</p>
            </div>
            <div className="stat-card">
              <div className="icon">🎭</div>
              <h3>{stats.showreelCount}</h3>
              <p>Showreel</p>
            </div>
            <div className="stat-card">
              <div className="icon">🤖</div>
              <h3>{stats.aiGenerationCount}</h3>
              <p>AI Generated</p>
            </div>
            <div className="stat-card">
              <div className="icon">📈</div>
              <h3>{stats.recentUploads}</h3>
              <p>This Week</p>
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
                      backgroundColor:
                        categoryFilter === "showreel" ? "#667eea" : "#ff6b6b",
                      color: "white",
                      borderRadius: "15px",
                      fontSize: "12px",
                      fontWeight: "500",
                    }}
                  >
                    {categoryFilter === "showreel"
                      ? "🎭 Showreel"
                      : "🤖 AI Generation"}
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
                <div className="icon">
                  {categoryFilter === "showreel"
                    ? "🎭"
                    : categoryFilter === "ai-generation"
                    ? "🤖"
                    : "📁"}
                </div>
                <h4>No media found</h4>
                <p>
                  {searchTerm
                    ? "Try adjusting your search terms or filters."
                    : categoryFilter !== "all"
                    ? `No ${
                        categoryFilter === "showreel"
                          ? "showreel"
                          : "AI generation"
                      } content yet. Upload some media to get started.`
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
                        background:
                          item.category === "showreel"
                            ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                            : item.category === "ai-generation"
                            ? "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)"
                            : "#6c757d",
                      }}
                    >
                      {item.category === "showreel" && "🎭 SHOWREEL"}
                      {item.category === "ai-generation" && "🤖 AI GENERATION"}
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
