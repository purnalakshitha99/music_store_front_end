import React from 'react';
import { Play, ShoppingCart, Heart } from 'lucide-react';
import { Song, Album } from '../../types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useCart } from '../../context/CartContext';

interface MusicCardProps {
  item: Song | Album;
  type: 'song' | 'album';
  onPreview?: () => void;
}

export const MusicCard: React.FC<MusicCardProps> = ({ item, type, onPreview }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(item, type);
  };

  const formatDuration = (duration: string) => {
    return duration || '0:00';
  };

  return (
    <Card hover className="group overflow-hidden">
      <div className="relative">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
          <Button
            variant="primary"
            icon={Play}
            className="opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300"
            onClick={onPreview}
          >
            Preview
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{item.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{item.artist}</p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-purple-600">${item.price}</span>
          {'duration' in item && (
            <span className="text-sm text-gray-500">{formatDuration(item.duration)}</span>
          )}
        </div>

        {item.genre && (
          <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full mb-3">
            {item.genre}
          </span>
        )}

        <div className="flex space-x-2">
          <Button
            variant="primary"
            icon={ShoppingCart}
            className="flex-1"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
          <Button variant="outline" className="p-2">
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};