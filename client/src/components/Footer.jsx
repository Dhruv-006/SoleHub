import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--primary-black)', color: 'var(--white)', padding: '64px 0 32px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '48px' }}>
          <div>
            <h3 style={{ color: 'var(--white)', marginBottom: '16px', letterSpacing: '1px' }}>SOLEHUB</h3>
            <p style={{ color: 'var(--muted-text)', fontSize: '0.9rem' }}>Step Into Your Style.</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--white)', marginBottom: '16px' }}>Links</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--muted-text)', fontSize: '0.9rem' }}>
              <li><Link to="/products" style={{ color: 'inherit' }}>Shop</Link></li>
              <li><Link to="/products?category=Sneakers" style={{ color: 'inherit' }}>Categories</Link></li>
              <li><Link to="/about" style={{ color: 'inherit' }}>About</Link></li>
              <li><a href="#" style={{ color: 'inherit' }}>Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'var(--white)', marginBottom: '16px' }}>Legal</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--muted-text)', fontSize: '0.9rem' }}>
              <li><a href="#" style={{ color: 'inherit' }}>Privacy Policy</a></li>
              <li><a href="#" style={{ color: 'inherit' }}>Terms & Conditions</a></li>
            </ul>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #333', paddingTop: '32px', textAlign: 'center', color: 'var(--muted-text)', fontSize: '0.85rem' }}>
          &copy; 2026 SoleHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
