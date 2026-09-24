import React, { useState } from 'react';
import { ShieldCheck, Lock, User, ArrowLeft, KeyRound, AlertCircle } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess, onBackToPortfolio }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim().toLowerCase() === 'admin' || username.trim().toLowerCase() === 'admin@siddesh.com') {
      if (password === 'admin123password' || password === 'admin123') {
        setError('');
        onLoginSuccess();
        return;
      }
    }
    setError('Invalid username or password.');
  };

  return (
    <div className="admin-login-screen">
      
      {/* Dynamic Glow Orbs in Background */}
      <div className="bg-glow-container">
        <div className="glow-orb glow-orb-1"></div>
        <div className="glow-orb glow-orb-2"></div>
        <div className="glow-orb glow-orb-3"></div>
      </div>

      <div className="admin-login-card dark-admin-card">
        
        {/* Back Link */}
        <button onClick={onBackToPortfolio} className="admin-back-link">
          <ArrowLeft size={16} />
          <span>Back to Live Portfolio</span>
        </button>

        {/* Header Icon & Title */}
        <div style={{ textAlign: 'center', margin: '1.2rem 0 2rem 0' }}>
          <div className="admin-login-icon-badge">
            <ShieldCheck size={32} style={{ color: '#16a34a' }} />
          </div>
          
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#166534', marginBottom: '0.4rem' }}>
            Portfolio CMS Admin
          </h2>
          
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Sign in to manage your portfolio content, skills, projects, and contact inquiries.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="admin-login-error-alert">
            <AlertCircle size={18} style={{ color: '#f87171' }} />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '1.2rem' }}>
            <label className="form-label">
              Admin Username / Email
            </label>
            <div className="admin-input-icon-wrapper">
              <User size={18} className="input-icon" />
              <input
                type="text"
                required
                className="form-input admin-input-padded"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1.8rem' }}>
            <label className="form-label">
              Password
            </label>
            <div className="admin-input-icon-wrapper">
              <KeyRound size={18} className="input-icon" />
              <input
                type="password"
                required
                className="form-input admin-input-padded"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', fontSize: '0.95rem' }}>
            <Lock size={18} />
            <span>Authenticate Admin Session</span>
          </button>
        </form>

        {/* Default Credential Notice Box */}
        
      </div>
    </div>
  );
}
