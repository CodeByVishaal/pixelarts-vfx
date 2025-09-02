import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface MediaItem {
  id: string;
  type: "image" | "video";
  url: string;
  title: string;
  description?: string;
  uploadDate: string;
}

interface AdminContextType {
  isAuthenticated: boolean;
  mediaItems: MediaItem[];
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  addMediaItem: (item: Omit<MediaItem, "id" | "uploadDate">) => void;
  updateMediaItem: (id: string, item: Partial<MediaItem>) => void;
  deleteMediaItem: (id: string) => void;
  loading: boolean;
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

export const AdminProvider = ({ children }: AdminProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);

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

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simple authentication (in real app, this would be server-side)
    if (username === "admin" && password === "admin123") {
      setIsAuthenticated(true);
      localStorage.setItem("admin_authenticated", "true");
      setLoading(false);
      return true;
    }

    setLoading(false);
    return false;
  };

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
  };

  const value: AdminContextType = {
    isAuthenticated,
    mediaItems,
    login,
    logout,
    addMediaItem,
    updateMediaItem,
    deleteMediaItem,
    loading,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
