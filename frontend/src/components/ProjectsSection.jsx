import React, { useState } from 'react';
import { Github, Eye, ExternalLink, X, RefreshCw, ShoppingCart, TrendingUp, Users, DollarSign, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function ProjectsSection() {
  const { portfolio } = usePortfolio();
  const projects = portfolio.projects;

  const [activeDemoModal, setActiveDemoModal] = useState(null); // project object | null
  const [activeCodeModal, setActiveCodeModal] = useState(null); // project object | null

  // Live interactive demo states
  const [nexusTimeframe, setNexusTimeframe] = useState('Q3 2026');
  const [nexusDataSeed, setNexusDataSeed] = useState(1);

  const [cartCount, setCartCount] = useState(0);
  const [addedItem, setAddedItem] = useState(false);

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
    setAddedItem(true);
    setTimeout(() => setAddedItem(false), 2000);
  };

  return (
    <section id="projects" className="section">
      <div className="container">
        
        {/* Section Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.6rem' }}>
            <span className="section-tag" style={{ color: '#8b5cf6', margin: 0 }}>04 // PORTFOLIO</span>
            <span style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.2)' }}></span>
          </div>

          <h2 className="section-heading" style={{ fontSize: '2.8rem', color: '#ffffff', marginBottom: '0.8rem' }}>
            Featured Projects
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '580px', lineHeight: 1.6 }}>
            A curated selection of my recent work, focusing on performance, scalability, and premium user experiences.
          </p>
        </div>

        {/* Projects Rows Container (Zig-Zag layout dynamically) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4.5rem' }}>

          {projects.map((proj, idx) => {
            const isReverse = idx % 2 !== 0;

            return (
              <div key={proj.id} className={`project-feature-row ${isReverse ? 'reverse' : ''}`}>
                
                {/* Visual Preview Card */}
                <div className="project-feature-preview">
                  <div className="preview-glow-backdrop"></div>
                  
                  <div className="preview-card-inner">
                    {proj.image ? (
                      <img
                        src={proj.image}
                        alt={proj.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }}
                      />
                    ) : (
                      <svg width="100%" height="100%" viewBox="0 0 600 360" fill="none" preserveAspectRatio="none">
                        <rect width="600" height="360" rx="16" fill="#0c0e17" />
                        
                        {/* Top Bar */}
                        <rect width="600" height="40" fill="#131726" />
                        <circle cx="25" cy="20" r="5" fill="#ef4444" />
                        <circle cx="40" cy="20" r="5" fill="#f59e0b" />
                        <circle cx="55" cy="20" r="5" fill="#10b981" />
                        <rect x="80" y="12" width="180" height="16" rx="4" fill="rgba(255,255,255,0.08)" />

                        {/* Mock Graphic */}
                        <path d="M 50 240 Q 150 120 250 180 T 450 110 T 550 160" stroke="url(#projGrad)" strokeWidth="4" fill="none" />
                        <path d="M 50 240 Q 150 120 250 180 T 450 110 T 550 160 L 550 320 L 50 320 Z" fill="url(#projAreaGrad)" opacity="0.15" />

                        <defs>
                          <linearGradient id="projGrad" x1="0" y1="0" x2="600" y2="0">
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#3b82f6" />
                          </linearGradient>
                          <linearGradient id="projAreaGrad" x1="0" y1="0" x2="0" y2="360">
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#0c0e17" />
                          </linearGradient>
                        </defs>

                        {/* Floating Widget Mockup */}
                        <rect x="360" y="70" width="190" height="100" rx="10" fill="#181d2f" stroke="rgba(255,255,255,0.1)" />
                        <text x="380" y="100" fill="#a78bfa" fontSize="12" fontWeight="bold">{proj.title}</text>
                        <text x="380" y="125" fill="#ffffff" fontSize="18" fontWeight="800">Operational</text>
                        <text x="380" y="145" fill="#10b981" fontSize="11">● Active REST API</text>
                      </svg>
                    )}
                  </div>
                </div>

                {/* Text Details & Actions */}
                <div className="project-feature-info">
                  <h3 className="project-gradient-title">{proj.title}</h3>

                  <p className="project-feature-description">
                    {proj.description}
                  </p>

                  <div className="project-tech-pills">
                    {proj.tags.map((t, i) => (
                      <span key={i} className="project-tech-badge">{t}</span>
                    ))}
                  </div>

                  <div className="project-feature-actions">
                    <button onClick={() => setActiveCodeModal(proj)} className="btn-feature-code">
                      <Github size={18} />
                      <span>View Code</span>
                    </button>

                    <button onClick={() => setActiveDemoModal(proj)} className="btn-feature-demo">
                      <Eye size={18} />
                      <span>Live Demo</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}

        </div>

      </div>

      {/* CODE VIEW REPO MODAL */}
      {activeCodeModal && (
        <div className="modal-overlay" onClick={() => setActiveCodeModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveCodeModal(null)}>
              <X size={18} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <Github size={40} style={{ color: '#8b5cf6', margin: '0 auto 0.8rem auto' }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>
                {activeCodeModal.title} Repository
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '4px' }}>
                Official GitHub Repository & Source Architecture
              </p>
            </div>

            <div style={{ background: '#0c0e17', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '14px', padding: '1.2rem', fontFamily: 'var(--font-code)', fontSize: '0.85rem', color: '#38bdf8', marginBottom: '1.5rem' }}>
              <div style={{ color: '#94a3b8', marginBottom: '6px' }}># Clone project repository:</div>
              <div>git clone {activeCodeModal.github}</div>
            </div>

            <a
              href={activeCodeModal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>Open on GitHub</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      )}

      {/* LIVE INTERACTIVE DEMO MODAL */}
      {activeDemoModal && (
        <div className="modal-overlay" onClick={() => setActiveDemoModal(null)}>
          <div className="modal-content" style={{ maxWidth: '750px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveDemoModal(null)}>
              <X size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem' }}>
              <span className="status-dot"></span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
                Interactive Prototype: {activeDemoModal.title}
              </h3>
            </div>

            <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              {activeDemoModal.description}
            </p>

            <div style={{ background: '#0c0e17', borderRadius: '14px', padding: '1.4rem', border: '1px solid rgba(255,255,255,0.12)', marginBottom: '1.5rem' }}>
              <div style={{ color: '#38bdf8', fontFamily: 'var(--font-code)', fontSize: '0.85rem', marginBottom: '8px' }}>
                // Live Stream Connection: ACTIVE
              </div>
              <div style={{ color: '#10b981', fontSize: '0.9rem', fontWeight: 700 }}>
                ● Status 200 OK — REST Endpoint Connected
              </div>
            </div>

            <a
              href={activeDemoModal.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>Launch Full External Web Application</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      )}

    </section>
  );
}
