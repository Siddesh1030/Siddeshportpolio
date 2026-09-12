-- ============================================================
-- SIDDESH PORTFOLIO DATABASE SCHEMA & BASELINE DATA SCRIPT
-- Database: siddesh_portfolio_db
-- Target: MySQL Server 8.0+
-- ============================================================

CREATE DATABASE IF NOT EXISTS siddesh_portfolio_db;
USE siddesh_portfolio_db;

-- 1. USERS TABLE (Admin Authentication)
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'ROLE_ADMIN'
);

-- Insert Default Admin Account (Username: admin | Password: admin123password)
INSERT INTO users (username, password, role)
VALUES ('admin', '$2a$10$e7Wv.aO9vSg98H8fD2jVeeB7yQ.J5n5F1X5G5H5I5J5K5L5M5N5O5P', 'ROLE_ADMIN')
ON DUPLICATE KEY UPDATE username=username;


-- 2. PORTFOLIO CONTENT TABLE (CMS JSON Sections)
CREATE TABLE IF NOT EXISTS portfolio_content (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    section_key VARCHAR(100) NOT NULL UNIQUE,
    json_content LONGTEXT NOT NULL
);

-- Insert Baseline Hero Section
INSERT INTO portfolio_content (section_key, json_content) VALUES
('hero', '{"badgeText":"AVAILABLE FOR INTERNSHIPS / PROJECTS / FULL-TIME ROLES","name":"SIDDESH","title":"Full-Stack Developer | React.js • Java Spring Boot • MySQL","heroTitlePrefix":"Crafting Scalable Apps with","heroTitleGradient":"React.js, Spring Boot","heroTitleSuffix":"& MySQL.","subtitle":"CS Student at Presidency University building modern full-stack web applications with React.js, Java Spring Boot, & MySQL.","javaSnippetName":"SiddeshApplication.java","mindset":"Learn. Build. Improve.","journeyMsg":"Every line of code is a step forward.","goalMsg":"Build today. Become better tomorrow.","floatingBadges":["React.js","Java Spring Boot","MySQL"]}')
ON DUPLICATE KEY UPDATE json_content=VALUES(json_content);

-- Insert Baseline About Section
INSERT INTO portfolio_content (section_key, json_content) VALUES
('about', '{"sectionTag":"01 // ABOUT ME","heading":"Full-Stack Developer specializing in React.js, Java Spring Boot, and MySQL.","bioLine1":"I am a Computer Science student at Presidency University, passionate about building robust web applications. My core technical expertise lies in React.js for modern reactive frontends, Java Spring Boot for high-performance REST APIs, and MySQL for relational database design.","bioLine2":"I focus on writing clean, scalable code and delivering seamless user experiences across the entire software development lifecycle.","internshipHighlight":"Recently, I gained hands-on industry experience as a Full Stack Web Development Intern at StrandVizio Consulting Services, building full-stack applications with React.js, Spring Boot, and MySQL.","quote":"Skills are built, not bought. Every day, I invest in becoming a better developer.","quoteAuthor":"— Siddesh"}')
ON DUPLICATE KEY UPDATE json_content=VALUES(json_content);

-- Insert Baseline Education Section
INSERT INTO portfolio_content (section_key, json_content) VALUES
('education', '{"degree":"B.Tech – Computer Science & Engineering","university":"Presidency University, Bengaluru","duration":"2024 – 2028","currentStatus":"Currently in 3rd Year","tenthPercentage":"78.88%","twelfthPercentage":"90.83%","cgpa":"7.79","subjects":["Data Structures","Object-Oriented Programming","Database Management","Machine Learning","Data Analytics","Cryptography","Blockchain","Theory of Computation","Unix & Shell Programming"],"technicalSkills":["React.js","Java Spring Boot","MySQL","Java","Git"]}')
ON DUPLICATE KEY UPDATE json_content=VALUES(json_content);

-- Insert Baseline Skills Section
INSERT INTO portfolio_content (section_key, json_content) VALUES
('skills', '[{"id":"react","name":"React.js","percentage":95,"category":"Frontend"},{"id":"springboot","name":"Java Spring Boot","percentage":90,"category":"Backend"},{"id":"mysql","name":"MySQL","percentage":90,"category":"Database"},{"id":"java","name":"Java","percentage":90,"category":"Language"},{"id":"htmlcss","name":"HTML5 / CSS3","percentage":95,"category":"Frontend"},{"id":"git","name":"Git & GitHub","percentage":90,"category":"Tools"}]')
ON DUPLICATE KEY UPDATE json_content=VALUES(json_content);

-- Insert Baseline Tools Section
INSERT INTO portfolio_content (section_key, json_content) VALUES
('tools', '[{"id":"t1","name":"VS Code"},{"id":"t2","name":"IntelliJ IDEA"},{"id":"t3","name":"Postman"},{"id":"t4","name":"MySQL Workbench"},{"id":"t5","name":"Figma"},{"id":"t6","name":"Docker"},{"id":"t7","name":"Linux"},{"id":"t8","name":"Vercel"}]')
ON DUPLICATE KEY UPDATE json_content=VALUES(json_content);

-- Insert Baseline Projects Section
INSERT INTO portfolio_content (section_key, json_content) VALUES
('projects', '[{"id":"nexus","title":"Full-Stack Management System","description":"A complete full-stack web application featuring a modern React.js frontend interface, powered by a robust Java Spring Boot backend and structured MySQL database schema with secure JWT authentication.","tags":["React.js","Java Spring Boot","MySQL"],"github":"https://github.com/siddesh/fullstack-spring-react","demo":"https://fullstack-app.demo.app","featured":true},{"id":"aura","title":"Aura E-Commerce Engine","description":"A scalable e-commerce application with real-time product search, shopping cart management, and order processing using React.js, Spring Boot REST APIs, and MySQL relational persistence.","tags":["React.js","Spring Boot","MySQL"],"github":"https://github.com/siddesh/aura-ecommerce","demo":"https://aura-ecommerce.demo.app","featured":true}]')
ON DUPLICATE KEY UPDATE json_content=VALUES(json_content);


-- 3. CONTACT SUBMISSIONS TABLE (Visitor Messages)
CREATE TABLE IF NOT EXISTS contact_submissions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    user_status VARCHAR(50),
    college_name VARCHAR(255),
    branch VARCHAR(100),
    current_semester VARCHAR(100),
    company_name VARCHAR(255),
    role VARCHAR(100),
    experience VARCHAR(100),
    graduation_year VARCHAR(50),
    message TEXT,
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert Initial Sample Submission
INSERT INTO contact_submissions (name, email, phone, user_status, company_name, role, message, submitted_at) VALUES
('Anita Sharma', 'anita@strandvizio.com', '+91 91234 56789', 'employed', 'StrandVizio Consulting', 'Tech Lead', 'Hi Siddesh, loved working with you during your internship! Reach out when free.', NOW());
