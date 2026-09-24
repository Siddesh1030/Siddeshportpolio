import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  LayoutDashboard,
  Home,
  User,
  Wrench,
  FolderGit2,
  Briefcase,
  GraduationCap,
  BarChart3,
  Mail,
  FileText,
  Settings,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  CheckCircle2,
  Clock,
  Sparkles,
  Inbox,
  Upload,
  Image
} from 'lucide-react';

export default function AdminDashboard({ onLogout, onNavigateToPublic }) {
  const {
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
    addExperience,
    updateExperience,
    deleteExperience,
    contactSubmissions,
    deleteContactSubmission,
    resetToDefault
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [saveToast, setSaveToast] = useState('');

  // Inbox Unread Count Tracker
  const [lastSeenCount, setLastSeenCount] = useState(() => {
    return parseInt(localStorage.getItem('siddesh_admin_last_seen_inbox') || '0', 10);
  });

  useEffect(() => {
    if (activeTab === 'submissions') {
      setLastSeenCount(contactSubmissions.length);
      localStorage.setItem('siddesh_admin_last_seen_inbox', String(contactSubmissions.length));
    }
  }, [activeTab, contactSubmissions.length]);

  useEffect(() => {
    if (lastSeenCount > contactSubmissions.length) {
      setLastSeenCount(contactSubmissions.length);
      localStorage.setItem('siddesh_admin_last_seen_inbox', String(contactSubmissions.length));
    }
  }, [contactSubmissions.length, lastSeenCount]);

  const unreadCount = Math.max(0, contactSubmissions.length - lastSeenCount);

  // Local Form States for editing
  const [heroForm, setHeroForm] = useState(() => portfolio?.hero || {});
  const [aboutForm, setAboutForm] = useState(() => portfolio?.about || {});
  const [contactInfoForm, setContactInfoForm] = useState(() => portfolio?.contactInfo || {});
  const [resumeForm, setResumeForm] = useState(() => portfolio?.resume || {});
  const [statsForm, setStatsForm] = useState(() => portfolio?.stats || []);
  const [newToolName, setNewToolName] = useState('');
  const [editingTool, setEditingTool] = useState(null); // { id, name } or null

  // Modals / Item Adding states
  const [editingProject, setEditingProject] = useState(null); // project object or 'new'
  const [projectInput, setProjectInput] = useState({
    title: '',
    description: '',
    image: '',
    tagsStr: '',
    github: '',
    demo: '',
    featured: true
  });

  const [editingSkill, setEditingSkill] = useState(null); // skill object or 'new'
  const [skillInput, setSkillInput] = useState({
    name: '',
    percentage: 90,
    category: 'Backend'
  });

  const [editingExp, setEditingExp] = useState(null); // exp object, 'new', or null
  const [expInput, setExpInput] = useState({
    role: '',
    company: '',
    period: '',
    description: '',
    tagsStr: ''
  });

  // Automatic Image Compression Utility (Resizes large images & optimizes base64 to avoid localStorage quota crashes)
  const compressImage = (file, maxWidth = 800, maxHeight = 600, quality = 0.75) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(dataUrl);
        };
        img.onerror = () => resolve(e.target.result);
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  // File Upload Handlers
  const handleResumeFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setResumeForm(prev => ({
        ...prev,
        fileName: file.name,
        downloadUrl: event.target.result
      }));
      showNotification(`📄 Resume file "${file.name}" uploaded successfully! Click Save to apply.`);
    };
    reader.readAsDataURL(file);
  };

  const handleHeroPhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const compressedUrl = await compressImage(file);
    setHeroForm(prev => ({
      ...prev,
      profileImage: compressedUrl
    }));
    showNotification('📷 Profile photo uploaded & optimized! Click Save to apply.');
  };

  const handleProjectImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const compressedUrl = await compressImage(file);
    setProjectInput(prev => ({
      ...prev,
      image: compressedUrl
    }));
    showNotification('🖼️ Project image uploaded & optimized!');
  };

  const [educationForm, setEducationForm] = useState(() => ({
    degree: portfolio.education?.degree || 'B.Tech – Computer Science & Engineering',
    university: portfolio.education?.university || 'Presidency University, Bengaluru',
    duration: portfolio.education?.duration || '2024 – 2028',
    currentStatus: portfolio.education?.currentStatus || 'Currently in 3rd Year',
    tenthPercentage: portfolio.education?.tenthPercentage || '78.88%',
    twelfthPercentage: portfolio.education?.twelfthPercentage || '90.83%',
    cgpa: portfolio.education?.cgpa || '7.79',
    subjectsStr: portfolio.education?.subjects ? portfolio.education.subjects.join(', ') : 'Data Structures, Object-Oriented Programming, Database Management, Machine Learning, Data Analytics, Cryptography, Blockchain, Theory of Computation, Unix & Shell Programming',
    technicalSkillsStr: portfolio.education?.technicalSkills ? portfolio.education.technicalSkills.join(', ') : 'Java, Python, React.js, Spring Boot, MySQL, Git'
  }));

  const showNotification = (msg) => {
    setSaveToast(msg || '✅ Changes saved successfully! Your live portfolio has been updated.');
    setTimeout(() => setSaveToast(''), 3500);
  };

  // Handlers
  const handleSaveHero = (e) => {
    e.preventDefault();
    updateSection('hero', heroForm);
    showNotification('✅ Hero & Home changes saved successfully! Portfolio updated live.');
  };

  const handleSaveAbout = (e) => {
    e.preventDefault();
    updateSection('about', aboutForm);
    showNotification('✅ About Me section saved successfully! Portfolio updated live.');
  };

  const handleSaveEducation = (e) => {
    e.preventDefault();
    const subjects = educationForm.subjectsStr.split(',').map(s => s.trim()).filter(Boolean);
    const technicalSkills = educationForm.technicalSkillsStr.split(',').map(t => t.trim()).filter(Boolean);

    const eduData = {
      degree: educationForm.degree,
      university: educationForm.university,
      duration: educationForm.duration,
      currentStatus: educationForm.currentStatus,
      tenthPercentage: educationForm.tenthPercentage,
      twelfthPercentage: educationForm.twelfthPercentage,
      cgpa: educationForm.cgpa,
      subjects,
      technicalSkills
    };

    updateEducation(eduData);
    showNotification('✅ Education details saved successfully! Public /education page updated live.');
  };

  const handleSaveContactInfo = (e) => {
    e.preventDefault();
    updateSection('contactInfo', contactInfoForm);
    showNotification('✅ Contact info saved successfully! Portfolio updated live.');
  };

  const handleSaveResume = (e) => {
    e.preventDefault();
    updateSection('resume', resumeForm);
    showNotification('✅ Resume settings saved successfully! Portfolio updated live.');
  };

  const handleSaveProjectModal = (e) => {
    e.preventDefault();
    const tags = projectInput.tagsStr ? projectInput.tagsStr.split(',').map(t => t.trim()).filter(Boolean) : [];
    const projData = {
      title: projectInput.title,
      description: projectInput.description,
      image: projectInput.image,
      tags,
      github: projectInput.github,
      demo: projectInput.demo,
      featured: projectInput.featured
    };

    if (editingProject === 'new') {
      addProject(projData);
      showNotification('✅ New Project added successfully! Portfolio updated live.');
    } else if (editingProject) {
      updateProject(editingProject.id, projData);
      showNotification('✅ Project changes saved successfully! Portfolio updated live.');
    }
    setEditingProject(null);
  };

  const handleSaveSkillModal = (e) => {
    e.preventDefault();
    const skillData = {
      name: skillInput.name,
      percentage: Number(skillInput.percentage),
      category: skillInput.category
    };

    if (editingSkill === 'new') {
      addSkill(skillData);
      showNotification('✅ New Skill added successfully! Portfolio updated live.');
    } else if (editingSkill) {
      updateSkill(editingSkill.id, skillData);
      showNotification('✅ Skill changes saved successfully! Portfolio updated live.');
    }
    setEditingSkill(null);
  };

  const handleSaveExpModal = (e) => {
    e.preventDefault();
    const tags = expInput.tagsStr ? expInput.tagsStr.split(',').map(t => t.trim()).filter(Boolean) : [];
    const expData = {
      role: expInput.role,
      company: expInput.company,
      period: expInput.period,
      description: expInput.description,
      tags
    };

    if (editingExp === 'new') {
      addExperience(expData);
      showNotification('✅ New Experience entry added successfully! Portfolio updated live.');
    } else if (editingExp) {
      updateExperience(editingExp.id, expData);
      showNotification('✅ Experience entry updated successfully! Portfolio updated live.');
    }
    setEditingExp(null);
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'home', label: 'Home / Hero', icon: Home },
    { id: 'about', label: 'About Section', icon: User },
    { id: 'education', label: 'Education Page', icon: GraduationCap },
    { id: 'skills', label: 'Skills Arsenal', icon: Wrench },
    { id: 'projects', label: 'Featured Projects', icon: FolderGit2 },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'contact', label: 'Contact Info', icon: Mail },
    { id: 'submissions', label: 'Inquiries Inbox', icon: Inbox, count: unreadCount },
    { id: 'resume', label: 'Resume CV', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="admin-cms-wrapper">
      
      {/* Toast Save Notification */}
      {saveToast && (
        <div className="admin-toast-notification">
          <CheckCircle2 size={18} style={{ color: '#10b981' }} />
          <span>{saveToast}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="admin-sidebar">
        
        {/* Navigation Links */}
        <nav className="admin-nav-list">
          {menuItems.map((item) => {
            const IconComp = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`admin-nav-item ${isActive ? 'active' : ''}`}
              >
                <IconComp size={18} />
                <span>{item.label}</span>
                {item.count !== undefined && item.count > 0 && (
                  <span className="admin-nav-badge">{item.count}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer User Info */}
        <div className="admin-sidebar-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
            <div className="admin-avatar-small">A</div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#166534' }}>Siddesh Admin</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>admin@siddesh.com</div>
            </div>
          </div>

          <button onClick={onLogout} className="admin-btn-logout">
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>

      </aside>

      {/* Main Content Area */}
      <div className="admin-main-container">
        
        {/* Header Bar */}
        <header className="admin-header-bar">
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#166534', textTransform: 'capitalize' }}>
              {activeTab === 'dashboard' ? 'Overview Dashboard' : `${activeTab} Management`}
            </h1>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Last synchronized: <Clock size={12} style={{ display: 'inline', margin: '0 2px' }} /> {portfolio.lastUpdated}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
            <div className="admin-sync-badge">
              <span className="sync-dot"></span>
              <span>LIVE SITE SYNC ON</span>
            </div>

            <button onClick={onNavigateToPublic} className="admin-btn-preview">
              <ExternalLink size={15} />
              <span>Preview Live Portfolio</span>
            </button>
          </div>
        </header>

        {/* SECTION CONTENT SWITCHER */}
        <div className="admin-content-body">
          
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div>
              
              {/* Quick Stat Widgets */}
              <div className="admin-stats-overview-grid">
                
                <div className="admin-stat-card-widget">
                  <div className="stat-widget-header">
                    <FolderGit2 size={24} style={{ color: '#60a5fa' }} />
                    <span className="stat-widget-tag">PORTFOLIO</span>
                  </div>
                  <div className="stat-widget-num">{portfolio.projects.length}</div>
                  <div className="stat-widget-title">Featured Projects</div>
                </div>

                <div className="admin-stat-card-widget">
                  <div className="stat-widget-header">
                    <Wrench size={24} style={{ color: '#c084fc' }} />
                    <span className="stat-widget-tag">SKILLS</span>
                  </div>
                  <div className="stat-widget-num">{portfolio.skills.length}</div>
                  <div className="stat-widget-title">Tech Arsenal Skills</div>
                </div>

                <div className="admin-stat-card-widget">
                  <div className="stat-widget-header">
                    <Briefcase size={24} style={{ color: '#34d399' }} />
                    <span className="stat-widget-tag">CAREER</span>
                  </div>
                  <div className="stat-widget-num">{portfolio.experience.length}</div>
                  <div className="stat-widget-title">Experience Entries</div>
                </div>

                <div className="admin-stat-card-widget">
                  <div className="stat-widget-header">
                    <Inbox size={24} style={{ color: '#fb923c' }} />
                    <span className="stat-widget-tag">INBOX</span>
                  </div>
                  <div className="stat-widget-num">{contactSubmissions.length}</div>
                  <div className="stat-widget-title">Contact Inquiries</div>
                </div>

              </div>

              {/* Quick Action Banner */}
              <div className="admin-panel-card" style={{ marginTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#166534', marginBottom: '0.5rem' }}>
                  👋 Welcome to your Portfolio CMS Dashboard
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                  Use the left sidebar navigation to manage your Hero bio, Skills, Projects, Experiences, Contact info, or review form inquiries submitted by recruiters and visitors. Any change saved here is immediately reflected on your live public website!
                </p>

                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <button onClick={() => setActiveTab('projects')} className="btn-primary" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
                    <Plus size={16} />
                    <span>Manage Projects</span>
                  </button>

                  <button onClick={() => setActiveTab('skills')} className="btn-secondary" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
                    <Wrench size={16} />
                    <span>Manage Skills</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: HOME / HERO */}
          {activeTab === 'home' && (
            <div className="admin-panel-card">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#166534', marginBottom: '1.5rem' }}>
                Hero & Home Section Configuration
              </h3>

              <form onSubmit={handleSaveHero}>
                
                {/* Profile Photo Manager (Upload, Edit, Delete) */}
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid #bbf7d0', borderRadius: '16px', padding: '1.2rem', marginBottom: '1.5rem' }}>
                  <label className="form-label" style={{ color: '#16a34a', fontWeight: 700, marginBottom: '0.8rem' }}>
                    📸 Developer Profile Photo / Avatar Manager
                  </label>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.4rem', flexWrap: 'wrap' }}>
                    {heroForm.profileImage ? (
                      <img
                        src={heroForm.profileImage}
                        alt="Profile"
                        style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #22c55e', boxShadow: '0 0 15px rgba(34, 197, 94, 0.4)' }}
                      />
                    ) : (
                      <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.2)', border: '2px dashed rgba(34, 197, 94, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a', fontWeight: 800, fontSize: '1.2rem' }}>
                        SID
                      </div>
                    )}

                    <div style={{ flex: 1, minWidth: '220px', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                        <label className="admin-btn-action-edit" style={{ cursor: 'pointer', padding: '0.5rem 0.9rem' }}>
                          <Upload size={15} />
                          <span>{heroForm.profileImage ? 'Upload New Photo' : 'Upload Profile Photo'}</span>
                          <input type="file" accept="image/*" onChange={handleHeroPhotoUpload} style={{ display: 'none' }} />
                        </label>

                        {heroForm.profileImage && (
                          <button
                            type="button"
                            onClick={() => {
                              setHeroForm(prev => ({ ...prev, profileImage: '' }));
                              showNotification('📷 Profile photo deleted! Reverted to default avatar.');
                            }}
                            className="admin-btn-action-delete"
                            style={{ padding: '0.5rem 0.9rem' }}
                          >
                            <Trash2 size={15} />
                            <span>Delete Photo</span>
                          </button>
                        )}
                      </div>

                      <input
                        type="text"
                        placeholder="Or paste direct image URL (https://...)"
                        className="form-input admin-input-light"
                        style={{ fontSize: '0.82rem' }}
                        value={heroForm.profileImage || ''}
                        onChange={(e) => setHeroForm({ ...heroForm, profileImage: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ color: '#cbd5e1', fontWeight: 700 }}>Developer Full Name</label>
                    <input
                      type="text"
                      className="form-input admin-input-light"
                      value={heroForm.name}
                      onChange={(e) => setHeroForm({ ...heroForm, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: '#cbd5e1', fontWeight: 700 }}>Headline / Profile Sub-Title</label>
                    <input
                      type="text"
                      className="form-input admin-input-light"
                      value={heroForm.title}
                      onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                    />
                  </div>
                </div>

                {/* Hero Title Editor (Line 1, Gradient Glow Line, Line 2 Suffix) */}
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid #bbf7d0', borderRadius: '16px', padding: '1.2rem', marginBottom: '1.2rem' }}>
                  <label className="form-label" style={{ color: '#16a34a', fontWeight: 700, marginBottom: '0.8rem' }}>
                    ⚡ Main Hero Title Lines Editor (SIDDESH: Crafting the Future of the Web.)
                  </label>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" style={{ color: '#cbd5e1', fontWeight: 700 }}>Line 1 (White Text)</label>
                      <input
                        type="text"
                        placeholder="Crafting the"
                        className="form-input admin-input-light"
                        value={heroForm.heroTitlePrefix || ''}
                        onChange={(e) => setHeroForm({ ...heroForm, heroTitlePrefix: e.target.value })}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" style={{ color: '#16a34a', fontWeight: 700 }}>Gradient Glowing Text</label>
                      <input
                        type="text"
                        placeholder="Future of the"
                        className="form-input admin-input-light"
                        value={heroForm.heroTitleGradient || ''}
                        onChange={(e) => setHeroForm({ ...heroForm, heroTitleGradient: e.target.value })}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" style={{ color: '#cbd5e1', fontWeight: 700 }}>Line 2 Suffix (White Text)</label>
                      <input
                        type="text"
                        placeholder="Web."
                        className="form-input admin-input-light"
                        value={heroForm.heroTitleSuffix || ''}
                        onChange={(e) => setHeroForm({ ...heroForm, heroTitleSuffix: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: '#475569', fontWeight: 700 }}>Status Badge Text</label>
                  <input
                    type="text"
                    className="form-input admin-input-light"
                    value={heroForm.badgeText}
                    onChange={(e) => setHeroForm({ ...heroForm, badgeText: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: '#475569', fontWeight: 700 }}>Hero Subtitle Description</label>
                  <textarea
                    rows="3"
                    className="form-textarea admin-input-light"
                    value={heroForm.subtitle}
                    onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                  ></textarea>
                </div>

                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.2rem', marginTop: '1.2rem' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>
                    💻 IDE Code Editor Window (Siddesh.java Snippet)
                  </h4>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label" style={{ color: '#475569', fontWeight: 700 }}>Mindset Variable</label>
                      <input
                        type="text"
                        className="form-input admin-input-light"
                        value={heroForm.mindset}
                        onChange={(e) => setHeroForm({ ...heroForm, mindset: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" style={{ color: '#475569', fontWeight: 700 }}>Journey Message</label>
                      <input
                        type="text"
                        className="form-input admin-input-light"
                        value={heroForm.journeyMsg}
                        onChange={(e) => setHeroForm({ ...heroForm, journeyMsg: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
                  <Save size={16} />
                  <span>Save Hero Changes</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: ABOUT SECTION */}
          {activeTab === 'about' && (
            <div className="admin-panel-card">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>
                About Me Section Configuration
              </h3>

              <form onSubmit={handleSaveAbout}>
                <div className="form-group">
                  <label className="form-label" style={{ color: '#475569', fontWeight: 700 }}>Section Heading</label>
                  <input
                    type="text"
                    className="form-input admin-input-light"
                    value={aboutForm.heading}
                    onChange={(e) => setAboutForm({ ...aboutForm, heading: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: '#475569', fontWeight: 700 }}>Bio Paragraph 1 (Education & Background)</label>
                  <textarea
                    rows="3"
                    className="form-textarea admin-input-light"
                    value={aboutForm.bioLine1}
                    onChange={(e) => setAboutForm({ ...aboutForm, bioLine1: e.target.value })}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: '#475569', fontWeight: 700 }}>Bio Paragraph 2 (Skills & Passion)</label>
                  <textarea
                    rows="3"
                    className="form-textarea admin-input-light"
                    value={aboutForm.bioLine2}
                    onChange={(e) => setAboutForm({ ...aboutForm, bioLine2: e.target.value })}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: '#475569', fontWeight: 700 }}>Internship Callout Box (StrandVizio Highlight)</label>
                  <textarea
                    rows="2"
                    className="form-textarea admin-input-light"
                    value={aboutForm.internshipHighlight}
                    onChange={(e) => setAboutForm({ ...aboutForm, internshipHighlight: e.target.value })}
                  ></textarea>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ color: '#475569', fontWeight: 700 }}>Personal Quote</label>
                    <input
                      type="text"
                      className="form-input admin-input-light"
                      value={aboutForm.quote}
                      onChange={(e) => setAboutForm({ ...aboutForm, quote: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: '#475569', fontWeight: 700 }}>Quote Author</label>
                    <input
                      type="text"
                      className="form-input admin-input-light"
                      value={aboutForm.quoteAuthor}
                      onChange={(e) => setAboutForm({ ...aboutForm, quoteAuthor: e.target.value })}
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
                  <Save size={16} />
                  <span>Save About Changes</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB: EDUCATION MANAGEMENT */}
          {activeTab === 'education' && (
            <div className="admin-panel-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#166534' }}>
                    Education Page Management (/education)
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: '#cbd5e1', marginTop: '2px' }}>
                    Edit your degree, university, academic performance percentages, core CS subjects, and technical skills.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigateToPublic('/education')}
                  className="btn-secondary"
                  style={{ fontSize: '0.82rem', padding: '0.45rem 0.9rem' }}
                >
                  <ExternalLink size={15} />
                  <span>Preview /education Page</span>
                </button>
              </div>

              <form onSubmit={handleSaveEducation}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ color: '#cbd5e1', fontWeight: 700 }}>Degree / Program Name</label>
                    <input
                      type="text"
                      className="form-input admin-input-light"
                      value={educationForm.degree}
                      onChange={(e) => setEducationForm({ ...educationForm, degree: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: '#cbd5e1', fontWeight: 700 }}>University & Campus</label>
                    <input
                      type="text"
                      className="form-input admin-input-light"
                      value={educationForm.university}
                      onChange={(e) => setEducationForm({ ...educationForm, university: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ color: '#cbd5e1', fontWeight: 700 }}>Course Duration</label>
                    <input
                      type="text"
                      placeholder="2024 – 2028"
                      className="form-input admin-input-light"
                      value={educationForm.duration}
                      onChange={(e) => setEducationForm({ ...educationForm, duration: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: '#cbd5e1', fontWeight: 700 }}>Current Academic Status</label>
                    <input
                      type="text"
                      placeholder="Currently in 3rd Year"
                      className="form-input admin-input-light"
                      value={educationForm.currentStatus}
                      onChange={(e) => setEducationForm({ ...educationForm, currentStatus: e.target.value })}
                    />
                  </div>
                </div>

                {/* Academic Scores Grid */}
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid #bbf7d0', borderRadius: '16px', padding: '1.2rem', marginBottom: '1.2rem' }}>
                  <label className="form-label" style={{ color: '#16a34a', fontWeight: 700, marginBottom: '0.8rem' }}>
                    🎓 Academic Performance Marks & CGPA
                  </label>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" style={{ color: '#cbd5e1', fontWeight: 700 }}>10th Standard %</label>
                      <input
                        type="text"
                        placeholder="78.88%"
                        className="form-input admin-input-light"
                        value={educationForm.tenthPercentage}
                        onChange={(e) => setEducationForm({ ...educationForm, tenthPercentage: e.target.value })}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" style={{ color: '#cbd5e1', fontWeight: 700 }}>12th / 2nd PU %</label>
                      <input
                        type="text"
                        placeholder="90.83%"
                        className="form-input admin-input-light"
                        value={educationForm.twelfthPercentage}
                        onChange={(e) => setEducationForm({ ...educationForm, twelfthPercentage: e.target.value })}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" style={{ color: '#16a34a', fontWeight: 700 }}>Current CGPA (Out of 10)</label>
                      <input
                        type="text"
                        placeholder="7.79"
                        className="form-input admin-input-light"
                        value={educationForm.cgpa}
                        onChange={(e) => setEducationForm({ ...educationForm, cgpa: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: '#cbd5e1', fontWeight: 700 }}>
                    Relevant Computer Science Subjects (Comma Separated)
                  </label>
                  <textarea
                    rows="3"
                    className="form-textarea admin-input-light"
                    placeholder="Data Structures, Object-Oriented Programming, Database Management, Machine Learning..."
                    value={educationForm.subjectsStr}
                    onChange={(e) => setEducationForm({ ...educationForm, subjectsStr: e.target.value })}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: '#cbd5e1', fontWeight: 700 }}>
                    Technical Skills Summary (Comma Separated)
                  </label>
                  <input
                    type="text"
                    className="form-input admin-input-light"
                    placeholder="Java, Python, React.js, Spring Boot, MySQL, Git"
                    value={educationForm.technicalSkillsStr}
                    onChange={(e) => setEducationForm({ ...educationForm, technicalSkillsStr: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
                  <Save size={16} />
                  <span>Save Education Details</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: SKILLS */}
          {activeTab === 'skills' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#166534' }}>Skills Management</h3>
                
                <button
                  onClick={() => {
                    setSkillInput({ name: '', percentage: 90, category: 'Backend' });
                    setEditingSkill('new');
                  }}
                  className="btn-primary"
                  style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
                >
                  <Plus size={16} />
                  <span>Add Skill</span>
                </button>
              </div>

              {/* Skills List Table Card */}
              <div className="admin-panel-card" style={{ padding: 0, overflow: 'hidden', background: 'rgba(18, 20, 32, 0.88)' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th style={{ color: '#16a34a' }}>Skill Name</th>
                      <th style={{ color: '#16a34a' }}>Category</th>
                      <th style={{ color: '#16a34a' }}>Proficiency %</th>
                      <th style={{ color: '#16a34a' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portfolio.skills.map((skill) => (
                      <tr key={skill.id}>
                        <td style={{ fontWeight: 700, color: '#166534' }}>{skill.name}</td>
                        <td>
                          <span className="admin-table-chip" style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#16a34a' }}>{skill.category}</span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div className="skill-progress-track" style={{ width: '80px', height: '6px' }}>
                              <div className="skill-progress-fill" style={{ width: `${skill.percentage}%` }}></div>
                            </div>
                            <span style={{ fontWeight: 700, color: '#60a5fa', fontSize: '0.85rem' }}>{skill.percentage}%</span>
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                              onClick={() => {
                                setSkillInput({ name: skill.name, percentage: skill.percentage, category: skill.category });
                                setEditingSkill(skill);
                              }}
                              className="admin-btn-action-edit"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button onClick={() => deleteSkill(skill.id)} className="admin-btn-action-delete">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Tools & Platforms I Use Management Card */}
              <div className="admin-panel-card" style={{ marginTop: '2rem', background: 'rgba(18, 20, 32, 0.88)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#166534', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Wrench size={20} style={{ color: '#38bdf8' }} />
                      <span>Tools & Platforms I Use</span>
                    </h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '0.2rem' }}>
                      Add, edit, or delete development tools, IDEs, and deployment platforms displayed on your website.
                    </p>
                  </div>
                </div>

                {/* Add New Tool Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newToolName.trim()) return;
                    addTool(newToolName.trim());
                    setNewToolName('');
                    showNotification('🛠️ New tool added successfully!');
                  }}
                  style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.5rem' }}
                >
                  <input
                    type="text"
                    placeholder="Enter tool name (e.g. Docker, Postman, VS Code, Figma, Linux...)"
                    className="form-input admin-input-light"
                    value={newToolName}
                    onChange={(e) => setNewToolName(e.target.value)}
                    style={{ flex: 1 }}
                  />
                  <button type="submit" className="btn-primary" style={{ padding: '0.6rem 1.3rem', whiteSpace: 'nowrap' }}>
                    <Plus size={16} />
                    <span>Add Tool</span>
                  </button>
                </form>

                {/* Tools Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: '1rem' }}>
                  {Array.isArray(portfolio.tools) && portfolio.tools.map((t, idx) => {
                    const toolObj = typeof t === 'string' ? { id: `tool-${idx}`, name: t } : t;
                    const isEditing = editingTool && editingTool.id === toolObj.id;

                    return (
                      <div
                        key={toolObj.id || idx}
                        style={{
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid #bbf7d0',
                          borderRadius: '14px',
                          padding: '0.8rem 1rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '0.6rem'
                        }}
                      >
                        {isEditing ? (
                          <div style={{ display: 'flex', gap: '0.4rem', width: '100%' }}>
                            <input
                              type="text"
                              className="form-input admin-input-light"
                              value={editingTool.name}
                              onChange={(e) => setEditingTool({ ...editingTool, name: e.target.value })}
                              style={{ padding: '0.3rem 0.6rem', fontSize: '0.85rem' }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                updateTool(editingTool.id, editingTool.name);
                                setEditingTool(null);
                                showNotification('✏️ Tool updated successfully!');
                              }}
                              className="admin-btn-action-edit"
                              style={{ padding: '0.3rem 0.6rem' }}
                            >
                              <Save size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingTool(null)}
                              className="admin-btn-action-delete"
                              style={{ padding: '0.3rem 0.6rem' }}
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <>
                            <span style={{ fontWeight: 700, color: '#166534', fontSize: '0.9rem' }}>
                              {toolObj.name}
                            </span>
                            <div style={{ display: 'flex', gap: '0.3rem', flexShrink: 0 }}>
                              <button
                                type="button"
                                onClick={() => setEditingTool({ id: toolObj.id, name: toolObj.name })}
                                className="admin-btn-action-edit"
                                style={{ padding: '0.3rem 0.5rem' }}
                              >
                                <Edit3 size={13} />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  deleteTool(toolObj.id);
                                  showNotification('🗑️ Tool deleted!');
                                }}
                                className="admin-btn-action-delete"
                                style={{ padding: '0.3rem 0.5rem' }}
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PROJECTS */}
          {activeTab === 'projects' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>Featured Projects Management</h3>
                
                <button
                  onClick={() => {
                    setProjectInput({ title: '', description: '', image: '', tagsStr: '', github: '', demo: '', featured: true });
                    setEditingProject('new');
                  }}
                  className="btn-primary"
                  style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
                >
                  <Plus size={16} />
                  <span>Add Project</span>
                </button>
              </div>

              {/* Projects Grid Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {portfolio.projects.map((proj) => (
                  <div key={proj.id} className="admin-panel-card" style={{ display: 'flex', flexDirection: 'column' }}>
                    
                    {/* Optional Thumbnail Image */}
                    {proj.image && (
                      <div style={{ height: '140px', width: '100%', marginBottom: '1rem', borderRadius: '12px', overflow: 'hidden' }}>
                        <img src={proj.image} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#166534' }}>{proj.title}</h4>
                      <span className="admin-table-chip" style={{ background: proj.featured ? 'rgba(52, 211, 153, 0.15)' : 'rgba(255,255,255,0.06)', color: proj.featured ? '#34d399' : 'var(--text-secondary)' }}>
                        {proj.featured ? 'Featured' : 'Standard'}
                      </span>
                    </div>

                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '1.2rem', flexGrow: 1 }}>
                      {proj.description}
                    </p>

                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
                      {proj.tags.map((t, i) => (
                        <span key={i} style={{ background: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.3)', color: '#16a34a', fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>
                          {t}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.8rem', borderTop: '1px solid #bbf7d0' }}>
                      <div style={{ fontSize: '0.78rem', color: '#60a5fa' }}>
                        Demo & Repo Configured
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => {
                            setProjectInput({
                              title: proj.title,
                              description: proj.description,
                              image: proj.image || '',
                              tagsStr: proj.tags.join(', '),
                              github: proj.github,
                              demo: proj.demo,
                              featured: proj.featured
                            });
                            setEditingProject(proj);
                          }}
                          className="admin-btn-action-edit"
                        >
                          <Edit3 size={14} />
                          <span>Edit</span>
                        </button>
                        
                        <button onClick={() => deleteProject(proj.id)} className="admin-btn-action-delete">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: EXPERIENCE */}
          {activeTab === 'experience' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#166534' }}>Work & Internship Experience</h3>
                
                <button
                  onClick={() => {
                    setExpInput({ role: '', company: '', period: '', description: '', tagsStr: '' });
                    setEditingExp('new');
                  }}
                  className="btn-primary"
                  style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
                >
                  <Plus size={16} />
                  <span>Add Experience</span>
                </button>
              </div>

              {portfolio.experience.map((exp) => (
                <div key={exp.id} className="admin-panel-card" style={{ marginBottom: '1.2rem', background: 'rgba(18, 20, 32, 0.88)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#166534' }}>{exp.role}</h4>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#60a5fa', margin: '2px 0 6px 0' }}>{exp.company}</div>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>{exp.period}</div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => {
                          setExpInput({
                            role: exp.role,
                            company: exp.company,
                            period: exp.period,
                            description: exp.description,
                            tagsStr: (exp.tags || []).join(', ')
                          });
                          setEditingExp(exp);
                        }}
                        className="admin-btn-action-edit"
                      >
                        <Edit3 size={14} />
                        <span>Edit</span>
                      </button>

                      <button onClick={() => deleteExperience(exp.id)} className="admin-btn-action-delete">
                        <Trash2 size={14} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>

                  <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginTop: '0.8rem', lineHeight: 1.6 }}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          )}



          {/* TAB 8: CONTACT INFO */}
          {activeTab === 'contact' && (
            <div className="admin-panel-card">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>
                Contact Details & Social Links
              </h3>

              <form onSubmit={handleSaveContactInfo}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ color: '#475569', fontWeight: 700 }}>Email Address</label>
                    <input
                      type="email"
                      className="form-input admin-input-light"
                      value={contactInfoForm.email}
                      onChange={(e) => setContactInfoForm({ ...contactInfoForm, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: '#475569', fontWeight: 700 }}>Phone Number</label>
                    <input
                      type="text"
                      className="form-input admin-input-light"
                      value={contactInfoForm.phone}
                      onChange={(e) => setContactInfoForm({ ...contactInfoForm, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: '#475569', fontWeight: 700 }}>GitHub Profile URL</label>
                    <input
                      type="text"
                      className="form-input admin-input-light"
                      value={contactInfoForm.github}
                      onChange={(e) => setContactInfoForm({ ...contactInfoForm, github: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: '#475569', fontWeight: 700 }}>LinkedIn Profile URL</label>
                    <input
                      type="text"
                      className="form-input admin-input-light"
                      value={contactInfoForm.linkedin}
                      onChange={(e) => setContactInfoForm({ ...contactInfoForm, linkedin: e.target.value })}
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
                  <Save size={16} />
                  <span>Save Contact Details</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 9: SUBMISSIONS INBOX */}
          {activeTab === 'submissions' && (
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#166534', marginBottom: '1.2rem' }}>
                Contact Form Submissions Received ({contactSubmissions.length})
              </h3>

              {contactSubmissions.length === 0 ? (
                <div className="admin-panel-card" style={{ textAlign: 'center', padding: '3rem', background: 'rgba(18, 20, 32, 0.88)' }}>
                  <Inbox size={42} style={{ color: '#16a34a', margin: '0 auto 0.8rem auto' }} />
                  <div style={{ fontWeight: 700, color: '#166534' }}>No Contact Messages Yet</div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Submissions from public visitors will show up here.</p>
                </div>
              ) : (
                contactSubmissions.map((sub) => (
                  <div key={sub.id} className="admin-panel-card" style={{ marginBottom: '1.2rem', background: 'rgba(18, 20, 32, 0.88)', border: '1px solid rgba(34, 197, 94, 0.25)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                      <div>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#166534' }}>{sub.name}</h4>
                        <div style={{ fontSize: '0.86rem', color: '#60a5fa', fontWeight: 600, marginTop: '2px' }}>
                          📧 {sub.email} • 📞 {sub.phone || 'N/A'}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{sub.submittedAt}</span>
                        <button onClick={() => deleteContactSubmission(sub.id)} className="admin-btn-action-delete" title="Delete Submission">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>

                    {/* Detailed Data Box with Conditional Fields */}
                    <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid #bbf7d0', borderRadius: '14px', padding: '1rem 1.2rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
                        <span className="admin-table-chip" style={{ background: 'rgba(34, 197, 94, 0.25)', color: '#16a34a', fontWeight: 800, fontSize: '0.78rem' }}>
                          STATUS: {(sub.userStatus || 'student').toUpperCase()}
                        </span>
                      </div>

                      {/* Display All Collected User Data */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '0.6rem', fontSize: '0.86rem', color: '#cbd5e1', marginBottom: '0.8rem' }}>
                        {sub.collegeName && (
                          <div>🏫 <strong>College:</strong> <span style={{ color: '#166534' }}>{sub.collegeName}</span></div>
                        )}
                        {sub.branch && (
                          <div>🎓 <strong>Branch:</strong> <span style={{ color: '#166534' }}>{sub.branch}</span></div>
                        )}
                        {sub.currentSemester && (
                          <div>📚 <strong>Semester:</strong> <span style={{ color: '#166534' }}>{sub.currentSemester}</span></div>
                        )}

                        {String(sub.userStatus).toLowerCase() !== 'student' && sub.companyName && (
                          <div>🏢 <strong>Company:</strong> <span style={{ color: '#166534' }}>{sub.companyName}</span></div>
                        )}
                        {String(sub.userStatus).toLowerCase() !== 'student' && sub.role && (
                          <div>💼 <strong>Role:</strong> <span style={{ color: '#166534' }}>{sub.role}</span></div>
                        )}
                        {String(sub.userStatus).toLowerCase() !== 'student' && sub.experience && (
                          <div>⏳ <strong>Experience:</strong> <span style={{ color: '#166534' }}>{sub.experience}</span></div>
                        )}

                        {sub.graduatedYear && (
                          <div>🎓 <strong>Graduation Year:</strong> <span style={{ color: '#166534' }}>{sub.graduatedYear}</span></div>
                        )}
                      </div>

                      {/* Full Message Body */}
                      <div style={{ borderTop: '1px solid #bbf7d0', paddingTop: '0.65rem', marginTop: '0.65rem', fontSize: '0.9rem', color: '#166534', lineHeight: 1.6 }}>
                        <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '3px' }}>VISITOR MESSAGE:</div>
                        <div>"{sub.message}"</div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 10: RESUME */}
          {activeTab === 'resume' && (
            <div className="admin-panel-card">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#166534', marginBottom: '1.5rem' }}>
                📄 Resume CV Document File Manager & Download Settings
              </h3>

              {/* Resume File Upload Box */}
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px dashed rgba(34, 197, 94, 0.4)', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: 'rgba(34, 197, 94, 0.2)', border: '1px solid rgba(34, 197, 94, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a' }}>
                      <FileText size={26} />
                    </div>
                    <div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#166534' }}>
                        {resumeForm.fileName || 'Siddesh_Resume.pdf'}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: resumeForm.downloadUrl && resumeForm.downloadUrl !== '#resume' ? '#34d399' : '#fb923c', fontWeight: 700, marginTop: '3px' }}>
                        {resumeForm.downloadUrl && resumeForm.downloadUrl !== '#resume' ? '● Custom Resume PDF Active & Ready for Download' : '● Default Document Name Active'}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                    <label className="btn-primary" style={{ padding: '0.65rem 1.2rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                      <Upload size={16} />
                      <span>Upload Resume PDF / File</span>
                      <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeFileUpload} style={{ display: 'none' }} />
                    </label>

                    {resumeForm.downloadUrl && resumeForm.downloadUrl !== '#resume' && (
                      <button
                        type="button"
                        onClick={() => {
                          setResumeForm(prev => ({ ...prev, downloadUrl: '#resume', fileName: 'Siddesh_Resume.pdf' }));
                          showNotification('📄 Uploaded resume file deleted! Reverted to default filename.');
                        }}
                        className="admin-btn-action-delete"
                        style={{ padding: '0.65rem 1rem' }}
                      >
                        <Trash2 size={16} />
                        <span>Delete Uploaded File</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <form onSubmit={handleSaveResume}>
                <div className="form-group">
                  <label className="form-label" style={{ color: '#cbd5e1', fontWeight: 700 }}>Resume File Display Name</label>
                  <input
                    type="text"
                    className="form-input admin-input-light"
                    value={resumeForm.fileName}
                    onChange={(e) => setResumeForm({ ...resumeForm, fileName: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: '#cbd5e1', fontWeight: 700 }}>Download Button Text</label>
                  <input
                    type="text"
                    className="form-input admin-input-light"
                    value={resumeForm.buttonText}
                    onChange={(e) => setResumeForm({ ...resumeForm, buttonText: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
                  <Save size={16} />
                  <span>Save Resume Settings</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 11: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="admin-panel-card">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                System Settings & Data Reset
              </h3>
              
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Restore all portfolio content to default baseline baseline settings.
              </p>

              <button
                onClick={() => {
                  if (window.confirm('Reset all CMS content back to initial baseline?')) {
                    resetToDefault();
                    showNotification('Portfolio content reset to initial default baseline!');
                  }
                }}
                className="admin-btn-action-delete"
                style={{ padding: '0.7rem 1.2rem' }}
              >
                <Trash2 size={16} />
                <span>Reset Content to Initial Baseline</span>
              </button>
            </div>
          )}

        </div>
      </div>

      {/* EDIT/ADD PROJECT MODAL */}
      {editingProject && (
        <div className="modal-overlay" onClick={() => setEditingProject(null)}>
          <div className="modal-content admin-modal-light" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setEditingProject(null)}>
              <X size={18} />
            </button>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.2rem' }}>
              {editingProject === 'new' ? 'Add New Project' : 'Edit Project'}
            </h3>

            <form onSubmit={handleSaveProjectModal}>
              <div className="form-group">
                <label className="form-label">Project Title *</label>
                <input
                  type="text"
                  required
                  className="form-input admin-input-light"
                  value={projectInput.title}
                  onChange={(e) => setProjectInput({ ...projectInput, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description *</label>
                <textarea
                  rows="3"
                  required
                  className="form-textarea admin-input-light"
                  value={projectInput.description}
                  onChange={(e) => setProjectInput({ ...projectInput, description: e.target.value })}
                ></textarea>
              </div>

              {/* Project Image Upload & Delete Manager */}
              <div className="form-group" style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                <label className="form-label" style={{ color: '#16a34a', fontWeight: 700 }}>
                  🖼️ Project Thumbnail Cover Image
                </label>

                {projectInput.image && (
                  <div style={{ position: 'relative', width: '100%', height: '140px', marginBottom: '0.8rem', borderRadius: '10px', overflow: 'hidden', border: '1px solid #bbf7d0' }}>
                    <img src={projectInput.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button
                      type="button"
                      onClick={() => {
                        setProjectInput(prev => ({ ...prev, image: '' }));
                        showNotification('🖼️ Project thumbnail image deleted!');
                      }}
                      className="admin-btn-action-delete"
                      style={{ position: 'absolute', top: '8px', right: '8px', padding: '6px' }}
                      title="Delete Image"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <label className="admin-btn-action-edit" style={{ cursor: 'pointer', padding: '0.5rem 0.9rem' }}>
                    <Upload size={15} />
                    <span>{projectInput.image ? 'Change Image File' : 'Upload Image File'}</span>
                    <input type="file" accept="image/*" onChange={handleProjectImageUpload} style={{ display: 'none' }} />
                  </label>

                  <input
                    type="text"
                    placeholder="Or paste direct image URL (https://...)"
                    className="form-input admin-input-light"
                    style={{ flex: 1, fontSize: '0.82rem' }}
                    value={projectInput.image || ''}
                    onChange={(e) => setProjectInput({ ...projectInput, image: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Technologies / Tags (comma separated)</label>
                <input
                  type="text"
                  placeholder="React, Java, Spring Boot"
                  className="form-input admin-input-light"
                  value={projectInput.tagsStr}
                  onChange={(e) => setProjectInput({ ...projectInput, tagsStr: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">GitHub Repository URL</label>
                <input
                  type="url"
                  className="form-input admin-input-light"
                  value={projectInput.github}
                  onChange={(e) => setProjectInput({ ...projectInput, github: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Live Demo URL</label>
                <input
                  type="url"
                  className="form-input admin-input-light"
                  value={projectInput.demo}
                  onChange={(e) => setProjectInput({ ...projectInput, demo: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setEditingProject(null)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                  Cancel
                </button>

                <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  <Save size={16} />
                  <span>Save Project</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT/ADD SKILL MODAL */}
      {editingSkill && (
        <div className="modal-overlay" onClick={() => setEditingSkill(null)}>
          <div className="modal-content admin-modal-light" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setEditingSkill(null)}>
              <X size={18} />
            </button>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#166534', marginBottom: '1.2rem' }}>
              {editingSkill === 'new' ? 'Add New Skill' : 'Edit Skill'}
            </h3>

            <form onSubmit={handleSaveSkillModal}>
              <div className="form-group">
                <label className="form-label" style={{ color: '#cbd5e1' }}>Skill Name *</label>
                <input
                  type="text"
                  required
                  className="form-input admin-input-light"
                  value={skillInput.name}
                  onChange={(e) => setSkillInput({ ...skillInput, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ color: '#cbd5e1' }}>Category *</label>
                <select
                  className="form-input admin-input-light"
                  value={skillInput.category}
                  onChange={(e) => setSkillInput({ ...skillInput, category: e.target.value })}
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="Tools">Tools</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ color: '#cbd5e1' }}>Proficiency Percentage (0-100)% *</label>
                <input
                  type="number"
                  min="10"
                  max="100"
                  required
                  className="form-input admin-input-light"
                  value={skillInput.percentage}
                  onChange={(e) => setSkillInput({ ...skillInput, percentage: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setEditingSkill(null)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                  Cancel
                </button>

                <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  <Save size={16} />
                  <span>Save Skill</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT/ADD EXPERIENCE MODAL */}
      {editingExp !== null && (
        <div className="modal-overlay" onClick={() => setEditingExp(null)}>
          <div className="modal-content admin-modal-light" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setEditingExp(null)}>
              <X size={18} />
            </button>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#166534', marginBottom: '1.2rem' }}>
              {editingExp === 'new' ? 'Add Experience Entry' : 'Edit Experience Entry'}
            </h3>

            <form onSubmit={handleSaveExpModal}>
              <div className="form-group">
                <label className="form-label" style={{ color: '#cbd5e1' }}>Job / Internship Role *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Full Stack Web Developer Intern"
                  className="form-input admin-input-light"
                  value={expInput.role}
                  onChange={(e) => setExpInput({ ...expInput, role: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ color: '#cbd5e1' }}>Company Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. StrandVizio Consulting"
                  className="form-input admin-input-light"
                  value={expInput.company}
                  onChange={(e) => setExpInput({ ...expInput, company: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ color: '#cbd5e1' }}>Period / Dates *</label>
                <input
                  type="text"
                  required
                  placeholder="June 2024 - July 2024"
                  className="form-input admin-input-light"
                  value={expInput.period}
                  onChange={(e) => setExpInput({ ...expInput, period: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ color: '#cbd5e1' }}>Description *</label>
                <textarea
                  rows="3"
                  required
                  className="form-textarea admin-input-light"
                  value={expInput.description}
                  onChange={(e) => setExpInput({ ...expInput, description: e.target.value })}
                ></textarea>
              </div>

              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setEditingExp(null)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                  Cancel
                </button>

                <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  <Save size={16} />
                  <span>Save Experience</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
