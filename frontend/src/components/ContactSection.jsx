import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Phone, GraduationCap, Briefcase, UserCheck } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function ContactSection() {
  const { portfolio, addContactSubmission } = usePortfolio();
  const { contactInfo } = portfolio;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    userStatus: 'student', // 'student' | 'employed' | 'unemployed'
    collegeName: '',
    branch: '',
    currentSemester: '6th Semester',
    companyName: '',
    role: '',
    experience: '1-2 Years',
    graduationYear: '2025',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) return;

    // Sanitize submission payload based on selected status
    const submissionPayload = { ...formData };
    if (formData.userStatus === 'student') {
      submissionPayload.companyName = '';
      submissionPayload.role = '';
      submissionPayload.experience = '';
      submissionPayload.graduationYear = '';
    } else if (formData.userStatus === 'employed') {
      submissionPayload.collegeName = '';
      submissionPayload.branch = '';
      submissionPayload.currentSemester = '';
      submissionPayload.graduationYear = '';
    } else if (formData.userStatus === 'unemployed') {
      submissionPayload.collegeName = '';
      submissionPayload.branch = '';
      submissionPayload.currentSemester = '';
      submissionPayload.companyName = '';
      submissionPayload.role = '';
      submissionPayload.experience = '';
    }

    // Save to CMS context inbox
    addContactSubmission(submissionPayload);

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        userStatus: 'student',
        collegeName: '',
        branch: '',
        currentSemester: '6th Semester',
        companyName: '',
        role: '',
        experience: '1-2 Years',
        graduationYear: '2025',
        message: ''
      });
    }, 6000);
  };

  return (
    <section id="contact" className="section">
      <div className="container" style={{ maxWidth: '850px' }}>
        
        {/* Section Title */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="section-tag">05 // GET IN TOUCH</span>
          <h2 className="section-heading">Let's Build Something Together</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '580px', margin: '0 auto' }}>
            Reach out via <strong>{contactInfo.email}</strong> or fill out your details below. Siddesh will respond as soon as possible!
          </p>
        </div>

        {/* Contact Form Card */}
        <div className="glass-card" style={{ padding: '2.5rem' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <CheckCircle2 size={54} style={{ color: '#10b981', margin: '0 auto 1.2rem auto' }} />
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.6rem' }}>
                Thank You, {formData.name}!
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '480px', margin: '0 auto 1.5rem auto' }}>
                Your message and contact information have been received. Siddesh will get back to you shortly at <strong>{formData.email}</strong> or <strong>{formData.phone}</strong>.
              </p>

              {/* Submitted Details Summary Card */}
              <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '14px', padding: '1.2rem', textAlign: 'left', fontSize: '0.88rem', color: '#94a3b8', maxWidth: '500px', margin: '0 auto' }}>
                <div style={{ color: '#8b5cf6', fontWeight: 700, marginBottom: '6px' }}>Captured Response Summary:</div>
                <div>• <strong>Status:</strong> {formData.userStatus.toUpperCase()}</div>
                {formData.userStatus === 'student' && (
                  <div>• <strong>College:</strong> {formData.collegeName || 'Presidency University'} ({formData.branch || 'CSE'}, {formData.currentSemester})</div>
                )}
                {formData.userStatus === 'employed' && (
                  <div>• <strong>Company & Role:</strong> {formData.role} at {formData.companyName} ({formData.experience} Exp)</div>
                )}
                {formData.userStatus === 'unemployed' && (
                  <div>• <strong>Graduation Year:</strong> {formData.graduationYear}</div>
                )}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              
              {/* Row 1: Basic Contact Details */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.2rem', marginBottom: '1.2rem' }}>
                
                <div className="form-group">
                  <label className="form-label">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    className="form-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

              </div>

              {/* Row 2: Status Selection Tabs */}
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label" style={{ marginBottom: '0.6rem' }}>Are you currently a Student, Employed, or Job Seeker? *</label>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem' }}>
                  
                  <button
                    type="button"
                    className={`status-tab-btn ${formData.userStatus === 'student' ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, userStatus: 'student' })}
                  >
                    <GraduationCap size={18} />
                    <span>Student</span>
                  </button>

                  <button
                    type="button"
                    className={`status-tab-btn ${formData.userStatus === 'employed' ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, userStatus: 'employed' })}
                  >
                    <Briefcase size={18} />
                    <span>Employed</span>
                  </button>

                  <button
                    type="button"
                    className={`status-tab-btn ${formData.userStatus === 'unemployed' ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, userStatus: 'unemployed' })}
                  >
                    <UserCheck size={18} />
                    <span>Job Seeker</span>
                  </button>

                </div>
              </div>

              {/* DYNAMIC FIELDS BLOCK */}
              
              {/* CASE 1: STUDENT FIELDS */}
              {formData.userStatus === 'student' && (
                <div className="dynamic-fields-card">
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '1rem' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">College / University Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Presidency University"
                        className="form-input"
                        value={formData.collegeName}
                        onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Branch / Department *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Computer Science (CSE)"
                        className="form-input"
                        value={formData.branch}
                        onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Current Semester *</label>
                      <select
                        className="form-input"
                        value={formData.currentSemester}
                        onChange={(e) => setFormData({ ...formData, currentSemester: e.target.value })}
                        style={{ color: '#ffffff', background: 'rgba(20, 24, 38, 0.95)' }}
                      >
                        <option value="1st Semester">1st Semester</option>
                        <option value="2nd Semester">2nd Semester</option>
                        <option value="3rd Semester">3rd Semester</option>
                        <option value="4th Semester">4th Semester</option>
                        <option value="5th Semester">5th Semester</option>
                        <option value="6th Semester">6th Semester</option>
                        <option value="7th Semester">7th Semester</option>
                        <option value="8th Semester">8th Semester</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* CASE 2: EMPLOYED FIELDS */}
              {formData.userStatus === 'employed' && (
                <div className="dynamic-fields-card">
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '1rem' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Company Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. StrandVizio Consulting"
                        className="form-input"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Job Role / Designation *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Full Stack Developer / HR"
                        className="form-input"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Work Experience *</label>
                      <select
                        className="form-input"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        style={{ color: '#ffffff', background: 'rgba(20, 24, 38, 0.95)' }}
                      >
                        <option value="Fresher (<1 Yr)">Fresher (&lt;1 Yr)</option>
                        <option value="1-2 Years">1-2 Years</option>
                        <option value="3-5 Years">3-5 Years</option>
                        <option value="5+ Years">5+ Years</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* CASE 3: UNEMPLOYED / JOB SEEKER FIELDS */}
              {formData.userStatus === 'unemployed' && (
                <div className="dynamic-fields-card">
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Graduation Year *</label>
                    <select
                      className="form-input"
                      value={formData.graduationYear}
                      onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                      style={{ color: '#ffffff', background: 'rgba(20, 24, 38, 0.95)' }}
                    >
                      <option value="2026">2026 (Upcoming Graduate)</option>
                      <option value="2025">2025</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022 or Earlier">2022 or Earlier</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Row 4: Message Field */}
              <div className="form-group" style={{ marginTop: '1.2rem' }}>
                <label className="form-label">Your Message *</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Tell me about your project, job opportunity, or collaboration..."
                  className="form-textarea"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', padding: '0.9rem' }}>
                <span>Send Message</span>
                <Send size={18} />
              </button>

            </form>
          )}
        </div>
      </div>
    </section>
  );
}
