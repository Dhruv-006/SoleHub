import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';
import { Search, Filter } from 'lucide-react';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category') || '';

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? p.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortOrder === 'price-asc') return a.price - b.price;
    if (sortOrder === 'price-desc') return b.price - a.price;
    if (sortOrder === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
    return 0;
  });

  return (
    <div className="container animate-fade" style={{ padding: '40px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <h1>Shop Shoes</h1>
        
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-text)' }} />
            <input 
              type="text" 
              placeholder="Search shoes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '40px', width: '250px' }}
            />
          </div>
          
          <select 
            className="input-field" 
            style={{ width: 'auto' }}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Sort by: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest Arrivals</option>
          </select>
          
          {categoryFilter && (
            <button 
              className="btn-outline" 
              onClick={() => setSearchParams({})}
              style={{ padding: '8px 16px', fontSize: '0.9rem' }}
            >
              Clear Filter: {categoryFilter}
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p style={{ color: 'var(--error)' }}>We couldn't load the shoes. {error}</p>
      ) : (
        <>
          {filteredProducts.length === 0 ? (
            <div style={{ padding: '80px 0', textAlign: 'center' }}>
              <h3>No products found.</h3>
              <p style={{ color: 'var(--muted-text)', marginTop: '8px' }}>Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}

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
      `}</style>
    </div>
  );
}
