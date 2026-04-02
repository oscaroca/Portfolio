import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-footer)',
        borderTop: '1px solid rgba(245, 200, 66, 0.1)',
        padding: '2rem',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <p
        style={{
          fontFamily: "'Kalam', cursive",
          fontSize: '1em',
          color: 'var(--color-amber)',
          letterSpacing: '0.05em',
          margin: '0 0 0.4rem',
        }}
      >
        ✦ &nbsp; oscaroca &nbsp; ✦
      </p>
      <p
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: '0.75em',
          color: 'var(--color-text-muted)',
          margin: '0 0 1rem',
        }}
      >
        &copy; {new Date().getFullYear()} — made with coffee &amp; curiosity
      </p>
      <nav
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1.5rem',
        }}
      >
        <a
          href="/privacy-policy"
          style={{
            color: 'var(--color-cream-dim)',
            textDecoration: 'none',
            fontSize: '0.72em',
            fontFamily: "'DM Mono', monospace",
            transition: 'color 0.2s',
          }}
          onMouseOver={(e) =>
            ((e.target as HTMLAnchorElement).style.color = 'var(--color-amber)')
          }
          onMouseOut={(e) =>
            ((e.target as HTMLAnchorElement).style.color =
              'var(--color-cream-dim)')
          }
        >
          Privacy Policy
        </a>
        <a
          href="/terms-of-service"
          style={{
            color: 'var(--color-cream-dim)',
            textDecoration: 'none',
            fontSize: '0.72em',
            fontFamily: "'DM Mono', monospace",
            transition: 'color 0.2s',
          }}
          onMouseOver={(e) =>
            ((e.target as HTMLAnchorElement).style.color = 'var(--color-amber)')
          }
          onMouseOut={(e) =>
            ((e.target as HTMLAnchorElement).style.color =
              'var(--color-cream-dim)')
          }
        >
          Terms of Service
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
