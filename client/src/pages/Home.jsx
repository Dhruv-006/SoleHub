import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const products = await getProducts();
        setFeatured(products.slice(0, 4));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const categories = [
    { name: 'Sneakers', image: '/assets/products/nike-air-max-sc.jpg' },
    { name: 'Running', image: '/assets/products/adidas-runfalcon-5.jpg' },
    { name: 'Casual', image: '/assets/products/puma-smash-v2.jpg' },
  ];

  return (
    <div className="animate-fade">
      {/* Hero Section */}
      <section style={{ backgroundColor: 'var(--secondary-bg)', padding: '80px 0', overflow: 'hidden' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px' }}>
            <h1 style={{ fontSize: '3.5rem', lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-1px' }}>
              STEP INTO<br />YOUR STYLE.
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--muted-text)', marginBottom: '32px', maxWidth: '400px' }}>
              Discover everyday sneakers and footwear designed for movement, comfort and style.
            </p>
            <Link to="/products" className="btn-primary">
              Shop Shoes
            </Link>
          </div>
          <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
            <img 
              src="/assets/products/nike-air-max-sc.jpg" 
              alt="Hero Shoe" 
              style={{ width: '100%', maxWidth: '500px', transform: 'rotate(-15deg)', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.15))' }} 
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container" style={{ padding: '80px 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <h2>Featured Shoes</h2>
          <Link to="/products" style={{ fontWeight: 600, borderBottom: '1px solid var(--primary-black)' }}>View All</Link>
        </div>
        
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <div>
            <p>We couldn't load the shoes.</p>
            <p style={{ color: 'var(--error)', fontSize: '0.9rem', marginTop: '8px' }}>{error}</p>
          </div>
        ) : (
          <div className="product-grid">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Categories */}
      <section style={{ backgroundColor: 'var(--white)', padding: '80px 0' }}>
        <div className="container">
          <h2 style={{ marginBottom: '40px' }}>Shop by Category</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {categories.map((cat, idx) => (
              <Link to={`/products?category=${cat.name}`} key={idx} style={{ display: 'block', position: 'relative', borderRadius: 'var(--radius-card)', overflow: 'hidden', height: '240px', backgroundColor: 'var(--secondary-bg)' }} className="category-card">
                <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '24px', background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}>
                  <h3 style={{ color: 'var(--white)' }}>{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <style>{`
        .product-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        @media (max-width: 1024px) {
          .product-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 640px) {
          .product-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
        }
        .category-card:hover img {
          transform: scale(1.05);
          transition: transform 300ms ease;
        }
      `}</style>
    </div>
  );
}
