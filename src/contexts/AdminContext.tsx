import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

interface MediaItem {
  id: string;
  type: "image" | "video";
  url: string;
  title: string;
  description?: string;
  uploadDate: string;
<<<<<<< Updated upstream
=======
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  category: string;
  tags: string[];
  fileSize?: number;
  duration?: number;
  thumbnailUrl?: string;
  uploadedBy?: {
    _id: string;
    username: string;
  };
  views?: number;
  clicks?: number;
}

interface AdminUser {
  _id: string;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLogin?: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    admin: AdminUser;
    token: string;
  };
>>>>>>> Stashed changes
}

interface AdminContextType {
  isAuthenticated: boolean;
  mediaItems: MediaItem[];
<<<<<<< Updated upstream
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  addMediaItem: (item: Omit<MediaItem, "id" | "uploadDate">) => void;
  updateMediaItem: (id: string, item: Partial<MediaItem>) => void;
  deleteMediaItem: (id: string) => void;
  loading: boolean;
=======
  currentAdmin: AdminUser | null;
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  addMediaItem: (formData: FormData | any) => Promise<void>;
  updateMediaItem: (id: string, item: any) => Promise<void>;
  deleteMediaItem: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  refreshMediaItems: () => Promise<void>;
>>>>>>> Stashed changes
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

<<<<<<< Updated upstream
export const AdminProvider = ({ children }: AdminProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
=======
const API_BASE_URL =
  import.meta.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const AdminProvider = ({ children }: AdminProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
>>>>>>> Stashed changes
  const [loading, setLoading] = useState(false);

<<<<<<< Updated upstream
  // Check if user is already authenticated on app load
  useEffect(() => {
    const authStatus = localStorage.getItem("admin_authenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }

    // Load media items from localStorage
    const savedMediaItems = localStorage.getItem("mediaItems");
    if (savedMediaItems) {
      setMediaItems(JSON.parse(savedMediaItems));
    } else {
      // Initialize with some sample data
      const sampleData: MediaItem[] = [
        {
          id: "1",
          type: "video",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
          title: "VFX Demo Reel 2024",
          description: "Our latest visual effects showcase",
          uploadDate: "2024-01-15",
        },
        {
          id: "2",
          type: "image",
          url: "https://via.placeholder.com/800x600/0066cc/ffffff?text=VFX+Project+1",
          title: "Character Animation",
          description: "3D character animation project",
          uploadDate: "2024-01-10",
        },
      ];
      setMediaItems(sampleData);
      localStorage.setItem("mediaItems", JSON.stringify(sampleData));
    }
  }, []);

  // Save media items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("mediaItems", JSON.stringify(mediaItems));
  }, [mediaItems]);
=======
  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  // Helper function to make authenticated API calls
  const makeApiCall = async (url: string, options: RequestInit = {}) => {
    const defaultHeaders: Record<string, string> = {
      ...((options.headers as Record<string, string>) || {}),
    };

    // Add auth header if token exists and not already present
    if (token && !defaultHeaders.Authorization) {
      defaultHeaders.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: defaultHeaders,
    });

    // Handle unauthorized responses
    if (response.status === 401) {
      localStorage.removeItem("admin_token");
      setToken(null);
      setIsAuthenticated(false);
      setCurrentAdmin(null);
      throw new Error("Session expired. Please login again.");
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`
      );
    }

    return response.json();
  };

  const initializeAuth = async () => {
    const savedToken = localStorage.getItem("admin_token");
    if (savedToken) {
      setToken(savedToken);
      try {
        // Verify token with backend
        const data = await makeApiCall("/auth/me");
        setCurrentAdmin(data.data.admin);
        setIsAuthenticated(true);
        await fetchMediaItems(savedToken);
      } catch (error) {
        console.error("Token verification failed:", error);
        localStorage.removeItem("admin_token");
        setToken(null);
      }
    }
  };

  // Fetch media items from backend
  const fetchMediaItems = async (authToken?: string) => {
    try {
      setLoading(true);
      setError(null);

      const currentToken = authToken || token;
      const headers: Record<string, string> = {};

      if (currentToken) {
        headers.Authorization = `Bearer ${currentToken}`;
      }

      const response = await fetch(`${API_BASE_URL}/media`, {
        headers,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch media: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success) {
        // Transform backend data to match frontend interface
        const transformedItems = data.data.media.map((item: any) => ({
          ...item,
          id: item._id, // Ensure we have both _id and id
          uploadDate: new Date(item.createdAt).toLocaleDateString(),
        }));
        setMediaItems(transformedItems);
      } else {
        throw new Error(data.message || "Failed to fetch media");
      }
    } catch (error) {
      console.error("Error fetching media:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch media items";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
>>>>>>> Stashed changes

  const refreshMediaItems = async () => {
    await fetchMediaItems();
  };

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    setLoading(true);

<<<<<<< Updated upstream
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simple authentication (in real app, this would be server-side)
    if (username === "admin" && password === "admin123") {
      setIsAuthenticated(true);
      localStorage.setItem("admin_authenticated", "true");
=======
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Login failed: ${response.statusText}`
        );
      }

