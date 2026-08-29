import { navLinks, socialLinks } from '../data/content'
import './Footer.css'

const ICONS = {
  instagram: (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        fill="currentColor"
        d="M13.5 21v-7.6h2.55l.38-2.96h-2.93V8.56c0-.86.24-1.44 1.47-1.44h1.57V4.47c-.27-.04-1.2-.12-2.28-.12-2.25 0-3.8 1.37-3.8 3.9v2.18H7.99v2.96h2.42V21z"
      />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="8.2" cy="8.4" r="1.15" fill="currentColor" />
      <path d="M7.1 10.9v6.1h2.1v-6.1zM11.4 10.9v6.1h2.1v-3.2c0-.85.4-1.5 1.25-1.5.79 0 1.15.56 1.15 1.5v3.2h2.1v-3.5c0-2-1.07-2.93-2.5-2.93-1.15 0-1.66.64-1.95 1.09v-.93z" fill="currentColor" stroke="none" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <rect x="3" y="6" width="18" height="12" rx="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.5 9.6v4.8l4.2-2.4z" fill="currentColor" />
    </svg>
  ),
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img
            src="/sm360-logo-dark.png"
            alt="Super Media 360"
            className="footer-logo"
          />
        </div>

        <nav className="footer-links" aria-label="Footer">
          <span className="footer-heading">Quick Links</span>
          {navLinks.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="footer-social">
          <span className="footer-heading">Follow Us</span>
          <div className="footer-social-icons">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                style={{ '--accent': social.accent }}
                className="footer-social-icon"
              >
                {ICONS[social.icon]}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>&copy; 2026 SuperMedia360. All rights reserved.</span>
      </div>
    </footer>
  )
}
