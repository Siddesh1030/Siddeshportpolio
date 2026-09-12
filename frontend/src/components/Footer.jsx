import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="brand-logo" style={{ fontSize: '1.5rem' }}>
            Siddesh
          </div>

          <div className="footer-links">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <Linkedin size={16} />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <Twitter size={16} />
              <span>Twitter</span>
            </a>

            <a
              href="mailto:siddesh.dev@gmail.com"
              className="footer-link"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <Mail size={16} />
              <span>Email</span>
            </a>
          </div>

          <div className="footer-quote">
            © {new Date().getFullYear()} Siddesh. Crafting the Future of the Web.
          </div>
        </div>
      </div>
    </footer>
  );
}
