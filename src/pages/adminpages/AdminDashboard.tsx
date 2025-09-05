import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
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
  } = useAdmin();

  // Theme state
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
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState<DashboardStats>({
    totalMedia: 0,
    totalImages: 0,
    totalVideos: 0,
    activeMedia: 0,
    recentUploads: 0,
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
      // Pass the ID from _id since that's what MongoDB uses
      await updateMediaItem(editingItem._id, formData);
      setEditingItem(null);
      setIsUploadModalOpen(false);
      await refreshMediaItems(); // Refresh to get updated data
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

  const openEditModal = (item: any) => {
    setEditingItem(item);
    setIsUploadModalOpen(true);
  };

  const closeModal = () => {
    setIsUploadModalOpen(false);
    setEditingItem(null);
  };

  useEffect(() => {
    // Fetch media items when component mounts
    refreshMediaItems();
  }, []);

  // Filter + search
  const filteredItems = mediaItems.filter((item) => {
    const matchesFilter = filter === "all" || item.type === filter;
    const matchesSearch =
      searchTerm === "" ||
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags?.some((tag: string) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return matchesFilter && matchesSearch;
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
          </div>
          <nav className="sidebar-nav">
            <button
              className={`nav-item ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              <i className="fas fa-photo-video"></i>
              <span>All Media</span>
            </button>
            <button
              className={`nav-item ${filter === "image" ? "active" : ""}`}
              onClick={() => setFilter("image")}
            >
              <i className="fas fa-image"></i>
              <span>Images</span>
            </button>
            <button
              className={`nav-item ${filter === "video" ? "active" : ""}`}
              onClick={() => setFilter("video")}
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
              <button
                className="btn-add"
                onClick={() => setIsUploadModalOpen(true)}
              >
                <i className="fas fa-plus"></i>
                <span>Add Media</span>
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
              <div className="icon">🖼️</div>
              <h3>{stats.totalImages}</h3>
              <p>Images</p>
            </div>
            <div className="stat-card">
              <div className="icon">🎬</div>
              <h3>{stats.totalVideos}</h3>
              <p>Videos</p>
            </div>
            <div className="stat-card">
              <div className="icon">📈</div>
              <h3>{stats.recentUploads}</h3>
              <p>This Week</p>
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
                <div className="icon">📁</div>
                <h4>No media found</h4>
                <p>Try adjusting your filters or upload new media.</p>
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
                  </div>
                  <div className="media-info">
                    <h6>{item.title || "Untitled"}</h6>
                    <p>{item.description || "No description"}</p>
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
