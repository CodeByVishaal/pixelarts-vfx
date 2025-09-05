import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

interface MediaUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
  editingItem?: any;
}

const MediaUploadModal: React.FC<MediaUploadModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingItem,
}) => {
  const [uploadMode, setUploadMode] = useState<"file" | "url">("file");
  const [formData, setFormData] = useState({
    type: editingItem?.type || "image",
    url: editingItem?.url || "",
    title: editingItem?.title || "",
    description: editingItem?.description || "",
    category: editingItem?.category || "showreel",
    tags: editingItem?.tags?.join(", ") || "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingItem) {
      setFormData({
        type: editingItem.type || "image",
        url: editingItem.url || "",
        title: editingItem.title || "",
        description: editingItem.description || "",
        category: editingItem.category || "showreel",
        tags: editingItem.tags?.join(", ") || "",
      });
      setPreviewUrl(editingItem.url || "");
      setSelectedFile(null);
    }
  }, [editingItem]);

  const handleFileUpload = (file: File) => {
    // Validate file type
    const validImageTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    const validVideoTypes = [
      "video/mp4",
      "video/mpeg",
      "video/quicktime",
      "video/x-msvideo",
    ];
    const allValidTypes = [...validImageTypes, ...validVideoTypes];

    if (!allValidTypes.includes(file.type)) {
      toast.error("Invalid file type. Please select an image or video file.");
      return;
    }

    // Check file size (10MB limit)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("File size too large. Maximum size is 10MB.");
      return;
    }

    setSelectedFile(file);
    const previewUrl = URL.createObjectURL(file);
    setPreviewUrl(previewUrl);

    setFormData((prev) => ({
      ...prev,
      url: previewUrl,
      type: validImageTypes.includes(file.type) ? "image" : "video",
      title: prev.title || file.name.split(".")[0],
    }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      if (uploadMode === "file" && !selectedFile && !editingItem) {
        toast.error("Please select a file to upload");
        return;
      }

      if (uploadMode === "url" && !formData.url.trim()) {
        toast.error("Please enter a valid URL");
        return;
      }

      if (!formData.title.trim()) {
        toast.error("Please enter a title");
        return;
      }

      const data = new FormData();

      if (uploadMode === "file" && selectedFile) {
        data.append("file", selectedFile);
      } else if (uploadMode === "url" && formData.url) {
        data.append("url", formData.url);
      }

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("type", formData.type);
      data.append("category", formData.category);

      if (formData.tags.trim()) {
        const tagsArray = formData.tags
          .split(",")
          .map((tag: string) => tag.trim())
          .filter((tag: string) => tag);
        tagsArray.forEach((tag: string) => data.append("tags", tag));
      }

      await onSubmit(data);
      handleClose();
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setFormData({
      type: "image",
      url: "",
      title: "",
      description: "",
      category: "showreel",
      tags: "",
    });
    setSelectedFile(null);
    setPreviewUrl("");
    setUploadMode("file");
    setUploading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1050,
        padding: "20px",
      }}
      onClick={handleClose}
    >
      <div
        className="modal-content"
        style={{
          backgroundColor: "#1a1a1a",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "600px",
          maxHeight: "90vh",
          overflow: "auto",
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
          border: "1px solid #333",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="modal-header"
          style={{
            padding: "24px 24px 0",
            borderBottom: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h3
                style={{
                  margin: 0,
                  color: "#ffffff",
                  fontWeight: "600",
                  fontSize: "24px",
                }}
              >
                {editingItem ? "✏️ Edit Media" : "📤 Upload Media"}
              </h3>
              <p
                style={{
                  margin: "8px 0 0",
                  color: "#888",
                  fontSize: "14px",
                }}
              >
                {editingItem
                  ? "Update your media content"
                  : "Add new content to your showreel"}
              </p>
            </div>
            <button
              onClick={handleClose}
              style={{
                background: "none",
                border: "none",
                color: "#888",
                fontSize: "24px",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "8px",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.backgroundColor = "#333";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#888";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              ✕
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ padding: "24px" }}>
            {/* Upload Mode Toggle */}
            {!editingItem && (
              <div style={{ marginBottom: "24px" }}>
                <label
                  style={{
                    display: "block",
                    color: "#ffffff",
                    fontWeight: "500",
                    marginBottom: "12px",
                    fontSize: "16px",
                  }}
                >
                  Upload Method
                </label>
                <div
                  className="toggle-buttons"
                  style={{
                    display: "flex",
                    backgroundColor: "#333",
                    borderRadius: "12px",
                    padding: "4px",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setUploadMode("file")}
                    style={{
                      flex: 1,
                      padding: "12px 20px",
                      borderRadius: "8px",
                      border: "none",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      backgroundColor:
                        uploadMode === "file" ? "#667eea" : "transparent",
                      color: uploadMode === "file" ? "#ffffff" : "#888",
                    }}
                  >
                    📁 Upload File
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadMode("url")}
                    style={{
                      flex: 1,
                      padding: "12px 20px",
                      borderRadius: "8px",
                      border: "none",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      backgroundColor:
                        uploadMode === "url" ? "#667eea" : "transparent",
                      color: uploadMode === "url" ? "#ffffff" : "#888",
                    }}
                  >
                    🔗 Enter URL
                  </button>
                </div>
              </div>
            )}

            {/* File Upload Area */}
            {uploadMode === "file" && !editingItem && (
              <div
                className="upload-area"
                style={{
                  border: `2px dashed ${dragActive ? "#667eea" : "#444"}`,
                  borderRadius: "16px",
                  padding: "40px 20px",
                  textAlign: "center",
                  marginBottom: "24px",
                  backgroundColor: dragActive
                    ? "rgba(102, 126, 234, 0.1)"
                    : "#2a2a2a",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div
                  style={{
                    fontSize: "48px",
                    marginBottom: "16px",
                    opacity: 0.7,
                  }}
                >
                  {selectedFile ? "✅" : "☁️"}
                </div>
                <h4
                  style={{
                    color: "#ffffff",
                    marginBottom: "8px",
                    fontWeight: "600",
                  }}
                >
                  {selectedFile
                    ? "File Selected!"
                    : "Drop files here or click to browse"}
                </h4>
                <p
                  style={{
                    color: "#888",
                    margin: 0,
                    fontSize: "14px",
                  }}
                >
                  {selectedFile
                    ? selectedFile.name
                    : "Supports images and videos (Max 10MB)"}
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  onChange={(e) =>
                    e.target.files && handleFileUpload(e.target.files[0])
                  }
                  style={{ display: "none" }}
                />
              </div>
            )}

            {/* URL Input */}
            {uploadMode === "url" && (
              <div style={{ marginBottom: "24px" }}>
                <label
                  style={{
                    display: "block",
                    color: "#ffffff",
                    fontWeight: "500",
                    marginBottom: "8px",
                  }}
                >
                  Media URL
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={formData.url}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, url: e.target.value }));
                    setPreviewUrl(e.target.value);
                  }}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    border: "1px solid #444",
                    backgroundColor: "#333",
                    color: "#ffffff",
                    fontSize: "14px",
                  }}
                />
              </div>
            )}

            {/* Preview */}
            {previewUrl && (
              <div
                style={{
                  marginBottom: "24px",
                  textAlign: "center",
                  backgroundColor: "#333",
                  borderRadius: "12px",
                  padding: "16px",
                }}
              >
                <label
                  style={{
                    display: "block",
                    color: "#ffffff",
                    fontWeight: "500",
                    marginBottom: "12px",
                  }}
                >
                  Preview
                </label>
                {formData.type === "image" ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      borderRadius: "8px",
                      objectFit: "contain",
                    }}
                    onError={() => toast.error("Invalid image URL")}
                  />
                ) : (
                  <video
                    src={previewUrl}
                    controls
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      borderRadius: "8px",
                    }}
                    onError={() => toast.error("Invalid video URL")}
                  />
                )}
              </div>
            )}

            {/* Form Fields */}
            <div
              className="form-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "20px",
              }}
            >
              {/* Media Type */}
              <div>
                <label
                  style={{
                    display: "block",
                    color: "#ffffff",
                    fontWeight: "500",
                    marginBottom: "8px",
                  }}
                >
                  Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, type: e.target.value }))
                  }
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    border: "1px solid #444",
                    backgroundColor: "#333",
                    color: "#ffffff",
                    fontSize: "14px",
                  }}
                >
                  <option value="image">📸 Image</option>
                  <option value="video">🎬 Video</option>
                </select>
              </div>

              {/* Category */}
              <div>
                <label
                  style={{
                    display: "block",
                    color: "#ffffff",
                    fontWeight: "500",
                    marginBottom: "8px",
                  }}
                >
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    border: "1px solid #444",
                    backgroundColor: "#333",
                    color: "#ffffff",
                    fontSize: "14px",
                  }}
                >
                  <option value="showreel">🎭 Showreel</option>
                  <option value="portfolio">💼 Portfolio</option>
                  <option value="demo">🚀 Demo</option>
                  <option value="tutorial">📚 Tutorial</option>
                  <option value="behind-scenes">🎬 Behind Scenes</option>
                </select>
              </div>
            </div>

            {/* Title */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  color: "#ffffff",
                  fontWeight: "500",
                  marginBottom: "8px",
                }}
              >
                Title *
              </label>
              <input
                type="text"
                placeholder="Enter a catchy title..."
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "1px solid #444",
                  backgroundColor: "#333",
                  color: "#ffffff",
                  fontSize: "14px",
                }}
              />
            </div>

            {/* Description */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  color: "#ffffff",
                  fontWeight: "500",
                  marginBottom: "8px",
                }}
              >
                Description
              </label>
              <textarea
                rows={3}
                placeholder="Describe your media content..."
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "1px solid #444",
                  backgroundColor: "#333",
                  color: "#ffffff",
                  fontSize: "14px",
                  resize: "vertical",
                }}
              />
            </div>
          </div>

          {/* Footer (already completed above) */}
          {/* ... */}
        </form>

        {/* Scrollbar and spinner styles (already present) */}
        <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .modal-content::-webkit-scrollbar {
          width: 8px;
        }

        .modal-content::-webkit-scrollbar-track {
          background: #333;
          border-radius: 4px;
        }

        .modal-content::-webkit-scrollbar-thumb {
          background: #667eea;
          border-radius: 4px;
        }

        .modal-content::-webkit-scrollbar-thumb:hover {
          background: #5a6fd8;
        }
      `}</style>
      </div>
    </div>
  );
};

export default MediaUploadModal;
