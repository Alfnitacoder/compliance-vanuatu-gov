-- Insert Departments
INSERT INTO departments (id, name, description) VALUES
('DEPC', 'Department of Environmental Protection and Conservation', 'Environmental protection and conservation initiatives'),
('DoE', 'Department of Energy', 'Energy policy and renewable energy initiatives'),
('VMGD', 'Vanuatu Meteorological & Geohazard Department', 'Weather monitoring and geological hazard assessment'),
('DoCC', 'Department of Climate Change', 'Climate change policy and adaptation strategies'),
('NDMO', 'National Disaster Management Office', 'Disaster preparedness and emergency response');

-- Insert Provinces
INSERT INTO provinces (id, name) VALUES
('TORBA', 'Torba'),
('SANMA', 'Sanma'),
('PENAMA', 'Penama'),
('MALMPA', 'Malampa'),
('SHEFA', 'Shefa'),
('TAFEA', 'Tafea');

-- Insert sample admin user (password: admin123)
INSERT INTO users (email, name, password_hash, role) VALUES
('admin@example.com', 'System Admin', '$2b$10$X9f4bQ6/g0tG9XtR1f1X7OQU1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1', 'admin');