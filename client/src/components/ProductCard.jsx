import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <Link to={`/products/${product.id}`} style={{ display: 'block', backgroundColor: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', overflow: 'hidden', transition: 'all 200ms ease' }} className="product-card">
      <div style={{ position: 'relative', width: '100%', paddingTop: '100%', backgroundColor: 'var(--secondary-bg)', overflow: 'hidden' }}>
        <img 
          src={product.imageUrl} 
          alt={product.name}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 300ms ease' }}
          className="product-img"
        />
      </div>
      <div style={{ padding: '16px' }}>
        <p style={{ color: 'var(--muted-text)', fontSize: '0.85rem', marginBottom: '4px' }}>{product.brand}</p>
        <h3 style={{ fontSize: '1rem', marginBottom: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 600 }}>₹{product.price.toLocaleString('en-IN')}</span>
          {product.stock > 0 ? (
            <span style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 600 }}>In Stock</span>
          ) : (
            <span style={{ fontSize: '0.75rem', color: 'var(--error)', fontWeight: 600 }}>Out of Stock</span>
          )}
        </div>
      </div>
      <style>{`
        .product-card:hover {
          box-shadow: var(--shadow-subtle);
          border-color: #ccc;
        }
        .product-card:hover .product-img {
          transform: scale(1.03);
        }
      `}</style>
    </Link>
  );
}
