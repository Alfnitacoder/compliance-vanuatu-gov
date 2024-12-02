import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { LoginForm } from './components/auth/LoginForm';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { DepartmentCard } from './components/dashboard/DepartmentCard';
import { UsersPage } from './pages/UsersPage';
import { ReportsPage } from './pages/ReportsPage';
import { CompliancePage } from './pages/CompliancePage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';
import { departments } from './data/departments';
import { useAuth } from './lib/auth';
import { useTheme } from './lib/theme';
import { useSettings } from './lib/settings';
import { PERMISSIONS } from './types/auth';

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 flex flex-col">
      <Header />
      <Sidebar />
      
      <main className="lg:pl-64 flex-grow">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                Overview of all departments and their compliance status
              </p>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((department) => (
              <DepartmentCard key={department.id} department={department} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  const { isAuthenticated } = useAuth();
  const { setTheme } = useTheme();
  const { system } = useSettings();

  useEffect(() => {
    setTheme(system.theme);
  }, [system.theme, setTheme]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/" replace /> : <LoginForm />
        } />
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/reports" element={
          <ProtectedRoute requiredPermissions={[PERMISSIONS.VIEW_REPORTS]}>
            <ReportsPage />
          </ProtectedRoute>
        } />
        <Route path="/compliance" element={
          <ProtectedRoute requiredPermissions={[PERMISSIONS.VIEW_COMPLIANCE]}>
            <CompliancePage />
          </ProtectedRoute>
        } />
        <Route path="/analytics" element={
          <ProtectedRoute requiredPermissions={[PERMISSIONS.VIEW_ANALYTICS]}>
            <AnalyticsPage />
          </ProtectedRoute>
        } />
        <Route path="/users" element={
          <ProtectedRoute requiredPermissions={[PERMISSIONS.MANAGE_USERS]}>
            <UsersPage />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute requiredPermissions={[PERMISSIONS.MANAGE_SETTINGS]}>
            <SettingsPage />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}