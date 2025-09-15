import { User, Song, Album, Order } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    role: 'artist',
    createdAt: '2024-01-10T10:00:00Z'
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    createdAt: '2024-01-01T10:00:00Z'
  }
];

export const mockSongs: Song[] = [
  {
    id: '1',
    title: 'Midnight Dreams',
    artist: 'Sarah Wilson',
    artistId: '2',
    album: 'Dreams Collection',
    genre: 'Pop',
    price: 1.99,
    duration: '3:45',
    thumbnail: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300',
    uploadedAt: '2024-01-20T10:00:00Z',
    approved: true,
    plays: 1250
  },
  {
    id: '2',
    title: 'Electric Pulse',
    artist: 'DJ Nova',
    artistId: '4',
    genre: 'Electronic',
    price: 2.49,
    duration: '4:20',
    thumbnail: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300',
    uploadedAt: '2024-01-18T10:00:00Z',
    approved: true,
    plays: 2100
  },
  {
    id: '3',
    title: 'Acoustic Soul',
    artist: 'James River',
    artistId: '5',
    album: 'River Sessions',
    genre: 'Folk',
    price: 1.49,
    duration: '5:12',
    thumbnail: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=300',
    uploadedAt: '2024-01-15T10:00:00Z',
    approved: true,
    plays: 890
  },
  {
    id: '4',
    title: 'City Lights',
    artist: 'Urban Beat',
    artistId: '6',
    genre: 'Hip Hop',
    price: 1.99,
    duration: '3:30',
    thumbnail: 'https://images.pexels.com/photos/2240772/pexels-photo-2240772.jpeg?auto=compress&cs=tinysrgb&w=300',
    uploadedAt: '2024-01-12T10:00:00Z',
    approved: true,
    plays: 3200
  },
  {
    id: '5',
    title: 'Ocean Waves',
    artist: 'Nature Sounds',
    artistId: '7',
    genre: 'Ambient',
    price: 0.99,
    duration: '8:45',
    thumbnail: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=300',
    uploadedAt: '2024-01-10T10:00:00Z',
    approved: true,
    plays: 1800
  }
];

export const mockAlbums: Album[] = [
  {
    id: '1',
    title: 'Dreams Collection',
    artist: 'Sarah Wilson',
    artistId: '2',
    genre: 'Pop',
    price: 9.99,
    thumbnail: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300',
    songs: ['1'],
    releaseDate: '2024-01-20'
  },
  {
    id: '2',
    title: 'River Sessions',
    artist: 'James River',
    artistId: '5',
    genre: 'Folk',
    price: 12.99,
    thumbnail: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=300',
    songs: ['3'],
    releaseDate: '2024-01-15'
  }
];

export const mockOrders: Order[] = [
  {
    id: '1',
    userId: '1',
    items: [
      {
        id: '1',
        type: 'song',
        item: mockSongs[0],
        quantity: 1
      }
    ],
    total: 1.99,
    status: 'completed',
    createdAt: '2024-01-22T10:00:00Z'
  }
];

export const genres = [
  'Pop', 'Rock', 'Hip Hop', 'Electronic', 'Folk', 'Jazz', 'Classical', 'R&B', 'Country', 'Ambient'
];

export const salesData = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 5000 },
  { month: 'Apr', sales: 4500 },
  { month: 'May', sales: 6000 },
  { month: 'Jun', sales: 5500 }
];