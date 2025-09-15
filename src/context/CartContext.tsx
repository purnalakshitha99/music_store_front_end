import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, CartState, Song, Album } from '../types';

interface CartContextType extends CartState {
  addToCart: (item: Song | Album, type: 'song' | 'album') => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartState, setCartState] = useState<CartState>({
    items: [],
    total: 0,
    itemCount: 0
  });

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCartState(parsedCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartState));
  }, [cartState]);

  const calculateTotal = (items: CartItem[]) => {
    return items.reduce((total, item) => total + (item.item.price * item.quantity), 0);
  };

  const calculateItemCount = (items: CartItem[]) => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const addToCart = (item: Song | Album, type: 'song' | 'album') => {
    setCartState(prev => {
      const existingItem = prev.items.find(cartItem => cartItem.item.id === item.id);
      
      let newItems;
      if (existingItem) {
        newItems = prev.items.map(cartItem =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        const newCartItem: CartItem = {
          id: item.id,
          type,
          item,
          quantity: 1
        };
        newItems = [...prev.items, newCartItem];
      }

      return {
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems)
      };
    });
  };

  const removeFromCart = (id: string) => {
    setCartState(prev => {
      const newItems = prev.items.filter(item => item.item.id !== id);
      return {
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems)
      };
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartState(prev => {
      const newItems = prev.items.map(item =>
        item.item.id === id ? { ...item, quantity } : item
      );
      return {
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems)
      };
    });
  };

  const clearCart = () => {
    setCartState({
      items: [],
      total: 0,
      itemCount: 0
    });
  };

  return (
    <CartContext.Provider value={{
      ...cartState,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};