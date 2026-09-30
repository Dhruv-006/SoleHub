import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../utils/useCart';
import { createOrder } from '../services/api';

export default function Checkout() {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', city: '', state: '', pincode: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const orderData = {
        customer: formData,
        items: cart.map(item => ({
          productId: item.productId,
          size: item.size,
          quantity: item.quantity
        })),
        paymentMethod: 'Cash on Delivery'
      };

      const order = await createOrder(orderData);
      clearCart();
      navigate(`/order-success?orderId=${order.orderNumber}`);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="container animate-fade" style={{ padding: '60px 32px' }}>
      <h1 style={{ marginBottom: '40px' }}>Checkout</h1>
      
      <div className="checkout-grid">
        <div>
          <form id="checkout-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ backgroundColor: 'var(--white)', padding: '32px', borderRadius: 'var(--radius-card)', border: '1px solid var(--border)' }}>
              <h2 style={{ marginBottom: '24px', fontSize: '1.25rem' }}>Customer Information</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Full Name</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="input-field" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Email</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="input-field" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Phone</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="input-field" />
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--white)', padding: '32px', borderRadius: 'var(--radius-card)', border: '1px solid var(--border)' }}>
              <h2 style={{ marginBottom: '24px', fontSize: '1.25rem' }}>Shipping Address</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Address</label>
                  <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="input-field" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>City</label>
                  <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="input-field" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>State</label>
                  <input required type="text" name="state" value={formData.state} onChange={handleInputChange} className="input-field" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Pincode</label>
                  <input required type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} className="input-field" />
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--white)', padding: '32px', borderRadius: 'var(--radius-card)', border: '1px solid var(--border)' }}>
              <h2 style={{ marginBottom: '24px', fontSize: '1.25rem' }}>Payment Method</h2>
              <div style={{ padding: '16px', border: '1px solid var(--primary-black)', borderRadius: 'var(--radius-input)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input type="radio" checked readOnly style={{ accentColor: 'var(--primary-black)', width: '18px', height: '18px' }} />
                <span style={{ fontWeight: 600 }}>Cash on Delivery</span>
              </div>
            </div>
          </form>
        </div>
        
        <div>
          <div style={{ backgroundColor: 'var(--white)', padding: '32px', borderRadius: 'var(--radius-card)', border: '1px solid var(--border)', position: 'sticky', top: '100px' }}>
            <h2 style={{ marginBottom: '24px' }}>Order Summary</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              {cart.map(item => (
                <div key={`${item.productId}-${item.size}`} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: 'var(--muted-text)' }}>{item.quantity}x</span>
                    <span>{item.name} (UK {item.size})</span>
                  </div>
                  <span style={{ fontWeight: 600 }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
              <span style={{ fontWeight: 600, fontSize: '1.2rem' }}>Total</span>
              <span style={{ fontWeight: 600, fontSize: '1.2rem' }}>₹{getCartTotal().toLocaleString('en-IN')}</span>
            </div>

            {error && <div style={{ color: 'var(--error)', marginBottom: '16px', fontSize: '0.9rem', padding: '12px', backgroundColor: '#fde8e8', borderRadius: 'var(--radius-input)' }}>{error}</div>}

            <button type="submit" form="checkout-form" className="btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .checkout-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 40px;
        }
        @media (max-width: 900px) {
          .checkout-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
