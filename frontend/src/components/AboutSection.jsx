import React from 'react';
import { ArrowRight } from 'lucide-react';
import TechOrbit from './TechOrbit';
import { usePortfolio } from '../context/PortfolioContext';

export default function AboutSection() {
  const { portfolio } = usePortfolio();
  const { about } = portfolio;

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="about-grid">
          {/* Left Text Column */}
          <div className="about-content">
            <span className="section-tag">{about.sectionTag || '01 // ABOUT ME'}</span>
            <h2 className="section-heading">
              {about.heading}
            </h2>

            <p>{about.bioLine1}</p>

            <p>{about.bioLine2}</p>

            {/* Internship Callout Box */}
            <div className="experience-highlight-box">
              <p>{about.internshipHighlight}</p>
            </div>

            <a href="#skills" className="more-about-btn">
              <span>More About Me</span>
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Right Interactive Profile Photo Card */}
          <div className="about-orbit-col">
            <TechOrbit />
          </div>
        </div>
      </div>
    </section>
  );
}
