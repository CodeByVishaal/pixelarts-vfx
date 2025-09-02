import { useRef, useState } from "react";

interface MediaUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
  editingItem?: any;
  loading?: boolean;
}

const MediaUploadModal = ({
  isOpen,
  onClose,
  onSubmit,
  editingItem,
  loading = false,
}: MediaUploadModalProps) => {
  const [formData, setFormData] = useState({
    type: editingItem?.type || "image",
    url: editingItem?.url || "",
    title: editingItem?.title || "",
    description: editingItem?.description || "",
  });
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    // In a real application, you would upload to a server and get back a URL
    // For this demo, we'll create a mock URL
    const mockUrl = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      url: mockUrl,
      type: file.type.startsWith("video/") ? "video" : "image",
      title: prev.title || file.name.split(".")[0],
    }));
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
    >
      <div className="modal-dialog modal-lg">
        <div
          className="modal-content"
          style={{ borderRadius: "15px", border: "none" }}
        >
          <div className="modal-header border-0" style={{ padding: "1.5rem" }}>
            <h5
              className="modal-title"
              style={{ fontWeight: "600", color: "#333" }}
            >
              {editingItem ? "Edit Media" : "Add New Media"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body" style={{ padding: "0 1.5rem 1.5rem" }}>
              {/* File Upload Area */}
              <div className="mb-4">
                <label
                  className="form-label"
                  style={{ fontWeight: "500", color: "#333" }}
                >
                  Upload File or Enter URL
                </label>
                <div
                  className={`upload-area ${dragActive ? "drag-active" : ""}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={handleFileSelect}
                  style={{
                    border: `2px dashed ${dragActive ? "#667eea" : "#dee2e6"}`,
                    borderRadius: "12px",
                    padding: "2rem",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    backgroundColor: dragActive ? "#f8f9ff" : "#f8f9fa",
                  }}
                >
                  <div
                    style={{
                      fontSize: "2.5rem",
                      marginBottom: "1rem",
                      opacity: 0.6,
                    }}
                  >
                    📁
                  </div>
                  <h6 style={{ color: "#333", marginBottom: "0.5rem" }}>
                    Drop files here or click to browse
                  </h6>
                  <p style={{ color: "#666", fontSize: "14px", margin: 0 }}>
                    Supports images and videos
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileInputChange}
                    style={{ display: "none" }}
                  />
                </div>
              </div>

              {/* Media Type */}
              <div className="mb-3">
                <label
                  className="form-label"
                  style={{ fontWeight: "500", color: "#333" }}
                >
                  Media Type
                </label>
                <select
                  name="type"
                  className="form-select"
                  value={formData.type}
                  onChange={handleInputChange}
                  style={{
                    borderRadius: "8px",
                    padding: "10px",
                    border: "2px solid #e1e5e9",
                  }}
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </div>

              {/* URL Input */}
              <div className="mb-3">
                <label
                  className="form-label"
                  style={{ fontWeight: "500", color: "#333" }}
                >
                  Media URL
                </label>
                <input
                  type="url"
                  name="url"
                  className="form-control"
                  value={formData.url}
                  onChange={handleInputChange}
                  placeholder="Enter image or video URL"
                  required
                  style={{
                    borderRadius: "8px",
                    padding: "10px",
                    border: "2px solid #e1e5e9",
                  }}
                />
                <small className="form-text text-muted">
                  You can upload a file above or paste a direct URL here
                </small>
              </div>

              {/* Title */}
              <div className="mb-3">
                <label
                  className="form-label"
                  style={{ fontWeight: "500", color: "#333" }}
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter media title"
                  required
                  style={{
                    borderRadius: "8px",
                    padding: "10px",
                    border: "2px solid #e1e5e9",
                  }}
                />
              </div>

              {/* Description */}
              <div className="mb-3">
                <label
                  className="form-label"
                  style={{ fontWeight: "500", color: "#333" }}
                >
                  Description (Optional)
                </label>
                <textarea
                  name="description"
                  className="form-control"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter media description"
                  style={{
                    borderRadius: "8px",
                    padding: "10px",
                    border: "2px solid #e1e5e9",
                    resize: "vertical",
                  }}
                />
              </div>

              {/* Preview */}
              {formData.url && (
                <div className="mb-3">
                  <label
                    className="form-label"
                    style={{ fontWeight: "500", color: "#333" }}
                  >
                    Preview
                  </label>
                  <div
                    className="border rounded"
                    style={{
                      borderRadius: "8px",
                      padding: "1rem",
                      backgroundColor: "#f8f9fa",
                      maxHeight: "300px",
                      overflow: "hidden",
                    }}
                  >
                    {formData.type === "image" ? (
                      <img
                        src={formData.url}
                        alt="Preview"
                        style={{
                          maxWidth: "100%",
                          height: "auto",
                          borderRadius: "6px",
                          maxHeight: "250px",
                          objectFit: "contain",
                        }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/400x240/e9ecef/6c757d?text=Invalid+Image+URL";
                        }}
                      />
                    ) : (
                      <video
                        src={formData.url}
                        controls
                        style={{
                          maxWidth: "100%",
                          height: "auto",
                          borderRadius: "6px",
                          maxHeight: "250px",
                        }}
                        onError={(e) => {
                          const container = e.target as HTMLVideoElement;
                          container.style.display = "none";
                          const errorDiv = document.createElement("div");
                          errorDiv.innerHTML =
                            '<p class="text-danger">Invalid video URL</p>';
                          container.parentNode?.appendChild(errorDiv);
                        }}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>

            <div
              className="modal-footer border-0"
              style={{ padding: "0 1.5rem 1.5rem" }}
            >
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
                style={{ borderRadius: "8px", padding: "10px 20px" }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={
                  loading || !formData.url.trim() || !formData.title.trim()
                }
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 20px",
                }}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    {editingItem ? "Updating..." : "Adding..."}
                  </>
                ) : editingItem ? (
                  "Update Media"
                ) : (
                  "Add Media"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MediaUploadModal;
