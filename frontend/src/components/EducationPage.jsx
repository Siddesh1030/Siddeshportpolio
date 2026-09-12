import React from 'react';
import { GraduationCap, Award, BookOpen, Cpu, Calendar, MapPin, CheckCircle2, ArrowLeft } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

// Education Overview Page Component

export default function EducationPage({ onNavigateHome, onNavigateTo }) {
  const { portfolio } = usePortfolio();
  const edu = portfolio.education || {
    degree: 'B.Tech – Computer Science & Engineering',
    university: 'Presidency University, Bengaluru',
    duration: '2024 – 2028',
    currentStatus: 'Currently in 3rd Year',
    tenthPercentage: '78.88%',
    twelfthPercentage: '90.83%',
    cgpa: '7.79',
    subjects: [
      'Data Structures',
      'Object-Oriented Programming',
      'Database Management',
      'Machine Learning',
      'Data Analytics',
      'Cryptography',
      'Blockchain',
      'Theory of Computation',
      'Unix & Shell Programming'
    ],
    technicalSkills: ['Java', 'Python', 'React.js', 'Spring Boot', 'MySQL', 'Git']
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0b0d17', color: '#f8fafc', paddingTop: '7rem', paddingBottom: '5rem' }}>
      
      {/* Container */}
      <div className="container">
        
        {/* Top Header / Back link */}
        <div style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <button
              onClick={onNavigateHome}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#38bdf8',
                borderRadius: '9999px',
                padding: '0.45rem 1.1rem',
                fontSize: '0.82rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                cursor: 'pointer',
                marginBottom: '0.8rem',
                transition: 'all 0.3s ease'
              }}
            >
              <ArrowLeft size={16} />
              <span>Back to Portfolio</span>
            </button>
            <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.5px' }}>
              Academic & Education Overview
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginTop: '0.3rem' }}>
              Degree details, academic marks, core CS subjects, and technical expertise.
            </p>
          </div>
        </div>

        {/* SECTION 1: Main Education Degree Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(241, 245, 249, 0.98) 100%)',
            borderRadius: '24px',
            padding: '2.4rem',
            marginBottom: '2.2rem',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.35), 0 0 30px rgba(59, 130, 246, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            color: '#0f172a',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.2rem' }}>
            <div style={{ display: 'flex', gap: '1.4rem', alignItems: 'center' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  boxShadow: '0 8px 20px rgba(37, 99, 235, 0.35)',
                  flexShrink: 0
                }}
              >
                <GraduationCap size={32} />
              </div>

              <div>
                <span
                  style={{
                    background: 'rgba(37, 99, 235, 0.1)',
                    color: '#2563eb',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    padding: '0.3rem 0.8rem',
                    borderRadius: '9999px',
                    letterSpacing: '1px',
                    display: 'inline-block',
                    marginBottom: '0.5rem'
                  }}
                >
                  BACHELOR OF TECHNOLOGY
                </span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  {edu.degree}
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginTop: '0.6rem', flexWrap: 'wrap', color: '#475569', fontSize: '0.92rem', fontWeight: 600 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <MapPin size={16} style={{ color: '#7c3aed' }} />
                    <span>{edu.university}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Calendar size={16} style={{ color: '#2563eb' }} />
                    <span>{edu.duration}</span>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                color: '#ffffff',
                padding: '0.6rem 1.3rem',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '0.88rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)'
              }}
            >
              <CheckCircle2 size={16} />
              <span>{edu.currentStatus}</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: Academic Performance (3 Cards) */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Award size={20} style={{ color: '#38bdf8' }} />
            <span>Academic Performance</span>
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.4rem' }}>
            
            {/* Card 1: 10th */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                padding: '1.6rem',
                boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                transition: 'all 0.3s ease'
              }}
              className="academic-card-hover"
            >
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Secondary School
              </div>
              <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#2563eb', margin: '0.3rem 0' }}>
                {edu.tenthPercentage}
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
                10th Standard / SSLC
              </div>
            </div>

            {/* Card 2: 12th / 2nd PU */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                padding: '1.6rem',
                boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                transition: 'all 0.3s ease'
              }}
              className="academic-card-hover"
            >
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Higher Secondary
              </div>
              <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#7c3aed', margin: '0.3rem 0' }}>
                {edu.twelfthPercentage}
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
                12th / 2nd PU Marks
              </div>
            </div>

            {/* Card 3: Current CGPA */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                padding: '1.6rem',
                boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                transition: 'all 0.3s ease'
              }}
              className="academic-card-hover"
            >
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Engineering Cumulative Score
              </div>
              <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#0284c7', margin: '0.3rem 0' }}>
                {edu.cgpa}
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
                Current CGPA (Out of 10)
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 3: Relevant Subjects */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen size={20} style={{ color: '#a78bfa' }} />
            <span>Relevant Computer Science Subjects</span>
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
            {Array.isArray(edu.subjects) && edu.subjects.map((subject, idx) => (
              <div
                key={idx}
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  padding: '1rem 1.2rem',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
                  border: '1px solid rgba(226, 232, 240, 0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.7rem',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                }}
                className="subject-card-hover"
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: idx % 2 === 0 ? '#2563eb' : '#7c3aed', flexShrink: 0 }}></div>
                <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a' }}>
                  {subject}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: Technical Learning & Skills Summary */}
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Cpu size={20} style={{ color: '#38bdf8' }} />
            <span>Core Technical Learning</span>
          </h3>

          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '1.8rem 2.2rem',
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '1.2rem'
            }}
          >
            {Array.isArray(edu.technicalSkills) && edu.technicalSkills.map((tech, idx) => (
              <React.Fragment key={idx}>
                <span
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    color: idx % 2 === 0 ? '#2563eb' : '#7c3aed',
                    letterSpacing: '0.5px'
                  }}
                >
                  {tech}
                </span>
                {idx < edu.technicalSkills.length - 1 && (
                  <span style={{ color: '#cbd5e1', fontWeight: 900, fontSize: '1.2rem' }}>•</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
