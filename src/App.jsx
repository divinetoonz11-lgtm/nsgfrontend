import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from './components/ScrollToTop.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ProtectedAdminRoute from './components/ProtectedAdminRoute.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import AdminLoginPage from './pages/AdminLoginPage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';
import VerifyEmailPage from './pages/VerifyEmailPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

import TermsPage from './pages/TermsPage.jsx';
import PrivacyPage from './pages/PrivacyPage.jsx';
import RefundPage from './pages/RefundPage.jsx';
import DisclaimerPage from './pages/DisclaimerPage.jsx';

import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import UserManagement from './pages/admin/UserManagement.jsx';
import IncomeManagement from './pages/admin/IncomeManagement.jsx';
import FinanceManagement from './pages/admin/FinanceManagement.jsx';
import WalletManagement from './pages/admin/WalletManagement.jsx';
import NetworkManagement from './pages/admin/NetworkManagement.jsx';
import AdminManagement from './pages/admin/AdminManagement.jsx';
import AdminProperty from './pages/admin/PropertyManagement.jsx';
import AdminReports from './pages/admin/Reports.jsx';
import AdminNotificationCreate from './pages/admin/AdminNotificationCreate.jsx';
import AdminNotificationHistory from './pages/admin/AdminNotificationHistory.jsx';
import AdminRewardCreate from './pages/admin/AdminRewardCreate.jsx';
import AdminRewardHistory from './pages/admin/AdminRewardHistory.jsx';
import AdminChatLogs from './pages/admin/AdminChatLogs.jsx';

import AssociateDashboard from './pages/associate/Dashboard.jsx';
import ReferralPage from './pages/associate/Referral.jsx';
import NetworkPage from './pages/associate/Network.jsx';
import FinancePage from './pages/associate/Finance.jsx';
import PropertyPage from './pages/associate/Property.jsx';
import ReportsPage from './pages/associate/Reports.jsx';
import SupportPage from './pages/associate/Support.jsx';

import CustomerDashboard from './pages/customer/Dashboard.jsx';
import CustomerProperty from './pages/customer/Property.jsx';
import CustomerTransactions from './pages/customer/Transactions.jsx';
import CustomerSupport from './pages/customer/Support.jsx';

import NotificationPage from './pages/NotificationPage.jsx';
import RewardPage from './pages/RewardPage.jsx';
import ChatPage from './pages/ChatPage.jsx';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            
            {/* Legal Routes */}
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/refund" element={<RefundPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin-dashboard" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
            <Route path="/admin/users" element={<ProtectedAdminRoute><UserManagement /></ProtectedAdminRoute>} />
            <Route path="/admin/income" element={<ProtectedAdminRoute><IncomeManagement /></ProtectedAdminRoute>} />
            <Route path="/admin/finance" element={<ProtectedAdminRoute><FinanceManagement /></ProtectedAdminRoute>} />
            <Route path="/admin/wallet" element={<ProtectedAdminRoute><WalletManagement /></ProtectedAdminRoute>} />
            <Route path="/admin/network" element={<ProtectedAdminRoute><NetworkManagement /></ProtectedAdminRoute>} />
            <Route path="/admin/admins" element={<ProtectedAdminRoute><AdminManagement /></ProtectedAdminRoute>} />
            <Route path="/admin/properties" element={<ProtectedAdminRoute><AdminProperty /></ProtectedAdminRoute>} />
            <Route path="/admin/reports" element={<ProtectedAdminRoute><AdminReports /></ProtectedAdminRoute>} />
            <Route path="/admin/notifications/create" element={<ProtectedAdminRoute><AdminNotificationCreate /></ProtectedAdminRoute>} />
            <Route path="/admin/notifications/history" element={<ProtectedAdminRoute><AdminNotificationHistory /></ProtectedAdminRoute>} />
            <Route path="/admin/rewards/create" element={<ProtectedAdminRoute><AdminRewardCreate /></ProtectedAdminRoute>} />
            <Route path="/admin/rewards/history" element={<ProtectedAdminRoute><AdminRewardHistory /></ProtectedAdminRoute>} />
            <Route path="/admin/chat-logs" element={<ProtectedAdminRoute><AdminChatLogs /></ProtectedAdminRoute>} />

            {/* Shared Authenticated Routes */}
            <Route path="/notifications" element={<ProtectedRoute><NotificationPage /></ProtectedRoute>} />
            <Route path="/rewards" element={<ProtectedRoute><RewardPage /></ProtectedRoute>} />
            <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />

            {/* Associate Routes */}
            <Route path="/associate-dashboard" element={<ProtectedRoute requireRole="associate"><AssociateDashboard /></ProtectedRoute>} />
            <Route path="/associate/referral" element={<ProtectedRoute requireRole="associate"><ReferralPage /></ProtectedRoute>} />
            <Route path="/associate/network" element={<ProtectedRoute requireRole="associate"><NetworkPage /></ProtectedRoute>} />
            <Route path="/associate/finance" element={<ProtectedRoute requireRole="associate"><FinancePage /></ProtectedRoute>} />
            <Route path="/associate/property" element={<ProtectedRoute requireRole="associate"><PropertyPage /></ProtectedRoute>} />
            <Route path="/associate/reports" element={<ProtectedRoute requireRole="associate"><ReportsPage /></ProtectedRoute>} />
            <Route path="/associate/support" element={<ProtectedRoute requireRole="associate"><SupportPage /></ProtectedRoute>} />

            {/* Customer Routes */}
            <Route path="/customer-dashboard" element={<ProtectedRoute requireRole="customer"><CustomerDashboard /></ProtectedRoute>} />
            <Route path="/customer/property" element={<ProtectedRoute requireRole="customer"><CustomerProperty /></ProtectedRoute>} />
            <Route path="/customer/transactions" element={<ProtectedRoute requireRole="customer"><CustomerTransactions /></ProtectedRoute>} />
            <Route path="/customer/support" element={<ProtectedRoute requireRole="customer"><CustomerSupport /></ProtectedRoute>} />

            {/* Catch-all 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Toaster />
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;