import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '../components/common/Layout';
import { SearchFilters } from '../components/music/SearchFilters';
import { MusicGrid } from '../components/music/MusicGrid';
import { mockSongs, mockAlbums } from '../data/mockData';
import { Song, Album } from '../types';

export const Browse: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [viewType, setViewType] = useState<'songs' | 'albums'>('songs');

  const allItems = useMemo(() => {
    return viewType === 'songs' ? mockSongs : mockAlbums;
  }, [viewType]);

  const filteredAndSortedItems = useMemo(() => {
    let filtered = allItems.filter(item => {
      const matchesSearch = !searchQuery || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.artist.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesGenre = !selectedGenre || item.genre === selectedGenre;
      
      return matchesSearch && matchesGenre;
    });

    // Sort items
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'artist':
          return a.artist.localeCompare(b.artist);
        case 'newest':
          return new Date(b.uploadedAt || b.releaseDate).getTime() - 
                 new Date(a.uploadedAt || a.releaseDate).getTime();
        default: // title
          return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  }, [allItems, searchQuery, selectedGenre, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedGenre('');
    setSortBy('title');
  };

  const handlePreview = (item: Song | Album) => {
    // In a real app, this would play a preview
    console.log('Playing preview for:', item.title);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Music</h1>
          
          {/* View Type Selector */}
          <div className="flex space-x-2 mb-6">
            <button
              onClick={() => setViewType('songs')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewType === 'songs' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Songs ({mockSongs.length})
            </button>
            <button
              onClick={() => setViewType('albums')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewType === 'albums' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Albums ({mockAlbums.length})
            </button>
          </div>

          <SearchFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found {filteredAndSortedItems.length} {viewType} 
            {searchQuery && ` for "${searchQuery}"`}
            {selectedGenre && ` in ${selectedGenre}`}
          </p>
        </div>

        <MusicGrid 
          items={filteredAndSortedItems} 
          type={viewType === 'songs' ? 'song' : 'album'}
          onPreview={handlePreview}
        />
      </div>
    </Layout>
  );
};