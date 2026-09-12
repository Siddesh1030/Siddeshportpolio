import React, { createContext, useContext, useState, useEffect } from 'react';
import { portfolioApi } from '../services/api';

const PortfolioContext = createContext();

// Initial Default Portfolio Data (Database / Content Baseline)
const initialPortfolioData = {
  hero: {
    badgeText: 'AVAILABLE FOR INTERNSHIPS / PROJECTS / FULL-TIME ROLES',
    name: 'SIDDESH',
    title: 'Full-Stack Developer | React.js • Java Spring Boot • MySQL',
    heroTitlePrefix: 'Crafting Scalable Apps with',
    heroTitleGradient: 'React.js, Spring Boot',
    heroTitleSuffix: '& MySQL.',
    subtitle: 'CS Student at Presidency University building modern full-stack web applications with React.js, Java Spring Boot, & MySQL.',
    javaSnippetName: 'SiddeshApplication.java',
    mindset: 'Learn. Build. Improve.',
    journeyMsg: 'Every line of code is a step forward.',
    goalMsg: 'Build today. Become better tomorrow.',
    floatingBadges: ['React.js', 'Java Spring Boot', 'MySQL']
  },

  about: {
    sectionTag: '01 // ABOUT ME',
    heading: 'Full-Stack Developer specializing in React.js, Java Spring Boot, and MySQL.',
    bioLine1: 'I am a Computer Science student at Presidency University, passionate about building robust web applications. My core technical expertise lies in React.js for modern reactive frontends, Java Spring Boot for high-performance REST APIs, and MySQL for relational database design.',
    bioLine2: 'I focus on writing clean, scalable code and delivering seamless user experiences across the entire software development lifecycle.',
    internshipHighlight: 'Recently, I gained hands-on industry experience as a Full Stack Web Development Intern at StrandVizio Consulting Services, building full-stack applications with React.js, Spring Boot, and MySQL.',
    quote: 'Skills are built, not bought. Every day, I invest in becoming a better developer.',
    quoteAuthor: '— Siddesh'
  },

  education: {
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
    technicalSkills: ['React.js', 'Java Spring Boot', 'MySQL', 'Java', 'Git']
  },

  experience: [
    {
      id: 'exp-1',
      role: 'Full Stack Web Development Intern',
      company: 'StrandVizio Consulting Services Pvt. Ltd.',
      period: 'June 2024 - July 2024',
      description: 'Developed full-stack web applications using React.js for dynamic UI rendering, integrated backend REST APIs built with Java Spring Boot, and optimized relational database schemas in MySQL.',
      tags: ['React.js', 'Java Spring Boot', 'MySQL', 'REST API', 'Git']
    }
  ],

  stats: [
    { id: 'stat-1', value: '05+', label: 'PROJECTS BUILT' },
    { id: 'stat-2', value: '10+', label: 'TECHNOLOGIES' },
    { id: 'stat-3', value: '01', label: 'INDUSTRY INTERNSHIP' },
    { id: 'stat-4', value: '∞', label: 'LEARNING MINDSET' }
  ],

  skills: [
    { id: 'react', name: 'React.js', percentage: 95, category: 'Frontend' },
    { id: 'springboot', name: 'Java Spring Boot', percentage: 90, category: 'Backend' },
    { id: 'mysql', name: 'MySQL', percentage: 90, category: 'Database' },
    { id: 'java', name: 'Java', percentage: 90, category: 'Language' },
    { id: 'htmlcss', name: 'HTML5 / CSS3', percentage: 95, category: 'Frontend' },
    { id: 'git', name: 'Git & GitHub', percentage: 90, category: 'Tools' }
  ],

  tools: [
    { id: 't1', name: 'VS Code' },
    { id: 't2', name: 'IntelliJ IDEA' },
    { id: 't3', name: 'Postman' },
    { id: 't4', name: 'MySQL Workbench' },
    { id: 't5', name: 'Figma' },
    { id: 't6', name: 'Docker' },
    { id: 't7', name: 'Linux' },
    { id: 't8', name: 'Vercel' }
  ],

  projects: [
    {
      id: 'nexus',
      title: 'Full-Stack Management System',
      description: 'A complete full-stack web application featuring a modern React.js frontend interface, powered by a robust Java Spring Boot backend and structured MySQL database schema with secure JWT authentication.',
      tags: ['React.js', 'Java Spring Boot', 'MySQL'],
      github: 'https://github.com/siddesh/fullstack-spring-react',
      demo: 'https://fullstack-app.demo.app',
      featured: true
    },
    {
      id: 'aura',
      title: 'Aura E-Commerce Engine',
      description: 'A scalable e-commerce application with real-time product search, shopping cart management, and order processing using React.js, Spring Boot REST APIs, and MySQL relational persistence.',
      tags: ['React.js', 'Spring Boot', 'MySQL'],
      github: 'https://github.com/siddesh/aura-ecommerce',
      demo: 'https://aura-ecommerce.demo.app',
      featured: true
    }
  ],

  contactInfo: {
    email: 'siddesh@presidencyuniversity.in',
    phone: '+91 98765 43210',
    location: 'Bengaluru, India',
    github: 'https://github.com/siddesh',
    linkedin: 'https://linkedin.com/in/siddesh',
    twitter: 'https://twitter.com/siddesh_dev'
  },

  resume: {
    fileName: 'Siddesh_Resume.pdf',
    downloadUrl: '#resume',
    buttonText: 'Download CV'
  },

  lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
};

