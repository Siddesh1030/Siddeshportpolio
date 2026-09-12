import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function TechOrbit() {
  const { portfolio } = usePortfolio();
  const photoUrl = portfolio.hero.profileImage;

  return (
    <div className="profile-photo-card-wrapper">
      {/* Ambient Halo Glow */}
      <div className="photo-glow-aura"></div>

      {/* Main Profile Photo Container */}
      <div className="profile-photo-container">
        
        {/* Photo Ring Frame */}
        <div className="photo-frame-ring">
          <div className="photo-inner-circle">
            {photoUrl ? (
              <img src={photoUrl} alt={portfolio.hero.name || "Siddesh Profile"} className="profile-img-element" />
            ) : (
              <div className="profile-avatar-fallback">
                <svg viewBox="0 0 160 160" className="avatar-svg-placeholder">
                  <defs>
                    <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                    <radialGradient id="headGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  <rect width="160" height="160" fill="#0f1322" />
                  <circle cx="80" cy="80" r="70" fill="url(#headGlow)" />
                  
                  {/* Head & Body Silhouette */}
                  <circle cx="80" cy="62" r="28" fill="url(#avatarGrad)" />
                  <path d="M 32 140 C 32 108, 52 94, 80 94 C 108 94, 128 108, 128 140 Z" fill="url(#avatarGrad)" />
                </svg>
              </div>
            )}

          </div>
        </div>

        {/* Name & Title Badge Below Photo */}
        <div className="profile-info-badge">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.5px' }}>
              {portfolio.hero.name || 'SIDDESH'}
            </span>
            <CheckCircle2 size={16} style={{ color: '#38bdf8' }} />
          </div>

          <div style={{ fontSize: '0.78rem', color: '#a78bfa', fontWeight: 600, marginTop: '2px' }}>
            {portfolio.hero.title || 'Full-Stack Web Developer'}
          </div>
        </div>

      </div>
    </div>
  );
}
