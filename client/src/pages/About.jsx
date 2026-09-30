export default function About() {
  return (
    <div className="container animate-fade" style={{ padding: '80px 32px', maxWidth: '800px' }}>
      <h1 style={{ marginBottom: '24px' }}>About SoleHub</h1>
      <div style={{ backgroundColor: 'var(--white)', padding: '40px', borderRadius: 'var(--radius-card)', border: '1px solid var(--border)' }}>
        <p style={{ fontSize: '1.1rem', marginBottom: '24px' }}>
          SoleHub is a student-built demonstration e-commerce application created to explore cloud deployment, REST APIs and cloud database management.
        </p>
        <p style={{ marginBottom: '16px', color: 'var(--muted-text)' }}>
          This project was developed as part of a Cloud Computing ALA-1 assignment. It demonstrates key cloud concepts rather than functioning as an actual commercial entity. 
        </p>
        <h3 style={{ marginTop: '32px', marginBottom: '16px' }}>Technologies Used</h3>
        <ul style={{ listStyle: 'disc', paddingLeft: '24px', color: 'var(--muted-text)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>Frontend: React, HTML, CSS, JavaScript</li>
          <li>Backend: Node.js, Express.js</li>
          <li>Database: PostgreSQL</li>
          <li>Cloud Compute: Render Web Service</li>
          <li>Cloud Storage: Render PostgreSQL</li>
        </ul>
      </div>
    </div>
  );
}
