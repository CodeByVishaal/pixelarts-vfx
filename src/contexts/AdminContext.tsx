import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

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
}

interface AdminContextType {
  isAuthenticated: boolean;
  mediaItems: MediaItem[];
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  addMediaItem: (item: FormData) => Promise<void>;
  updateMediaItem: (id: string, item: Partial<MediaItem>) => Promise<void>;
  deleteMediaItem: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
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

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:5000/api';

export const AdminProvider = ({ children }: AdminProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state and fetch data
  useEffect(() => {
    const savedToken = localStorage.getItem("admin_token");
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
      // Verify token and fetch media
      fetchMediaItems(savedToken);
    }
  }, []);

  // API helper function
  const apiCall = async (endpoint: string, options: RequestInit = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  };

  // Fetch media items
  const fetchMediaItems = async (authToken?: string) => {
    try {
      setLoading(true);
      const currentToken = authToken || token;
      
      const response = await fetch(`${API_BASE_URL}/media`, {
        headers: {
          ...(currentToken && { Authorization: `Bearer ${currentToken}` }),
        },
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Transform backend data to match frontend interface
        const transformedItems = data.data.media.map((item: any) => ({
          ...item,
          id: item._id,
          uploadDate: item.createdAt.split('T')[0], // Format date
        }));
        setMediaItems(transformedItems);
      }
    } catch (error) {
      console.error('Error fetching media:', error);
      setError('Failed to fetch media items');
    } finally {
      setLoading(false);
    }
  };

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        const { token: authToken } = data.data;
        setToken(authToken);
        setIsAuthenticated(true);
        localStorage.setItem("admin_token", authToken);
        
        // Fetch media items after successful login
        await fetchMediaItems(authToken);
        return true;
      } else {
        setError(data.message || 'Login failed');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setMediaItems([]);
    localStorage.removeItem("admin_token");
    
    // Optional: Call backend logout endpoint
    if (token) {
      fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).catch(console.error);
    }
  };

  const addMediaItem = async (formData: FormData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/media`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData, // Send FormData directly for file uploads
      });

      const data = await response.json();

      if (data.success) {
        const newItem = {
          ...data.data.media,
          id: data.data.media._id,
          uploadDate: data.data.media.createdAt.split('T')[0],
        };
        setMediaItems(prev => [newItem, ...prev]);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error adding media:', error);
      setError('Failed to add media item');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateMediaItem = async (id: string, updatedItem: Partial<MediaItem>) => {
    try {
      setLoading(true);
      setError(null);

      const data = await apiCall(`/media/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedItem),
      });

      if (data.success) {
        const updated = {
          ...data.data.media,
          id: data.data.media._id,
          uploadDate: data.data.media.createdAt.split('T')[0],
        };
        setMediaItems(prev =>
          prev.map(item => (item.id === id ? updated : item))
        );
      }
    } catch (error) {
      console.error('Error updating media:', error);
      setError('Failed to update media item');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteMediaItem = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      await apiCall(`/media/${id}`, {
        method: 'DELETE',
      });

      setMediaItems(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting media:', error);
      setError('Failed to delete media item');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value: AdminContextType = {
    isAuthenticated,
    mediaItems,
    token,
    login,
    logout,
    addMediaItem,
    updateMediaItem,
    deleteMediaItem,
    loading,
    error,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};