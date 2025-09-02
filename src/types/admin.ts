// src/types/admin.ts

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  title: string;
  description?: string;
  uploadDate: string;
  thumbnailUrl?: string;
  fileSize?: string;
  duration?: string; // For videos
  dimensions?: string; // For images
}

export interface AdminUser {
  id: string;
  username: string;
  email?: string;
  role: 'admin' | 'editor';
  lastLogin?: string;
}

export interface UploadResponse {
  success: boolean;
  message: string;
  data?: MediaItem;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AdminStats {
  totalMedia: number;
  totalImages: number;
  totalVideos: number;
  recentUploads: number;
}

export interface MediaFilter {
  type: 'all' | 'image' | 'video';
  sortBy: 'newest' | 'oldest' | 'title';
  searchTerm: string;
}