      const data: LoginResponse = await response.json();

      if (data.success) {
        const { admin, token: authToken } = data.data;
        setCurrentAdmin(admin);
        setToken(authToken);
        setIsAuthenticated(true);
        localStorage.setItem("admin_token", authToken);

        // Fetch media items after successful login
        await fetchMediaItems(authToken);
        return true;
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage = error.message || "Network error. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
>>>>>>> Stashed changes
      setLoading(false);
      return true;
    }

    setLoading(false);
    return false;
  };

<<<<<<< Updated upstream
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_authenticated");
  };

  const addMediaItem = (item: Omit<MediaItem, "id" | "uploadDate">) => {
    const newItem: MediaItem = {
      ...item,
      id: Date.now().toString(),
      uploadDate: new Date().toISOString().split("T")[0],
    };

    setMediaItems((prev) => [newItem, ...prev]);
  };

  const updateMediaItem = (id: string, updatedItem: Partial<MediaItem>) => {
    setMediaItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
    );
  };

  const deleteMediaItem = (id: string) => {
    setMediaItems((prev) => prev.filter((item) => item.id !== id));
=======
  const logout = async () => {
    try {
      // Call backend logout endpoint
      if (token) {
        await makeApiCall("/auth/logout", { method: "POST" });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local state regardless of backend call success
      setIsAuthenticated(false);
      setCurrentAdmin(null);
      setToken(null);
      setMediaItems([]);
      setError(null);
      localStorage.removeItem("admin_token");
      toast.info("Logged out successfully");
    }
  };

  const addMediaItem = async (mediaData: FormData | any) => {
    try {
      setLoading(true);
      setError(null);

      if (!token) {
        throw new Error("Not authenticated");
      }

      let body: FormData | string;
      let headers: Record<string, string> = {
        Authorization: `Bearer ${token}`,
      };

      if (mediaData instanceof FormData) {
        // File upload - don't set Content-Type for FormData
        body = mediaData;
      } else {
        // URL-based upload
        headers["Content-Type"] = "application/json";
        body = JSON.stringify(mediaData);
      }

      const response = await fetch(`${API_BASE_URL}/media`, {
        method: "POST",
        headers,
        body,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Upload failed: ${response.statusText}`
        );
      }

      const data = await response.json();

      if (data.success) {
        const newItem = {
          ...data.data.media,
          id: data.data.media._id,
          uploadDate: new Date(data.data.media.createdAt).toLocaleDateString(),
        };
        setMediaItems((prev) => [newItem, ...prev]);
        toast.success("Media uploaded successfully!");
      } else {
        throw new Error(data.message || "Upload failed");
      }
    } catch (error: any) {
      console.error("Error adding media:", error);
      const errorMessage = error.message || "Failed to add media item";
      setError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateMediaItem = async (id: string, updatedItem: any) => {
    try {
      setLoading(true);
      setError(null);

      const data = await makeApiCall(`/media/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      });

      if (data.success) {
        const updated = {
          ...data.data.media,
          id: data.data.media._id,
          uploadDate: new Date(data.data.media.createdAt).toLocaleDateString(),
        };
        setMediaItems((prev) =>
          prev.map((item) => (item.id === id ? updated : item))
        );
        toast.success("Media updated successfully!");
      } else {
        throw new Error(data.message || "Update failed");
      }
    } catch (error: any) {
      console.error("Error updating media:", error);
      const errorMessage = error.message || "Failed to update media item";
      setError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteMediaItem = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const data = await makeApiCall(`/media/${id}`, {
        method: "DELETE",
      });

      if (data.success) {
        setMediaItems((prev) => prev.filter((item) => item.id !== id));
        toast.success("Media deleted successfully!");
      } else {
        throw new Error(data.message || "Delete failed");
      }
    } catch (error: any) {
      console.error("Error deleting media:", error);
      const errorMessage = error.message || "Failed to delete media item";
      setError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
>>>>>>> Stashed changes
  };

  const value: AdminContextType = {
    isAuthenticated,
    mediaItems,
<<<<<<< Updated upstream
=======
    currentAdmin,
    token,
>>>>>>> Stashed changes
    login,
    logout,
    addMediaItem,
    updateMediaItem,
    deleteMediaItem,
    loading,
<<<<<<< Updated upstream
=======
    error,
    refreshMediaItems,
>>>>>>> Stashed changes
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
