import React from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200">
      <img
        src={item.item.thumbnail}
        alt={item.item.title}
        className="w-16 h-16 rounded-lg object-cover"
      />
      
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{item.item.title}</h3>
        <p className="text-sm text-gray-600">{item.item.artist}</p>
        <p className="text-sm text-purple-600 font-medium">${item.item.price}</p>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => updateQuantity(item.item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          <Minus className="w-4 h-4" />
        </Button>
        <span className="w-8 text-center font-medium">{item.quantity}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => updateQuantity(item.item.id, item.quantity + 1)}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="text-right">
        <p className="font-medium text-gray-900">
          ${(item.item.price * item.quantity).toFixed(2)}
        </p>
        <Button
          variant="ghost"
          size="sm"
          icon={X}
          onClick={() => removeFromCart(item.item.id)}
          className="text-red-600 hover:text-red-700"
        >
          Remove
        </Button>
      </div>
    </div>
  );
};