import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu } from 'lucide-react';
import { useCart } from '../utils/useCart';

export default function Header() {
  const { cart } = useCart();
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header style={{ backgroundColor: 'var(--white)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 10 }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <Link to="/" style={{ fontWeight: 700, fontSize: '1.25rem', letterSpacing: '1px', color: 'var(--primary-black)' }}>
            SOLEHUB
          </Link>
          <nav style={{ display: 'flex', gap: '24px' }} className="desktop-nav">
            <Link to="/" style={{ fontWeight: 600 }}>Home</Link>
            <Link to="/products" style={{ fontWeight: 600 }}>Shop</Link>
            <Link to="/products?category=Sneakers" style={{ fontWeight: 600 }}>Categories</Link>
            <Link to="/about" style={{ fontWeight: 600 }}>About</Link>
          </nav>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link to="/products" style={{ color: 'var(--primary-black)' }}>
            <Search size={20} />
          </Link>
          <Link to="/cart" style={{ color: 'var(--primary-black)', position: 'relative' }}>
            <ShoppingCart size={20} />
            {cartItemCount > 0 && (
              <span style={{ 
                position: 'absolute', top: '-8px', right: '-8px', 
                backgroundColor: 'var(--accent)', color: 'var(--white)', 
                fontSize: '0.7rem', fontWeight: 600, width: '18px', height: '18px', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                borderRadius: '50%' 
              }}>
                {cartItemCount}
              </span>
            )}
          </Link>
          <button className="mobile-menu" style={{ display: 'none' }}><Menu size={24} /></button>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu { display: block !important; }
        }
      `}</style>
    </header>
  );
}
