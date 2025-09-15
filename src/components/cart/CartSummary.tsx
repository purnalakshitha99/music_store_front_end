import React from 'react';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface CartSummaryProps {
  onCheckout: () => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ onCheckout }) => {
  const { total, itemCount } = useCart();

  const tax = total * 0.1; // 10% tax
  const finalTotal = total + tax;

  return (
    <Card className="p-6 sticky top-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Items ({itemCount})</span>
          <span className="font-medium">${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span className="text-purple-600">${finalTotal.toFixed(2)}</span>
        </div>
      </div>

      <Button
        className="w-full"
        onClick={onCheckout}
        disabled={itemCount === 0}
      >
        Proceed to Checkout
      </Button>

      <p className="text-xs text-gray-500 mt-2 text-center">
        Secure checkout with 256-bit SSL encryption
      </p>
    </Card>
  );
};