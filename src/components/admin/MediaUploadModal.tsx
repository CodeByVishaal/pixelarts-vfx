import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

interface MediaUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData | any) => Promise<void>;
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
  const [uploadMode, setUploadMode] = useState<"file" | "url">("url");
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize preview URL for editing
  useEffect(() => {
    if (editingItem?.url) {
      setPreviewUrl(editingItem.url);
    }
  }, [editingItem]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

      let submitData: FormData | any;

      if (uploadMode === "file" && selectedFile) {
        // File upload mode
        submitData = new FormData();
        submitData.append("file", selectedFile);
        submitData.append("title", formData.title);
        submitData.append("description", formData.description);
        submitData.append("type", formData.type);
        submitData.append("category", formData.category);

        // Add tags as array
        if (formData.tags.trim()) {
          const tagsArray = formData.tags
            .split(",")
            .map((tag: string) => tag.trim())
            .filter((tag: string) => tag);
          tagsArray.forEach((tag: string) => submitData.append("tags", tag));
        }
      } else {
        // URL mode or editing
        submitData = {
          title: formData.title,
          description: formData.description,
          type: formData.type,
          category: formData.category,
          tags: formData.tags
            .split(",")
            .map((tag: string) => tag.trim())
            .filter((tag: string) => tag),
          ...(formData.url && { url: formData.url }),
        };
      }

      await onSubmit(submitData);

      // Reset form
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
      onClose();
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Update preview for URL mode
    if (name === "url" && uploadMode === "url") {
      setPreviewUrl(value);
    }
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
      handleFileSelection(files[0]);
    }
  };

  const handleFileSelection = (file: File) => {
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
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      toast.error("File size too large. Maximum size is 10MB.");
      return;
    }

    setSelectedFile(file);

    // Set file type based on file
    const fileType = validImageTypes.includes(file.type) ? "image" : "video";
    setFormData((prev) => ({
      ...prev,
      type: fileType,
      title: prev.title || file.name.split(".")[0], // Set title if empty
    }));

    // Create preview URL
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileSelection(files[0]);
    }
  };

  const closeModal = () => {
    // Clean up preview URL
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
    setUploadMode("url");
    onClose();
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
              onClick={closeModal}
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body" style={{ padding: "0 1.5rem 1.5rem" }}>
              {/* Upload Mode Toggle (only show when adding new media) */}
              {!editingItem && (
                <div className="mb-4">
                  <label
                    className="form-label"
                    style={{ fontWeight: "500", color: "#333" }}
                  >
                    Upload Method
                  </label>
                  <div className="btn-group w-100" role="group">
                    <button
                      type="button"
                      className={`btn ${
                        uploadMode === "url"
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                      onClick={() => setUploadMode("url")}
                      style={{ borderRadius: "8px 0 0 8px" }}
                    >
                      URL Upload
                    </button>
                    <button
                      type="button"
                      className={`btn ${
                        uploadMode === "file"
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                      onClick={() => setUploadMode("file")}
                      style={{ borderRadius: "0 8px 8px 0" }}
                    >
                      File Upload
                    </button>
                  </div>
                </div>
              )}

              {/* File Upload Section */}
              {uploadMode === "file" && !editingItem && (
                <div className="mb-4">
                  <label
                    className="form-label"
                    style={{ fontWeight: "500", color: "#333" }}
                  >
                    Upload File
                  </label>
                  <div
                    className={`border-2 border-dashed rounded p-4 text-center ${
                      dragActive
                        ? "border-primary bg-light"
                        : "border-secondary"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    style={{
                      cursor: "pointer",
                      minHeight: "120px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={handleFileSelect}
                  >
                    {selectedFile ? (
                      <div>
                        <p
                          className="mb-2"
                          style={{ color: "#28a745", fontWeight: "500" }}
                        >
                          ✓ {selectedFile.name}
                        </p>
                        <small className="text-muted">
                          Click to change file
                        </small>
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontSize: "2rem", marginBottom: "10px" }}>
                          📁
                        </div>
                        <p className="mb-2" style={{ color: "#333" }}>
                          Drag and drop your file here, or click to select
                        </p>
                        <small className="text-muted">
                          Supports: Images (JPG, PNG, GIF, WebP) and Videos
                          (MP4, MOV, AVI)
                          <br />
                          Max size: 10MB
                        </small>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileInputChange}
                    accept="image/*,video/*"
                    style={{ display: "none" }}
                  />
                </div>
              )}

              {/* URL Input (for URL mode or editing) */}
              {(uploadMode === "url" || editingItem) && (
                <div className="mb-4">
                  <label
                    htmlFor="url"
                    className="form-label"
                    style={{ fontWeight: "500", color: "#333" }}
                  >
                    Media URL
                  </label>
                  <input
                    type="url"
                    className="form-control"
                    id="url"
                    name="url"
                    value={formData.url}
                    onChange={handleInputChange}
                    placeholder="https://example.com/media.jpg"
                    required={uploadMode === "url"}
                    disabled={loading}
                    style={{ padding: "12px", borderRadius: "8px" }}
                  />
                </div>
              )}

              {/* Preview Section */}
              {previewUrl && (
                <div className="mb-4">
                  <label
                    className="form-label"
                    style={{ fontWeight: "500", color: "#333" }}
                  >
                    Preview
                  </label>
                  <div
                    className="border rounded"
                    style={{
                      padding: "10px",
                      backgroundColor: "#f8f9fa",
                      maxHeight: "200px",
                      overflow: "hidden",
                    }}
                  >
                    {formData.type === "video" ||
                    previewUrl.includes(".mp4") ||
                    previewUrl.includes("video") ? (
                      <video
                        src={previewUrl}
                        controls
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: "8px",
                        }}
                      />
                    ) : (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: "8px",
                        }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/400x240/e9ecef/6c757d?text=Preview+Not+Available";
                        }}
                      />
                    )}
                  </div>
                </div>
              )}

              <div className="row">
                {/* Title */}
                <div className="col-md-6 mb-3">
                  <label
                    htmlFor="title"
                    className="form-label"
                    style={{ fontWeight: "500", color: "#333" }}
                  >
                    Title *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter media title"
                    required
                    disabled={loading}
                    maxLength={100}
                    style={{ padding: "12px", borderRadius: "8px" }}
                  />
                </div>

                {/* Type */}
                <div className="col-md-6 mb-3">
                  <label
                    htmlFor="type"
                    className="form-label"
                    style={{ fontWeight: "500", color: "#333" }}
                  >
                    Type
                  </label>
                  <select
                    className="form-select"
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    disabled={
                      loading || (uploadMode === "file" && !!selectedFile)
                    }
                    style={{ padding: "12px", borderRadius: "8px" }}
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                </div>
              </div>

              <div className="row">
                {/* Category */}
                <div className="col-md-6 mb-3">
                  <label
                    htmlFor="category"
                    className="form-label"
                    style={{ fontWeight: "500", color: "#333" }}
                  >
                    Category
                  </label>
                  <select
                    className="form-select"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    disabled={loading}
                    style={{ padding: "12px", borderRadius: "8px" }}
                  >
                    <option value="showreel">Showreel</option>
                    <option value="portfolio">Portfolio</option>
                    <option value="demo">Demo</option>
                    <option value="tutorial">Tutorial</option>
                    <option value="behind-scenes">Behind Scenes</option>
                  </select>
                </div>

                {/* Tags */}
                <div className="col-md-6 mb-3">
                  <label
                    htmlFor="tags"
                    className="form-label"
                    style={{ fontWeight: "500", color: "#333" }}
                  >
                    Tags
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="vfx, animation, 3d (comma separated)"
                    disabled={loading}
                    style={{ padding: "12px", borderRadius: "8px" }}
                  />
                  <small className="form-text text-muted">
                    Separate tags with commas
                  </small>
                </div>
              </div>

              {/* Description */}
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="form-label"
                  style={{ fontWeight: "500", color: "#333" }}
                >
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter media description (optional)"
                  disabled={loading}
                  maxLength={500}
                  style={{
                    padding: "12px",
                    borderRadius: "8px",
                    resize: "vertical",
                  }}
                ></textarea>
                <small className="form-text text-muted">
                  {formData.description.length}/500 characters
                </small>
              </div>
            </div>

            <div
              className="modal-footer border-0"
              style={{ padding: "0 1.5rem 1.5rem" }}
            >
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
                disabled={loading}
                style={{ borderRadius: "8px", padding: "10px 20px" }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={
                  loading ||
                  !formData.title.trim() ||
                  (uploadMode === "url" && !formData.url.trim()) ||
                  (uploadMode === "file" && !selectedFile && !editingItem)
                }
                style={{
                  borderRadius: "8px",
                  padding: "10px 20px",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                }}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    {editingItem ? "Updating..." : "Uploading..."}
                  </>
                ) : editingItem ? (
                  "Update Media"
                ) : (
                  "Upload Media"
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
