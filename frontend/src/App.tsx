import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { CandidateDashboardPage } from './pages/CandidateDashboardPage';
import { ResumeUploadPage } from './pages/ResumeUploadPage';
import { RecruiterDashboardPage } from './pages/RecruiterDashboardPage';
import { AtsPipelinePage } from './pages/AtsPipelinePage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { useAuthStore } from './store/useAuthStore';

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) => {
  const { user } = useAuthStore();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Candidate Routes */}
        <Route
          path="/candidate/dashboard"
          element={
            <ProtectedRoute allowedRoles={['CANDIDATE']}>
              <CandidateDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/candidate/resume"
          element={
            <ProtectedRoute allowedRoles={['CANDIDATE']}>
              <ResumeUploadPage />
            </ProtectedRoute>
          }
        />

        {/* Recruiter Routes */}
        <Route
          path="/recruiter/dashboard"
          element={
            <ProtectedRoute allowedRoles={['RECRUITER', 'ADMIN']}>
              <RecruiterDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/ats"
          element={
            <ProtectedRoute allowedRoles={['RECRUITER', 'ADMIN']}>
              <AtsPipelinePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/analytics"
          element={
            <ProtectedRoute allowedRoles={['RECRUITER', 'ADMIN']}>
              <AnalyticsPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
