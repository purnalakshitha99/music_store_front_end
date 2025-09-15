import React, { useState } from 'react';
import { Upload, Music, TrendingUp, Settings, Plus, Edit, Trash2 } from 'lucide-react';
import { Layout } from '../components/common/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { useAuth } from '../context/AuthContext';
import { mockSongs, genres } from '../data/mockData';

export const ArtistDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadData, setUploadData] = useState({
    title: '',
    album: '',
    genre: '',
    price: '',
    description: ''
  });

  const artistSongs = mockSongs.filter(song => song.artistId === user?.id);
  const totalPlays = artistSongs.reduce((sum, song) => sum + (song.plays || 0), 0);
  const totalEarnings = artistSongs.reduce((sum, song) => sum + (song.price * (song.plays || 0) * 0.1), 0);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would upload to the backend
    console.log('Uploading song:', uploadData);
    setShowUploadModal(false);
    setUploadData({
      title: '',
      album: '',
      genre: '',
      price: '',
      description: ''
    });
    alert('Song uploaded successfully! It will be reviewed by our team.');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'catalog', label: 'My Music', icon: Music },
    { id: 'upload', label: 'Upload New', icon: Upload },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Artist Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Music className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium">{user?.name}</h3>
                  <p className="text-sm text-gray-600">Artist</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-purple-50 text-purple-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="p-6">
                    <div className="flex items-center">
                      <Music className="w-8 h-8 text-blue-600" />
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold">{artistSongs.length}</h3>
                        <p className="text-gray-600">Total Songs</p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="flex items-center">
                      <TrendingUp className="w-8 h-8 text-green-600" />
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold">{totalPlays.toLocaleString()}</h3>
                        <p className="text-gray-600">Total Plays</p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-bold">$</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold">${totalEarnings.toFixed(2)}</h3>
                        <p className="text-gray-600">Total Earnings</p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {artistSongs.slice(0, 5).map(song => (
                      <div key={song.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img
                            src={song.thumbnail}
                            alt={song.title}
                            className="w-10 h-10 rounded object-cover"
                          />
                          <div>
                            <p className="font-medium">{song.title}</p>
                            <p className="text-sm text-gray-600">{song.plays} plays</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          song.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {song.approved ? 'Approved' : 'Pending'}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'catalog' && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">My Music Catalog</h2>
                  <Button icon={Plus} onClick={() => setShowUploadModal(true)}>
                    Upload New Song
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {artistSongs.map(song => (
                    <div key={song.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img
                          src={song.thumbnail}
                          alt={song.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-medium">{song.title}</h3>
                          <p className="text-sm text-gray-600">{song.genre} • ${song.price}</p>
                          <p className="text-sm text-gray-500">{song.plays} plays • {song.duration}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          song.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {song.approved ? 'Approved' : 'Pending Review'}
                        </span>
                        <Button size="sm" variant="outline" icon={Edit}>
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" icon={Trash2} className="text-red-600">
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'upload' && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Upload New Song</h2>
                
                <form onSubmit={handleUpload} className="space-y-6">
                  <Input
                    label="Song Title"
                    type="text"
                    value={uploadData.title}
                    onChange={(e) => setUploadData(prev => ({ ...prev, title: e.target.value }))}
                    required
                    placeholder="Enter song title"
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Album (Optional)"
                      type="text"
                      value={uploadData.album}
                      onChange={(e) => setUploadData(prev => ({ ...prev, album: e.target.value }))}
                      placeholder="Album name"
                    />
                    
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">Genre</label>
                      <select
                        value={uploadData.genre}
                        onChange={(e) => setUploadData(prev => ({ ...prev, genre: e.target.value }))}
                        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition-colors"
                        required
                      >
                        <option value="">Select Genre</option>
                        {genres.map(genre => (
                          <option key={genre} value={genre}>{genre}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <Input
                    label="Price (USD)"
                    type="number"
                    step="0.01"
                    min="0.99"
                    value={uploadData.price}
                    onChange={(e) => setUploadData(prev => ({ ...prev, price: e.target.value }))}
                    required
                    placeholder="1.99"
                  />
                  
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">Audio File</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Drag and drop your audio file here, or click to browse</p>
                      <p className="text-sm text-gray-400 mt-1">Supported formats: MP3, WAV, FLAC (max 50MB)</p>
                      <input type="file" accept="audio/*" className="hidden" />
                      <Button variant="outline" className="mt-4">Choose File</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">Cover Art</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <Music className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-600">Upload cover art for your song</p>
                      <p className="text-sm text-gray-400 mt-1">Recommended: 1000x1000px, JPG or PNG</p>
                      <input type="file" accept="image/*" className="hidden" />
                      <Button variant="outline" className="mt-4">Choose Image</Button>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button type="submit" className="flex-1">
                      Upload Song
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setUploadData({
                      title: '',
                      album: '',
                      genre: '',
                      price: '',
                      description: ''
                    })}>
                      Clear
                    </Button>
                  </div>
                </form>
              </Card>
            )}
          </div>
        </div>

        {/* Upload Modal */}
        <Modal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          title="Quick Upload"
        >
          <form onSubmit={handleUpload} className="space-y-4">
            <Input
              label="Song Title"
              type="text"
              value={uploadData.title}
              onChange={(e) => setUploadData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
            <Input
              label="Price (USD)"
              type="number"
              step="0.01"
              min="0.99"
              value={uploadData.price}
              onChange={(e) => setUploadData(prev => ({ ...prev, price: e.target.value }))}
              required
            />
            <div className="flex space-x-4">
              <Button type="submit" className="flex-1">Upload</Button>
              <Button type="button" variant="outline" onClick={() => setShowUploadModal(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </Layout>
  );
};