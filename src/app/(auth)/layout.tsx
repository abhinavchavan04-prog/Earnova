export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-layout">
      <div className="auth-panel">
        {children}
      </div>
      <div className="auth-visual">
        <div style={{ maxWidth: '400px', textAlign: 'center' }}>
          <h3 style={{ marginBottom: 'var(--sp-4)', color: 'var(--p-600)' }}>
            One dashboard.
            <br />
            Multiple income streams.
          </h3>
          <p style={{ color: 'var(--n-600)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)' }}>
            From micro-tasks to real freelance clients — subscribe once and access everything. We source the work, handle quality checks, and pay you directly.
          </p>
          <div className="stack stack-3" style={{ marginTop: 'var(--sp-8)', textAlign: 'left' }}>
            <div className="flex-gap-3" style={{ fontSize: 'var(--text-sm)', color: 'var(--n-700)' }}>
              <span style={{ color: 'var(--p-500)', fontWeight: 'var(--weight-bold)' }}>01</span>
              Ad-watching, surveys, data entry, AI labeling
            </div>
            <div className="flex-gap-3" style={{ fontSize: 'var(--text-sm)', color: 'var(--n-700)' }}>
              <span style={{ color: 'var(--p-500)', fontWeight: 'var(--weight-bold)' }}>02</span>
              Design, dev, VA, copywriting, SMM jobs
            </div>
            <div className="flex-gap-3" style={{ fontSize: 'var(--text-sm)', color: 'var(--n-700)' }}>
              <span style={{ color: 'var(--p-500)', fontWeight: 'var(--weight-bold)' }}>03</span>
              Paid skill guides starting with POD
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
