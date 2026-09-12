import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Coffee, Layers, Cpu, Database } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function HeroSection({ onOpenContact }) {
  const { portfolio } = usePortfolio();
  const { hero } = portfolio;

  // Parallax tilt state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Typewriter animation state generated from CMS values
  const codeLinesData = [
    { num: '01', text: `public class ${hero.name} {`, tokens: [{ text: 'public class ', cls: 'keyword' }, { text: `${hero.name} `, cls: 'function' }, { text: '{', cls: '' }] },
    { num: '02', text: `  String mindset = "${hero.mindset}";`, tokens: [{ text: '  String mindset = ', cls: '' }, { text: `"${hero.mindset}"`, cls: 'string' }, { text: ';', cls: '' }] },
    { num: '03', text: '', tokens: [] },
    { num: '04', text: '  void journey() {', tokens: [{ text: '  void ', cls: 'keyword' }, { text: 'journey', cls: 'function' }, { text: '() {', cls: '' }] },
    { num: '05', text: '    System.out.println(', tokens: [{ text: '    System.out.', cls: '' }, { text: 'println', cls: 'function' }, { text: '(', cls: '' }] },
    { num: '06', text: `      "${hero.journeyMsg}"`, tokens: [{ text: `      "${hero.journeyMsg}"`, cls: 'string' }] },
    { num: '07', text: '    );', tokens: [{ text: '    );', cls: '' }] },
    { num: '08', text: '  }', tokens: [{ text: '  }', cls: '' }] },
    { num: '09', text: '', tokens: [] },
    { num: '10', text: '  void goal() {', tokens: [{ text: '  void ', cls: 'keyword' }, { text: 'goal', cls: 'function' }, { text: '() {', cls: '' }] },
    { num: '11', text: '    System.out.println(', tokens: [{ text: '    System.out.', cls: '' }, { text: 'println', cls: 'function' }, { text: '(', cls: '' }] },
    { num: '12', text: `      "${hero.goalMsg || 'Build today. Become better tomorrow.'}"`, tokens: [{ text: `      "${hero.goalMsg || 'Build today. Become better tomorrow.'}"`, cls: 'string' }] },
    { num: '13', text: '    );', tokens: [{ text: '    );', cls: '' }] },
    { num: '14', text: '  }', tokens: [{ text: '  }', cls: '' }] },
    { num: '15', text: '}', tokens: [{ text: '}', cls: '' }] },
  ];

  const totalLength = codeLinesData.reduce((acc, line) => acc + line.text.length + 1, 0);
  const [typedChars, setTypedChars] = useState(0);

  useEffect(() => {
    setTypedChars(0);
    const interval = setInterval(() => {
      setTypedChars((prev) => {
        if (prev < totalLength) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [totalLength, hero]);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({ x: -(y / 28), y: x / 28 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  let charTracker = 0;

  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Text Column */}
          <div className="hero-content">
            <div className="status-badge">
              <span className="status-dot"></span>
              <span>{hero.badgeText}</span>
            </div>

            <h1 className="hero-title">
              {hero.name}:<br />
              {hero.heroTitlePrefix || 'Crafting the'}<br />
              <span className="gradient-text">{hero.heroTitleGradient || 'Future of the'}</span><br />
              {hero.heroTitleSuffix || 'Web.'}
            </h1>

            <p className="hero-subtitle">
              {hero.subtitle}
            </p>

            <div className="hero-actions">
              <a href="#projects" className="btn-primary">
                <span>View Projects</span>
                <ArrowRight size={18} />
              </a>

              <button onClick={onOpenContact} className="btn-secondary">
                <span>Get In Touch</span>
              </button>
            </div>
          </div>

          {/* Right IDE / Visual Column */}
          <div
            className="hero-code-wrapper"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
          >
            <div className="code-window-container">
              <div className="code-window-header">
                <div className="window-dots">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                </div>
                <div className="window-title">{hero.javaSnippetName || 'Siddesh.java'}</div>
                <Sparkles size={14} style={{ color: '#8b5cf6' }} />
              </div>

              <div className="code-window-body">
                {codeLinesData.map((lineData) => {
                  const lineStartChar = charTracker;
                  const lineLen = lineData.text.length;
                  charTracker += lineLen + 1;

                  const typedInLine = Math.max(0, Math.min(lineLen, typedChars - lineStartChar));
                  const isCursorOnThisLine = typedChars >= lineStartChar && typedChars <= lineStartChar + lineLen;

                  let renderedChars = 0;

                  return (
                    <div key={lineData.num} className="code-line">
                      <span className="line-num">{lineData.num}</span>
                      <span>
                        {lineData.tokens.map((token, tokIdx) => {
                          const tokenLen = token.text.length;
                          const tokenTypedLen = Math.max(0, Math.min(tokenLen, typedInLine - renderedChars));
                          renderedChars += tokenLen;

                          if (tokenTypedLen <= 0) return null;

                          return (
                            <span key={tokIdx} className={token.cls}>
                              {token.text.substring(0, tokenTypedLen)}
                            </span>
                          );
                        })}

                        {(isCursorOnThisLine || (lineData.num === '15' && typedChars >= totalLength)) && (
                          <span className="typing-cursor"></span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Floating Tech Badges */}
            <div className="floating-chip chip-1">
              <Layers size={13} style={{ color: '#60a5fa' }} />
              <span>{hero.floatingBadges?.[0] || 'React.js'}</span>
            </div>

            <div className="floating-chip chip-2">
              <Coffee size={13} style={{ color: '#f87171' }} />
              <span>{hero.floatingBadges?.[1] || 'Java'}</span>
            </div>

            <div className="floating-chip chip-3">
              <Cpu size={13} style={{ color: '#c084fc' }} />
              <span>{hero.floatingBadges?.[2] || 'Spring Boot'}</span>
            </div>

            <div className="floating-chip chip-4">
              <Database size={13} style={{ color: '#34d399' }} />
              <span>{hero.floatingBadges?.[3] || 'MySQL'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
