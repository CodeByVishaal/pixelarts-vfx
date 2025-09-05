import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

interface MediaItem {
  _id: string;
  id: string;
  type: "image" | "video";
  url: string;
  title: string;
  description?: string;
  uploadDate: string;
  createdAt: string;
  isActive: boolean;
  category: string;
  tags: string[];
  fileSize?: number;
  duration?: number;
  thumbnailUrl?: string;
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
}

interface AdminContextType {
  isAuthenticated: boolean;
  mediaItems: MediaItem[];
  currentAdmin: AdminUser | null;
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  addMediaItem: (formData: FormData | any) => Promise<void>;
  updateMediaItem: (id: string, item: any) => Promise<void>;
  deleteMediaItem: (id: string) => Promise<boolean>;
  loading: boolean;
  error: string | null;
  refreshMediaItems: () => Promise<void>;
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

const API_BASE_URL =
  import.meta.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const AdminProvider = ({ children }: AdminProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    const savedToken = localStorage.getItem("admin_token");
    if (savedToken) {
      setToken(savedToken);
      try {
        // Verify token with backend
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCurrentAdmin(data.data.admin);
          setIsAuthenticated(true);
          await fetchMediaItems(savedToken);
        } else {
          // Token is invalid
          localStorage.removeItem("admin_token");
          setToken(null);
        }
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
      const currentToken = authToken || token;

      const response = await fetch(`${API_BASE_URL}/media`, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        // Transform the media items to include both _id and id
        const transformedMedia = data.data.map((item: any) => ({
          ...item,
          id: item._id, // Keep both _id and id for compatibility
          uploadDate: new Date(item.createdAt).toLocaleDateString(),
          // Ensure Cloudinary URL is secure
          url: item.url?.replace('http://', 'https://'),
          thumbnailUrl: item.thumbnailUrl?.replace('http://', 'https://')
        }));
        setMediaItems(transformedMedia);
      } else {
        setError(data.message || "Failed to fetch media items");
      }
    } catch (error) {
      console.error("Error fetching media:", error);
      setError("Failed to fetch media items");
    } finally {
      setLoading(false);
    }
  };

  const refreshMediaItems = async () => {
    await fetchMediaItems();
  };

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

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
        setError(data.message || "Login failed");
        return false;
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.message || "Network error. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Call backend logout endpoint
      if (token) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
    }
  };

  const addMediaItem = async (mediaData: FormData | any) => {
    try {
      setLoading(true);
      setError(null);

      let body: FormData | string;
      let headers: Record<string, string> = {
        Authorization: `Bearer ${token}`,
      };

      if (mediaData instanceof FormData) {
        // File upload
        body = mediaData;
        // Don't set Content-Type for FormData - let browser set it with boundary
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
        throw new Error(data.message);
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

  const updateMediaItem = async (id: string, updatedItem: FormData | any) => {
    try {
      setLoading(true);
      setError(null);

      let headers: Record<string, string> = {
        Authorization: `Bearer ${token}`,
      };

      // If it's not FormData, set Content-Type
      if (!(updatedItem instanceof FormData)) {
        headers["Content-Type"] = "application/json";
        updatedItem = JSON.stringify(updatedItem);
      }

      const response = await fetch(`${API_BASE_URL}/media/${id}`, {
        method: "PUT",
        headers,
        body: updatedItem,
      });

      const data = await response.json();

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
        throw new Error(data.message);
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

    const response = await fetch(`${API_BASE_URL}/media/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (data.success) {
      // Update local state by removing the deleted item
      setMediaItems(prev => prev.filter(item => item._id !== id));
      return true;
    } else {
      throw new Error(data.message || "Failed to delete media");
    }
  } catch (error: any) {
    console.error("Error deleting media:", error);
    const errorMessage = error.message || "Failed to delete media item";
    setError(errorMessage);
    throw error;
  } finally {
    setLoading(false);
  }
};  

  const value: AdminContextType = {
    isAuthenticated,
    mediaItems,
    currentAdmin,
    token,
    login,
    logout,
    addMediaItem,
    updateMediaItem,
    deleteMediaItem,
    loading,
    error,
    refreshMediaItems,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
