import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useAdmin } from "../../contexts/AdminContext";
import { toast } from "react-toastify";
import MediaUploadModal from "../../components/admin/MediaUploadModal";

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
    loading,
  } = useAdmin();

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

  const handleEditMedia = async (formData: any) => {
    if (!editingItem) return;

    try {
      await updateMediaItem(editingItem.id, formData);
      setEditingItem(null);
      setIsUploadModalOpen(false);
      toast.success("Media updated successfully!");
    } catch (error) {
      console.error("Error updating media:", error);
      toast.error("Failed to update media. Please try again.");
    }
  };

  const handleDeleteMedia = async (id: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this media? This action cannot be undone."
      )
    ) {
      try {
        await deleteMediaItem(id);
        toast.success("Media deleted successfully!");
      } catch (error) {
        console.error("Error deleting media:", error);
        toast.error("Failed to delete media. Please try again.");
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

      <div
        className="admin-dashboard"
        style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
      >
        {/* Header */}
        <div
          className="dashboard-header"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            padding: "2rem 0",
          }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-8">
                <h1 className="mb-2" style={{ fontWeight: "700" }}>
                  Welcome back, {currentAdmin?.username}!
                </h1>
                <p className="mb-0" style={{ opacity: 0.9 }}>
                  Manage your media content and track performance
                </p>
              </div>
              <div className="col-md-4 text-md-end">
                <button
                  className="btn btn-light"
                  onClick={() => setIsUploadModalOpen(true)}
                  style={{
                    borderRadius: "25px",
                    padding: "12px 30px",
                    fontWeight: "600",
                    boxShadow: "0 4px 15px rgba(255,255,255,0.3)",
                  }}
                >
                  <i className="fas fa-plus me-2"></i>
                  Add New Media
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="container"
          style={{ marginTop: "-50px", position: "relative", zIndex: 10 }}
        >
          {/* Stats Cards */}
          <div className="row mb-4">
            <div className="col-lg-3 col-md-6 mb-3">
              <div
                className="card border-0 shadow-sm h-100"
                style={{ borderRadius: "15px" }}
              >
                <div
                  className="card-body text-center"
                  style={{ padding: "2rem 1rem" }}
                >
                  <div
                    style={{
                      fontSize: "2.5rem",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      marginBottom: "1rem",
                    }}
                  >
                    📁
                  </div>
                  <h3
                    className="mb-1"
                    style={{ color: "#333", fontWeight: 700 }}
                  >
                    {stats.totalMedia}
                  </h3>
                  <p className="text-muted mb-0">Total Media</p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-3">
              <div
                className="card border-0 shadow-sm h-100"
                style={{ borderRadius: "15px" }}
              >
                <div
                  className="card-body text-center"
                  style={{ padding: "2rem 1rem" }}
                >
                  <div
                    style={{
                      fontSize: "2.5rem",
                      color: "#28a745",
                      marginBottom: "1rem",
                    }}
                  >
                    🖼️
                  </div>
                  <h3
                    className="mb-1"
                    style={{ color: "#333", fontWeight: 700 }}
                  >
                    {stats.totalImages}
                  </h3>
                  <p className="text-muted mb-0">Images</p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-3">
              <div
                className="card border-0 shadow-sm h-100"
                style={{ borderRadius: "15px" }}
              >
                <div
                  className="card-body text-center"
                  style={{ padding: "2rem 1rem" }}
                >
                  <div
                    style={{
                      fontSize: "2.5rem",
                      color: "#007bff",
                      marginBottom: "1rem",
                    }}
                  >
                    🎬
                  </div>
                  <h3
                    className="mb-1"
                    style={{ color: "#333", fontWeight: 700 }}
                  >
                    {stats.totalVideos}
                  </h3>
                  <p className="text-muted mb-0">Videos</p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-3">
              <div
                className="card border-0 shadow-sm h-100"
                style={{ borderRadius: "15px" }}
              >
                <div
                  className="card-body text-center"
                  style={{ padding: "2rem 1rem" }}
                >
                  <div
                    style={{
                      fontSize: "2.5rem",
                      color: "#fd7e14",
                      marginBottom: "1rem",
                    }}
                  >
                    📈
                  </div>
                  <h3
                    className="mb-1"
                    style={{ color: "#333", fontWeight: 700 }}
                  >
                    {stats.recentUploads}
                  </h3>
                  <p className="text-muted mb-0">This Week</p>
                </div>
              </div>
            </div>
          </div>

          {/* Media Management Section */}
          <div className="row">
            <div className="col-12">
              <div
                className="card border-0 shadow-sm"
                style={{ borderRadius: "15px" }}
              >
                <div
                  className="card-header bg-white border-0"
                  style={{
                    padding: "1.5rem",
                    borderRadius: "15px 15px 0 0",
                  }}
                >
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <h5
                        className="mb-0"
                        style={{ fontWeight: 600, color: "#333" }}
                      >
                        Media Library ({filteredItems.length})
                      </h5>
                    </div>
                    <div className="col-md-6">
                      <div className="row g-2">
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search media..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ borderRadius: "8px" }}
                          />
                        </div>
                        <div className="col-md-6">
                          <select
                            className="form-select"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value as any)}
                            style={{ borderRadius: "8px" }}
                          >
                            <option value="all">All Types</option>
                            <option value="image">Images</option>
                            <option value="video">Videos</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-body" style={{ padding: "1.5rem" }}>
                  {loading ? (
                    <div className="text-center py-5">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="mt-3 text-muted">Loading media...</p>
                    </div>
                  ) : filteredItems.length === 0 ? (
                    <div className="text-center py-5">
                      <div style={{ fontSize: "4rem", opacity: 0.3 }}>📁</div>
                      <h4 className="mt-3 mb-3" style={{ color: "#666" }}>
                        No media found
                      </h4>
                      <p className="text-muted">
                        Try adjusting your filters or upload new media.
                      </p>
                    </div>
                  ) : (
                    <div className="row g-4">
                      {filteredItems.map((item) => (
                        <div
                          className="col-lg-3 col-md-4 col-sm-6"
                          key={item.id}
                        >
                          <div
                            className="card h-100 shadow-sm border-0"
                            style={{ borderRadius: "12px", overflow: "hidden" }}
                          >
                            {/* Thumbnail */}
                            {item.type === "image" ? (
                              <img
                                src={item.url}
                                alt={item.title}
                                className="card-img-top"
                                style={{
                                  height: "180px",
                                  objectFit: "cover",
                                }}
                              />
                            ) : (
                              <video
                                src={item.url}
                                className="card-img-top"
                                style={{
                                  height: "180px",
                                  objectFit: "cover",
                                }}
                                controls
                              />
                            )}

                            {/* Card Body */}
                            <div className="card-body d-flex flex-column">
                              <h6
                                className="card-title mb-1"
                                style={{ fontWeight: 600 }}
                              >
                                {item.title || "Untitled"}
                              </h6>
                              <p className="text-muted small mb-2">
                                {item.description || "No description"}
                              </p>
                              <div className="mt-auto d-flex justify-content-between">
                                <button
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() => openEditModal(item)}
                                >
                                  <i className="fas fa-edit me-1"></i> Edit
                                </button>
                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleDeleteMedia(item.id)}
                                >
                                  <i className="fas fa-trash me-1"></i> Delete
                                </button>
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
