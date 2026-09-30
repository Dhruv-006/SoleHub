import { Link } from 'react-router-dom';
import { useCart } from '../utils/useCart';
import { Trash2 } from 'lucide-react';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container animate-fade" style={{ padding: '120px 32px', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '16px' }}>Your cart is empty.</h1>
        <p style={{ color: 'var(--muted-text)', marginBottom: '32px' }}>Looks like you haven't added anything yet.</p>
        <Link to="/products" className="btn-primary">Browse Shoes</Link>
      </div>
    );
  }

  return (
    <div className="container animate-fade" style={{ padding: '60px 32px' }}>
      <h1 style={{ marginBottom: '40px' }}>Your Cart</h1>
      
      <div className="cart-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {cart.map(item => (
            <div key={`${item.productId}-${item.size}`} style={{ display: 'flex', gap: '24px', backgroundColor: 'var(--white)', padding: '24px', borderRadius: 'var(--radius-card)', border: '1px solid var(--border)' }}>
              <div style={{ width: '120px', height: '120px', backgroundColor: 'var(--secondary-bg)', borderRadius: 'var(--radius-img)', overflow: 'hidden', flexShrink: 0 }}>
                <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{item.name}</h3>
                    <p style={{ color: 'var(--muted-text)', fontSize: '0.9rem' }}>Size: {item.size}</p>
                  </div>
                  <span style={{ fontWeight: 600 }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: 'var(--radius-btn)', overflow: 'hidden' }}>
                    <button onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)} style={{ padding: '8px 12px', backgroundColor: 'var(--white)' }}>-</button>
                    <div style={{ padding: '8px 16px', backgroundColor: 'var(--white)', fontWeight: 600, borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>{item.quantity}</div>
                    <button onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)} style={{ padding: '8px 12px', backgroundColor: 'var(--white)' }}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.productId, item.size)} style={{ color: 'var(--error)' }} title="Remove item">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div>
          <div style={{ backgroundColor: 'var(--white)', padding: '32px', borderRadius: 'var(--radius-card)', border: '1px solid var(--border)', position: 'sticky', top: '100px' }}>
            <h2 style={{ marginBottom: '24px' }}>Order Summary</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: 'var(--muted-text)' }}>
              <span>Subtotal</span>
              <span>₹{getCartTotal().toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', color: 'var(--muted-text)' }}>
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
              <span style={{ fontWeight: 600, fontSize: '1.2rem' }}>Total</span>
              <span style={{ fontWeight: 600, fontSize: '1.2rem' }}>₹{getCartTotal().toLocaleString('en-IN')}</span>
            </div>
            <Link to="/checkout" className="btn-primary" style={{ width: '100%' }}>
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .cart-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 40px;
        }
        @media (max-width: 900px) {
          .cart-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
