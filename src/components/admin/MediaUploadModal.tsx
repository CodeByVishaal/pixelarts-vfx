import React, { useState, useEffect } from "react";

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
  const [formData, setFormData] = useState({
    type: editingItem?.type || "image",
    url: editingItem?.url || "",
    title: editingItem?.title || "",
    description: editingItem?.description || "",
  });

  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (editingItem) {
      setFormData({
        type: editingItem.type || "image",
        url: editingItem.url || "",
        title: editingItem.title || "",
        description: editingItem.description || "",
      });
      setFile(null);
    }
  }, [editingItem]);

  const handleFileUpload = (file: File) => {
    setFile(file); // ✅ keep the real file
    const previewUrl = URL.createObjectURL(file);

    setFormData((prev) => ({
      ...prev,
      url: previewUrl, // preview only
      type: file.type.startsWith("video/") ? "video" : "image",
      title: prev.title || file.name.split(".")[0],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();

    if (file) {
      data.append("file", file); // ✅ must match backend upload.single("file")
    }
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("type", formData.type);

    // if you also want to allow external URLs (optional)
    if (!file && formData.url) {
      data.append("url", formData.url);
    }

    onSubmit(data);
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content" style={{ borderRadius: "15px" }}>
          <div className="modal-header">
            <h5 className="modal-title">
              {editingItem ? "Edit Media" : "Upload New Media"}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {/* File input */}
              <div className="mb-3">
                <label className="form-label">Upload File</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*,video/*"
                  onChange={(e) =>
                    e.target.files && handleFileUpload(e.target.files[0])
                  }
                />
              </div>

              {/* Preview */}
              {formData.url && (
                <div className="mb-3 text-center">
                  {formData.type === "image" ? (
                    <img
                      src={formData.url}
                      alt="Preview"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "200px",
                        borderRadius: "10px",
                      }}
                    />
                  ) : (
                    <video
                      src={formData.url}
                      controls
                      style={{
                        maxWidth: "100%",
                        maxHeight: "200px",
                        borderRadius: "10px",
                      }}
                    />
                  )}
                </div>
              )}

              {/* Title */}
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  required
                />
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                ></textarea>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {editingItem ? "Update" : "Upload"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MediaUploadModal;
