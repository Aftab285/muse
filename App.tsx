import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/Landing';
import { Onboarding } from './pages/Onboarding';
import { Dashboard } from './pages/Dashboard';
import { SearchPage } from './pages/Search';
import { ProfilePage } from './pages/Profile';
import { ChatPage } from './pages/Chat';
import { StyleGuide } from './pages/StyleGuide';
import { UserRole } from './types';

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const App: React.FC = () => {
  // Global simple auth state for the prototype
  const [userRole, setUserRole] = useState<UserRole>('brand');
  // Track if user has "logged in" via onboarding/landing
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (role: UserRole) => {
      setUserRole(role);
      setIsAuthenticated(true);
  };

  const handleLogout = () => {
      setIsAuthenticated(false);
  };

  return (
    <HashRouter>
        <Layout userRole={userRole} onLogout={handleLogout}>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/onboarding" element={<Onboarding setUserRole={handleLogin} />} />
                
                <Route path="/dashboard" element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                        <Dashboard userRole={userRole} />
                    </ProtectedRoute>
                } />
                <Route path="/search" element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                        <SearchPage />
                    </ProtectedRoute>
                } />
                <Route path="/profile" element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                        <ProfilePage />
                    </ProtectedRoute>
                } />
                <Route path="/messages" element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                        <ChatPage userRole={userRole} />
                    </ProtectedRoute>
                } />
                <Route path="/styleguide" element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                        <StyleGuide />
                    </ProtectedRoute>
                } />
            </Routes>
        </Layout>
    </HashRouter>
  );
};

export default App;