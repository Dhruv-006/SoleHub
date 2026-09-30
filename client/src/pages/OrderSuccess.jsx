import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || 'UNKNOWN';

  return (
    <div className="container animate-fade" style={{ padding: '120px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <CheckCircle size={64} color="var(--success)" style={{ marginBottom: '24px' }} />
      <h1 style={{ marginBottom: '16px' }}>Order Placed Successfully</h1>
      <p style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Order ID: <span style={{ fontWeight: 600 }}>{orderId}</span></p>
      <p style={{ color: 'var(--muted-text)', marginBottom: '40px' }}>Thank you for shopping with SoleHub.</p>
      
      <Link to="/products" className="btn-outline">
        Continue Shopping
      </Link>
    </div>
  );
}
