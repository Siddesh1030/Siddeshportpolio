import React from 'react';
import { Briefcase, Calendar, Building2, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function ExperienceSection() {
  const { portfolio } = usePortfolio();
  const experiences = portfolio.experience;

  return (
    <section id="experience" className="section" style={{ paddingBottom: '2.5rem' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="section-tag">02 // INDUSTRY EXPERIENCE</span>
          <h2 className="section-heading">Professional Journey</h2>
        </div>

        {/* Experience List Grid */}
        <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {experiences.map((exp) => (
            <div key={exp.id} className="glass-card exp-card">
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
                    <span className="exp-role-title">{exp.role}</span>
                    <span className="exp-status-chip">
                      <CheckCircle2 size={12} style={{ color: '#10b981' }} />
                      Verified Role
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#a78bfa', fontSize: '0.95rem', fontWeight: 700 }}>
                    <Building2 size={16} />
                    <span>{exp.company}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>
                  <Calendar size={14} style={{ color: '#38bdf8' }} />
                  <span>{exp.period}</span>
                </div>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '1.2rem' }}>
                {exp.description}
              </p>

              {/* Technologies Used Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {exp.tags.map((tag, idx) => (
                  <span key={idx} className="exp-tech-pill">
                    {tag}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
