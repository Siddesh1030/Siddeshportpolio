import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { PortfolioProvider } from './context/PortfolioContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import EducationSection from './components/EducationSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';

function PortfolioMain() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out'
    });
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateTo = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-root">
      {/* Dynamic Ambient Background Orbs */}
      <div className="bg-glow-container">
        <div className="glow-orb glow-orb-1"></div>
        <div className="glow-orb glow-orb-2"></div>
        <div className="glow-orb glow-orb-3"></div>
        <div className="glow-orb glow-orb-4"></div>
      </div>

      {/* Navigation Header */}
      <Navbar
        onOpenContact={scrollToContact}
        onNavigateAdmin={() => navigateTo('/admin')}
        onNavigateTo={navigateTo}
        currentPath={location.pathname}
      />

      {/* Continuous Single-Page Portfolio */}
      <main>
        <div data-aos="fade-up">
          <HeroSection onOpenContact={scrollToContact} />
        </div>
        <div data-aos="fade-up">
          <AboutSection />
        </div>
        <div data-aos="fade-up">
          <SkillsSection />
        </div>
        <div data-aos="fade-up">
          <EducationSection />
        </div>
        <div data-aos="fade-up">
          <ProjectsSection />
        </div>
        <div data-aos="fade-up">
          <ExperienceSection />
        </div>
        <div data-aos="fade-up">
          <ContactSection />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function AdminRouteWrapper() {
  const navigate = useNavigate();
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem('siddesh_admin_auth') === 'true';
  });

  const handleAdminLoginSuccess = () => {
    sessionStorage.setItem('siddesh_admin_auth', 'true');
    setIsAdminAuthenticated(true);
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem('siddesh_admin_auth');
    setIsAdminAuthenticated(false);
    navigate('/');
  };

  return isAdminAuthenticated ? (
    <AdminDashboard
      onLogout={handleAdminLogout}
      onNavigateToPublic={() => navigate('/')}
    />
  ) : (
    <AdminLogin
      onLoginSuccess={handleAdminLoginSuccess}
      onBackToPortfolio={() => navigate('/')}
    />
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminRouteWrapper />} />
          <Route path="*" element={<PortfolioMain />} />
        </Routes>
      </BrowserRouter>
    </PortfolioProvider>
  );
}
