export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'artist' | 'admin';
  avatar?: string;
  blocked?: boolean;
  createdAt: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  album?: string;
  genre: string;
  price: number;
  duration: string;
  thumbnail: string;
  audioFile?: string;
  uploadedAt: string;
  approved?: boolean;
  plays?: number;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  genre: string;
  price: number;
  thumbnail: string;
  songs: string[];
  releaseDate: string;
}

export interface CartItem {
  id: string;
  type: 'song' | 'album';
  item: Song | Album;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}