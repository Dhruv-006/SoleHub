import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCart } from '../utils/useCart';

const SIZES = ['6', '7', '8', '9', '10', '11'];

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    
    setAdding(true);
    // Simulate slight delay for better UX
    setTimeout(() => {
      addToCart(product, selectedSize, quantity);
      setAdding(false);
      setToastMessage('Added to cart');
      setTimeout(() => setToastMessage(''), 3000);
    }, 300);
  };

  if (loading) return <div className="container" style={{ padding: '80px 32px' }}>Loading...</div>;
  if (error) return <div className="container" style={{ padding: '80px 32px' }}>We couldn't load this shoe. {error} <br/><button onClick={() => window.location.reload()} className="btn-primary" style={{marginTop:'16px'}}>Retry</button></div>;
  if (!product) return null;

  return (
    <div className="container animate-fade" style={{ padding: '60px 32px' }}>
      {toastMessage && (
        <div style={{ position: 'fixed', bottom: '32px', right: '32px', backgroundColor: 'var(--primary-black)', color: 'var(--white)', padding: '16px 24px', borderRadius: 'var(--radius-card)', zIndex: 100, boxShadow: 'var(--shadow-hover)' }} className="animate-fade">
          {toastMessage}
        </div>
      )}

      <div className="product-details-grid">
        <div style={{ backgroundColor: 'var(--secondary-bg)', borderRadius: 'var(--radius-card)', overflow: 'hidden', padding: '20px' }}>
          <img src={product.imageUrl} alt={product.name} style={{ width: '100%', display: 'block' }} />
        </div>
        
        <div>
          <p style={{ color: 'var(--muted-text)', fontWeight: 600, marginBottom: '8px' }}>{product.brand}</p>
          <h1 style={{ fontSize: '2.5rem', lineHeight: 1.2, marginBottom: '16px' }}>{product.name}</h1>
          <p style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '24px' }}>₹{product.price.toLocaleString('en-IN')}</p>
          
          <p style={{ color: 'var(--muted-text)', marginBottom: '32px', lineHeight: 1.6 }}>{product.description}</p>
          
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontWeight: 600 }}>Select Size (UK)</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {SIZES.map(size => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{ 
                    width: '48px', height: '48px', 
                    borderRadius: 'var(--radius-btn)', 
                    border: `1px solid ${selectedSize === size ? 'var(--primary-black)' : 'var(--border)'}`,
                    backgroundColor: selectedSize === size ? 'var(--primary-black)' : 'var(--white)',
                    color: selectedSize === size ? 'var(--white)' : 'var(--primary-black)',
                    fontWeight: 600
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          <div style={{ marginBottom: '32px' }}>
            <span style={{ fontWeight: 600, display: 'block', marginBottom: '12px' }}>Quantity</span>
            <div style={{ display: 'inline-flex', border: '1px solid var(--border)', borderRadius: 'var(--radius-btn)', overflow: 'hidden' }}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ padding: '12px 16px', backgroundColor: 'var(--white)' }}>-</button>
              <div style={{ padding: '12px 24px', backgroundColor: 'var(--white)', fontWeight: 600, borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>{quantity}</div>
              <button onClick={() => setQuantity(quantity + 1)} style={{ padding: '12px 16px', backgroundColor: 'var(--white)' }}>+</button>
            </div>
          </div>
          
          <button 
            className="btn-accent" 
            style={{ width: '100%', padding: '16px', fontSize: '1.1rem' }}
            disabled={!selectedSize || product.stock === 0 || adding}
            onClick={handleAddToCart}
          >
            {product.stock === 0 ? 'Out of Stock' : adding ? 'Adding...' : 'Add to Cart'}
          </button>
          
          {!selectedSize && product.stock > 0 && (
            <p style={{ color: 'var(--error)', fontSize: '0.85rem', marginTop: '12px' }}>Please select a size.</p>
          )}
        </div>
      </div>

      <style>{`
        .product-details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
        }
        @media (max-width: 900px) {
          .product-details-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>
    </div>
  );
}