export function PortfolioProvider({ children }) {
  const [portfolio, setPortfolio] = useState(() => {
    const saved = localStorage.getItem('siddesh_portfolio_cms_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn('Error parsing saved portfolio data:', e);
      }
    }
    return initialPortfolioData;
  });

  const [contactSubmissions, setContactSubmissions] = useState(() => {
    const saved = localStorage.getItem('siddesh_contact_submissions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn('Error parsing saved submissions:', e);
      }
    }
    return [
      {
        id: 'sub-1',
        name: 'Anita Sharma',
        email: 'anita@strandvizio.com',
        phone: '+91 91234 56789',
        userStatus: 'employed',
        companyName: 'StrandVizio Consulting',
        role: 'Tech Lead',
        message: 'Hi Siddesh, loved working with you during your internship! Reach out when free.',
        submittedAt: '2026-08-25 14:30'
      }
    ];
  });

  // Attempt to fetch fresh data from MySQL Spring Boot API on initial mount
  useEffect(() => {
    async function loadFromBackend() {
      try {
        const backendData = await portfolioApi.getPortfolio();
        if (backendData && Object.keys(backendData).length > 0) {
          const merged = { ...initialPortfolioData };
          Object.keys(backendData).forEach(key => {
            try {
              merged[key] = typeof backendData[key] === 'string' ? JSON.parse(backendData[key]) : backendData[key];
            } catch (err) {
              merged[key] = backendData[key];
            }
          });
          setPortfolio(merged);
          localStorage.setItem('siddesh_portfolio_cms_data', JSON.stringify(merged));
        }
      } catch (err) {
        console.info('Using local persistent storage baseline.');
      }
    }
    loadFromBackend();
  }, []);

  // Save to localStorage & sync with MySQL API safely whenever CMS state changes
  useEffect(() => {
    try {
      localStorage.setItem('siddesh_portfolio_cms_data', JSON.stringify(portfolio));
    } catch (err) {
      console.warn('LocalStorage quota limit reached for CMS data. Trimming profile image payload to preserve text content.', err);
      // Quota Fallback: Save without oversized profileImage string if storage quota exceeded
      try {
        const safePortfolio = {
          ...portfolio,
          hero: {
            ...portfolio.hero,
            profileImage: portfolio.hero.profileImage && portfolio.hero.profileImage.length > 500000 ? '' : portfolio.hero.profileImage
          }
        };
        localStorage.setItem('siddesh_portfolio_cms_data', JSON.stringify(safePortfolio));
      } catch (e) {
        console.error('Failed to write to localStorage:', e);
      }
    }
  }, [portfolio]);

  useEffect(() => {
    try {
      localStorage.setItem('siddesh_contact_submissions', JSON.stringify(contactSubmissions));
    } catch (err) {
      console.warn('LocalStorage quota limit reached for submissions:', err);
    }
  }, [contactSubmissions]);

  // Real-time synchronization across windows/tabs & instant local updates
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'siddesh_portfolio_cms_data' && e.newValue) {
        try {
          setPortfolio(JSON.parse(e.newValue));
        } catch (err) {
          console.warn('Failed to parse updated portfolio storage:', err);
        }
      }
      if (e.key === 'siddesh_contact_submissions' && e.newValue) {
        try {
          setContactSubmissions(JSON.parse(e.newValue));
        } catch (err) {
          console.warn('Failed to parse updated submissions storage:', err);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Helper to sync section directly to backend MySQL Database
  const syncSectionToBackend = (sectionKey, sectionData) => {
    portfolioApi.updateSection(sectionKey, sectionData).catch(err => {
      console.warn(`Failed to push ${sectionKey} to backend database:`, err);
    });
  };

  // CMS Content Mutator Functions
  const updateSection = (sectionKey, data) => {
    setPortfolio(prev => {
      const updated = {
        ...prev,
        [sectionKey]: data,
        lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      syncSectionToBackend(sectionKey, data);
      return updated;
    });
  };

  const addProject = (newProject) => {
    const projectWithId = { ...newProject, id: `proj-${Date.now()}` };
    setPortfolio(prev => {
      const updatedProjects = [projectWithId, ...prev.projects];
      const updated = {
        ...prev,
        projects: updatedProjects,
        lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      syncSectionToBackend('projects', updatedProjects);
      return updated;
    });
  };

  const updateProject = (id, updatedProject) => {
    setPortfolio(prev => {
      const updatedProjects = prev.projects.map(p => (p.id === id ? { ...updatedProject, id } : p));
      const updated = {
        ...prev,
        projects: updatedProjects,
        lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      syncSectionToBackend('projects', updatedProjects);
      return updated;
    });
  };

  const deleteProject = (id) => {
    setPortfolio(prev => {
      const updatedProjects = prev.projects.filter(p => p.id !== id);
      const updated = {
        ...prev,
        projects: updatedProjects,
        lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      syncSectionToBackend('projects', updatedProjects);
      return updated;
    });
  };

  const addSkill = (newSkill) => {
    const skillWithId = { ...newSkill, id: `skill-${Date.now()}` };
    setPortfolio(prev => {
      const updatedSkills = [...prev.skills, skillWithId];
      const updated = {
        ...prev,
        skills: updatedSkills,
        lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      syncSectionToBackend('skills', updatedSkills);
      return updated;
    });
  };

  const updateSkill = (id, updatedSkill) => {
    setPortfolio(prev => {
      const updatedSkills = prev.skills.map(s => (s.id === id ? { ...updatedSkill, id } : s));
      const updated = {
        ...prev,
        skills: updatedSkills,
        lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      syncSectionToBackend('skills', updatedSkills);
      return updated;
    });
  };

  const deleteSkill = (id) => {
    setPortfolio(prev => {
      const updatedSkills = prev.skills.filter(s => s.id !== id);
      const updated = {
        ...prev,
        skills: updatedSkills,
        lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      syncSectionToBackend('skills', updatedSkills);
      return updated;
    });
  };

  const addExperience = (newExp) => {
    const expWithId = { ...newExp, id: `exp-${Date.now()}` };
    setPortfolio(prev => {
      const updatedExp = [expWithId, ...prev.experience];
      const updated = {
        ...prev,
        experience: updatedExp,
        lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      syncSectionToBackend('experience', updatedExp);
      return updated;
    });
  };

  const updateExperience = (id, updatedExp) => {
    setPortfolio(prev => {
      const updatedExpList = prev.experience.map(e => (e.id === id ? { ...updatedExp, id } : e));
      const updated = {
        ...prev,
        experience: updatedExpList,
        lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      syncSectionToBackend('experience', updatedExpList);
      return updated;
    });
  };

  const updateEducation = (updatedEdu) => {
    setPortfolio(prev => {
      const updated = {
        ...prev,
        education: updatedEdu,
        lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      syncSectionToBackend('education', updatedEdu);
      return updated;
    });
  };

  const deleteExperience = (id) => {
    setPortfolio(prev => {
      const updatedExpList = prev.experience.filter(e => e.id !== id);
      const updated = {
        ...prev,
        experience: updatedExpList,
        lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      syncSectionToBackend('experience', updatedExpList);
      return updated;
    });
  };

  const addTool = (toolName) => {
    if (!toolName || !toolName.trim()) return;
    const newTool = { id: `t-${Date.now()}`, name: toolName.trim() };
    setPortfolio(prev => {
      const updatedTools = [...(prev.tools || []), newTool];
      const updated = {
        ...prev,
        tools: updatedTools,
        lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      syncSectionToBackend('tools', updatedTools);
      return updated;
    });
  };

  const updateTool = (id, newName) => {
    setPortfolio(prev => {
      const updatedTools = (prev.tools || []).map(t => (t.id === id ? { ...t, name: newName } : t));
      const updated = {
        ...prev,
        tools: updatedTools,
        lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      syncSectionToBackend('tools', updatedTools);
      return updated;
    });
  };

  const deleteTool = (id) => {
    setPortfolio(prev => {
      const updatedTools = (prev.tools || []).filter(t => t.id !== id);
      const updated = {
        ...prev,
        tools: updatedTools,
        lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      syncSectionToBackend('tools', updatedTools);
      return updated;
    });
  };

  const updateToolsList = (toolsArray) => {
    setPortfolio(prev => {
      const updated = {
        ...prev,
        tools: toolsArray,
        lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      syncSectionToBackend('tools', toolsArray);
      return updated;
    });
  };

  const addContactSubmission = (submission) => {
    const newSub = {
      ...submission,
      id: `sub-${Date.now()}`,
      submittedAt: new Date().toLocaleString()
    };
    setContactSubmissions(prev => [newSub, ...prev]);
  };

  const deleteContactSubmission = (id) => {
    setContactSubmissions(prev => prev.filter(s => s.id !== id));
  };

  const resetToDefault = () => {
    setPortfolio(initialPortfolioData);
    localStorage.removeItem('siddesh_portfolio_cms_data');
  };

  return (
    <PortfolioContext.Provider value={{
      portfolio,
      updateSection,
      updateEducation,
      addProject,
      updateProject,
      deleteProject,
      addSkill,
      updateSkill,
      deleteSkill,
      addTool,
      updateTool,
      deleteTool,
      updateToolsList,
      addExperience,
      updateExperience,
      deleteExperience,
      contactSubmissions,
      addContactSubmission,
      deleteContactSubmission,
      resetToDefault
    }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}
