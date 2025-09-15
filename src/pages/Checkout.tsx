import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, ArrowLeft, Check } from 'lucide-react';
import { Layout } from '../components/common/Layout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const Checkout: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    billingAddress: '',
    city: '',
    zipCode: '',
    country: ''
  });

  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const tax = total * 0.1;
  const finalTotal = total + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLoading(false);
    setSuccess(true);
    
    // Clear cart after successful payment
    setTimeout(() => {
      clearCart();
      navigate('/user-dashboard');
    }, 3000);
  };

  if (success) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your purchase. You will receive a confirmation email shortly.
          </p>
          <p className="text-sm text-gray-500">
            Redirecting to your dashboard...
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Button
            variant="ghost"
            icon={ArrowLeft}
            onClick={() => navigate('/cart')}
          >
            Back to Cart
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Secure Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div>
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Lock className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">Secure 256-bit SSL encryption</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <Input
                      label="Card Number"
                      type="text"
                      icon={CreditCard}
                      placeholder="1234 5678 9012 3456"
                      value={paymentData.cardNumber}
                      onChange={(e) => setPaymentData(prev => ({ ...prev, cardNumber: e.target.value }))}
                      required
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Expiry Date"
                        type="text"
                        placeholder="MM/YY"
                        value={paymentData.expiryDate}
                        onChange={(e) => setPaymentData(prev => ({ ...prev, expiryDate: e.target.value }))}
                        required
                      />
                      <Input
                        label="CVV"
                        type="text"
                        placeholder="123"
                        value={paymentData.cvv}
                        onChange={(e) => setPaymentData(prev => ({ ...prev, cvv: e.target.value }))}
                        required
                      />
                    </div>
                    
                    <Input
                      label="Name on Card"
                      type="text"
                      placeholder="John Doe"
                      value={paymentData.nameOnCard}
                      onChange={(e) => setPaymentData(prev => ({ ...prev, nameOnCard: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Address</h3>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <Input
                      label="Address"
                      type="text"
                      placeholder="123 Main St"
                      value={paymentData.billingAddress}
                      onChange={(e) => setPaymentData(prev => ({ ...prev, billingAddress: e.target.value }))}
                      required
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="City"
                        type="text"
                        placeholder="New York"
                        value={paymentData.city}
                        onChange={(e) => setPaymentData(prev => ({ ...prev, city: e.target.value }))}
                        required
                      />
                      <Input
                        label="ZIP Code"
                        type="text"
                        placeholder="10001"
                        value={paymentData.zipCode}
                        onChange={(e) => setPaymentData(prev => ({ ...prev, zipCode: e.target.value }))}
                        required
                      />
                    </div>
                    
                    <Input
                      label="Country"
                      type="text"
                      placeholder="United States"
                      value={paymentData.country}
                      onChange={(e) => setPaymentData(prev => ({ ...prev, country: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  loading={loading}
                >
                  Complete Payment (${finalTotal.toFixed(2)})
                </Button>
              </form>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={`${item.type}-${item.item.id}`} className="flex items-center space-x-3">
                    <img
                      src={item.item.thumbnail}
                      alt={item.item.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.item.title}</h4>
                      <p className="text-xs text-gray-600">{item.item.artist}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">${(item.item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t pt-2">
                  <span>Total</span>
                  <span className="text-purple-600">${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};