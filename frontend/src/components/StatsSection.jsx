import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export default function StatsSection() {
  const { portfolio } = usePortfolio();
  const statsData = portfolio.stats;

  return (
    <section className="stats-bar-section">
      <div className="container">
        <div className="stats-grid">
          {statsData.map((stat) => (
            <div key={stat.id} className="stat-card">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
