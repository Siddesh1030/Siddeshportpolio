import React, { useState } from 'react';
import { Code2, Terminal, Cpu, Database, Layers, GitBranch, Shield, Sparkles, Quote } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function SkillsSection() {
  const { portfolio } = usePortfolio();
  const { about, skills, tools } = portfolio;
  const [activeSkill, setActiveSkill] = useState(null);

  // Function to render icon based on skill category/name
  const renderSkillIcon = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes('java') && !lower.includes('script')) {
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C10 4 9 6 12 8C15 10 12 12 10 14" stroke="#ea580c" strokeWidth="2" strokeLinecap="round"/>
          <path d="M15 3C13 5 12 7 15 9" stroke="#0284c7" strokeWidth="2" strokeLinecap="round"/>
          <path d="M4 19C7 21 17 21 20 19C18 17.5 6 17.5 4 19Z" fill="#ea580c"/>
          <path d="M6 16C8 17.5 16 17.5 18 16" stroke="#0284c7" strokeWidth="1.5"/>
        </svg>
      );
    }
    if (lower.includes('react')) {
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61dafb" strokeWidth="1.5" transform="rotate(0 12 12)"/>
          <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61dafb" strokeWidth="1.5" transform="rotate(60 12 12)"/>
          <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61dafb" strokeWidth="1.5" transform="rotate(120 12 12)"/>
          <circle cx="12" cy="12" r="2" fill="#61dafb"/>
        </svg>
      );
    }
    if (lower.includes('spring')) {
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 3C7 3 3 7 3 12C3 17 7 21 12 21C17 21 21 17 21 12C21 7 17 3 12 3Z" stroke="#6db33f" strokeWidth="1.5"/>
          <path d="M7 13C10 7 17 8 17 14C17 18 11 18 9 14" stroke="#6db33f" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    }
    if (lower.includes('mysql') || lower.includes('sql') || lower.includes('db')) {
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M4 8C4 8 8 4 14 5C18 6 20 10 20 14C20 18 16 20 12 20C7 20 4 17 4 17" stroke="#00758f" strokeWidth="2" strokeLinecap="round"/>
          <path d="M8 12C10 10 14 10 15 13" stroke="#38bdf8" strokeWidth="1.5"/>
        </svg>
      );
    }
    return <Code2 size={24} style={{ color: '#8b5cf6' }} />;
  };

  // Build wheel nodes dynamically
  const radius = 145;
  const angleStep = 360 / (skills.length || 1);

  return (
    <section id="skills" className="section">
      <div className="container">
        {/* Main 3-Column Top Grid */}
        <div className="skills-main-layout">
          
          {/* Column 1: Left Text & Quote */}
          <div className="skills-left-col">
            <span className="section-tag" style={{ color: '#8b5cf6' }}>03 — SKILLS</span>
            <h2 className="skills-heading">
              My Expertise <br />
              <span className="gradient-text">My Strengths</span>
            </h2>
            <div className="heading-purple-line"></div>

            <p className="skills-description">
              I enjoy solving problems and building meaningful solutions. Here are the skills and technologies I'm good at and constantly improving.
            </p>

            {/* Quote Card */}
            <div className="skills-quote-card">
              <Quote size={28} className="quote-icon" style={{ color: '#8b5cf6', opacity: 0.6 }} />
              <p className="quote-text">{about.quote}</p>
              <span className="quote-author">{about.quoteAuthor}</span>
            </div>
          </div>

          {/* Column 2: Center Circular Wheel */}
          <div className="skills-wheel-col">
            <div className="skills-wheel-container">
              
              <div className="wheel-outer-ring"></div>

              <div className="ring-dot dot-top"></div>
              <div className="ring-dot dot-right"></div>
              <div className="ring-dot dot-bottom"></div>
              <div className="ring-dot dot-left"></div>

              <div className="wheel-center-core">
                <Code2 size={24} style={{ color: '#8b5cf6', marginBottom: '4px' }} />
                <h3 className="wheel-core-title">Skills</h3>
                <p className="wheel-core-sub">Always Learning</p>
                <p className="wheel-core-sub">Always Growing</p>
                <div className="core-dots">
                  <span></span><span></span><span></span>
                </div>
              </div>

              {/* ROTATING ORBIT CONTAINER */}
              <div className="wheel-rotating-container">
                {skills.map((sk, index) => {
                  const angle = index * angleStep;
                  const rad = (angle * Math.PI) / 180;
                  const x = radius * Math.cos(rad);
                  const y = radius * Math.sin(rad);

                  const isActive = activeSkill === sk.id;

                  return (
                    <div
                      key={sk.id}
                      className={`wheel-node-wrapper ${isActive ? 'active' : ''}`}
                      style={{
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                      }}
                      onMouseEnter={() => setActiveSkill(sk.id)}
                      onMouseLeave={() => setActiveSkill(null)}
                    >
                      <div className="wheel-node-counter-rotate">
                        <div className="wheel-node-circle">
                          {renderSkillIcon(sk.name)}
                        </div>
                        <span className="wheel-node-label">{sk.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

          {/* Column 3: Right Highlighted Skills List */}
          <div className="skills-right-col">
            <div className="skills-list-header">
              <h3>Highlighted Skills</h3>
              <div className="skills-code-badge">
                <Code2 size={16} style={{ color: '#8b5cf6' }} />
              </div>
            </div>

            <div className="highlighted-skills-list">
              {skills.map((sk) => {
                const isHovered = activeSkill === sk.id;
                return (
                  <div
                    key={sk.id}
                    className={`skill-bar-card ${isHovered ? 'highlighted' : ''}`}
                    onMouseEnter={() => setActiveSkill(sk.id)}
                    onMouseLeave={() => setActiveSkill(null)}
                  >
                    <div className="skill-bar-icon">
                      {renderSkillIcon(sk.name)}
                    </div>

                    <div className="skill-bar-content">
                      <div className="skill-bar-top">
                        <span className="skill-bar-name">{sk.name}</span>
                        <span className="skill-bar-percentage" style={{
                          color: (sk.name.toLowerCase().includes('java') && !sk.name.toLowerCase().includes('script')) ? '#ea580c' :
                                 (sk.name.toLowerCase().includes('python')) ? '#eab308' :
                                 (sk.name.toLowerCase().includes('javascript')) ? '#facc15' :
                                 (sk.name.toLowerCase().includes('react')) ? '#22d3ee' :
                                 (sk.name.toLowerCase().includes('spring')) ? '#22c55e' :
                                 (sk.name.toLowerCase().includes('mysql') || sk.name.toLowerCase().includes('sql')) ? '#8b5cf6' :
                                 (sk.name.toLowerCase().includes('html')) ? '#f97316' :
                                 (sk.name.toLowerCase().includes('css')) ? '#3b82f6' : '#a78bfa'
                        }}>{sk.percentage}%</span>
                      </div>

                      <div className="skill-progress-track">
                        <div
                          className="skill-progress-fill"
                          style={{
                            width: `${sk.percentage}%`,
                            background: (sk.name.toLowerCase().includes('java') && !sk.name.toLowerCase().includes('script')) ? 'linear-gradient(90deg, #ef4444 0%, #ea580c 100%)' :
                                        (sk.name.toLowerCase().includes('python')) ? 'linear-gradient(90deg, #3b82f6 0%, #eab308 100%)' :
                                        (sk.name.toLowerCase().includes('javascript')) ? 'linear-gradient(90deg, #facc15 0%, #eab308 100%)' :
                                        (sk.name.toLowerCase().includes('react')) ? 'linear-gradient(90deg, #0ea5e9 0%, #22d3ee 100%)' :
                                        (sk.name.toLowerCase().includes('spring')) ? 'linear-gradient(90deg, #10b981 0%, #22c55e 100%)' :
                                        (sk.name.toLowerCase().includes('mysql') || sk.name.toLowerCase().includes('sql')) ? 'linear-gradient(90deg, #6366f1 0%, #a855f7 100%)' :
                                        (sk.name.toLowerCase().includes('html')) ? 'linear-gradient(90deg, #f97316 0%, #ef4444 100%)' :
                                        (sk.name.toLowerCase().includes('css')) ? 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)' : undefined,
                            boxShadow: (sk.name.toLowerCase().includes('java') && !sk.name.toLowerCase().includes('script')) ? '0 0 10px rgba(239, 68, 68, 0.6)' :
                                       (sk.name.toLowerCase().includes('python')) ? '0 0 10px rgba(59, 130, 246, 0.6)' :
                                       (sk.name.toLowerCase().includes('javascript')) ? '0 0 10px rgba(250, 204, 21, 0.6)' :
                                       (sk.name.toLowerCase().includes('react')) ? '0 0 10px rgba(34, 211, 238, 0.6)' :
                                       (sk.name.toLowerCase().includes('spring')) ? '0 0 10px rgba(34, 197, 94, 0.6)' :
                                       (sk.name.toLowerCase().includes('mysql') || sk.name.toLowerCase().includes('sql')) ? '0 0 10px rgba(168, 85, 247, 0.6)' :
                                       (sk.name.toLowerCase().includes('html')) ? '0 0 10px rgba(249, 115, 22, 0.6)' :
                                       (sk.name.toLowerCase().includes('css')) ? '0 0 10px rgba(59, 130, 246, 0.6)' : undefined
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Bottom Section: Tools & Platforms I Use (Infinite Animated Marquee) */}
        <div className="tools-section">
          <div className="tools-header">
            <h3>Tools & Platforms I Use</h3>
            <span className="tools-line"></span>
          </div>

          <div className="tools-marquee-wrapper">
            <div className="tools-marquee-track">
              {Array.isArray(tools) && [...tools, ...tools].map((tool, idx) => {
                const toolName = typeof tool === 'string' ? tool : (tool ? tool.name : '');
                const palettes = [
                  { color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.09)', border: 'rgba(56, 189, 248, 0.3)', glow: 'rgba(56, 189, 248, 0.25)' },
                  { color: '#a78bfa', bg: 'rgba(167, 139, 250, 0.09)', border: 'rgba(167, 139, 250, 0.3)', glow: 'rgba(167, 139, 250, 0.25)' },
                  { color: '#60a5fa', bg: 'rgba(96, 165, 250, 0.09)', border: 'rgba(96, 165, 250, 0.3)', glow: 'rgba(96, 165, 250, 0.25)' },
                  { color: '#34d399', bg: 'rgba(52, 211, 153, 0.09)', border: 'rgba(52, 211, 153, 0.3)', glow: 'rgba(52, 211, 153, 0.25)' },
                  { color: '#f472b6', bg: 'rgba(244, 114, 182, 0.09)', border: 'rgba(244, 114, 182, 0.3)', glow: 'rgba(244, 114, 182, 0.25)' },
                  { color: '#c084fc', bg: 'rgba(192, 132, 252, 0.09)', border: 'rgba(192, 132, 252, 0.3)', glow: 'rgba(192, 132, 252, 0.25)' },
                  { color: '#fb923c', bg: 'rgba(251, 146, 60, 0.09)', border: 'rgba(251, 146, 60, 0.3)', glow: 'rgba(251, 146, 60, 0.25)' }
                ];
                const theme = palettes[idx % palettes.length];

                return (
                  <div
                    key={(tool?.id || 't') + '-' + idx}
                    className="tool-card"
                    style={{
                      background: theme.bg,
                      borderColor: theme.border,
                      boxShadow: `0 8px 24px rgba(0, 0, 0, 0.35), 0 0 15px ${theme.glow}`
                    }}
                  >
                    <div
                      className="tool-icon"
                      style={{
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: `1px solid ${theme.border}`,
                        borderRadius: '12px',
                        padding: '6px'
                      }}
                    >
                      <Terminal size={22} style={{ color: theme.color }} />
                    </div>
                    <span className="tool-name" style={{ color: '#ffffff', fontWeight: 700 }}>
                      {toolName}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
