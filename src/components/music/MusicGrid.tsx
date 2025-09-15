import React from 'react';
import { Song, Album } from '../../types';
import { MusicCard } from './MusicCard';

interface MusicGridProps {
  items: (Song | Album)[];
  type: 'song' | 'album';
  onPreview?: (item: Song | Album) => void;
}

export const MusicGrid: React.FC<MusicGridProps> = ({ items, type, onPreview }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No music found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <MusicCard
          key={item.id}
          item={item}
          type={type}
          onPreview={() => onPreview?.(item)}
        />
      ))}
    </div>
  );
};