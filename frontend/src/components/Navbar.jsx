import React, { useState, useEffect } from 'react';
import { Download, Menu, X, Code2, ShieldCheck } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Navbar({ onOpenContact, onNavigateAdmin, onNavigateTo, currentPath }) {
  const { portfolio } = usePortfolio();
  const { resume } = portfolio;
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['home', 'about', 'skills', 'education', 'projects', 'experience', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT', href: '#about' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'EDUCATION', href: '#education' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'EXPERIENCE', href: '#experience' },
    { name: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = (e, link) => {
    setMobileMenuOpen(false);
  };

  const handleDownloadResume = (e) => {
    e.preventDefault();
    if (resume.downloadUrl && resume.downloadUrl !== '#resume') {
      const link = document.createElement('a');
      link.href = resume.downloadUrl;
      link.download = resume.fileName || 'Siddesh_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert(`Resume document: ${resume.fileName || 'Siddesh_Resume.pdf'}`);
    }
  };

  return (
    <header className="navbar-wrapper">
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a
          href="/"
          className="brand-logo"
          onClick={(e) => {
            if (window.location.pathname === '/education') {
              e.preventDefault();
              if (onNavigateTo) onNavigateTo('/');
            }
          }}
        >
          <Code2 size={20} className="text-purple" style={{ color: '#8b5cf6' }} />
          <span>{portfolio.hero.name || 'SIDDESH'}</span>
        </a>

        {/* Right Nav Items & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`nav-link ${
                    activeSection === link.href.substring(1) ? 'active' : ''
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <a href="#resume" onClick={handleDownloadResume} className="resume-btn" style={{ marginLeft: '0.2rem' }}>
            <span>RESUME</span>
            <Download size={14} />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(7, 8, 12, 0.95)',
            backdropFilter: 'blur(20px)',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.8rem',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: '#ffffff',
                fontSize: '1.4rem',
                fontWeight: '700',
                textDecoration: 'none',
                letterSpacing: '1px',
              }}
            >
              {link.name}
            </a>
          ))}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenContact();
            }}
            className="btn-primary"
          >
            Get In Touch
          </button>
        </div>
      )}
    </header>
  );
}
