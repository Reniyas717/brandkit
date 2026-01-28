import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BrandExperience from './pages/BrandExperience';
import ProductExploration from './pages/ProductExploration';
import KitBuilder from './pages/KitBuilder';
import KitReview from './pages/KitReview';
import SubscriptionTracking from './pages/SubscriptionTracking';

import { AuthProvider } from './context/AuthContext';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import DashboardLayout from './pages/seller/DashboardLayout';
import DashboardHome from './pages/seller/DashboardHome';
import BrandSettings from './pages/seller/BrandSettings';
import ProductManager from './pages/seller/ProductManager';
import SellerAnalytics from './pages/seller/SellerAnalytics';
import PlatformHome from './pages/PlatformHome';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PlatformHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Brand-specific Routes - Requires Login */}
          <Route path="/brand/:slug" element={
            <ProtectedRoute allowedRoles={['customer', 'seller', 'admin']}>
              <BrandExperience />
            </ProtectedRoute>
          } />
          <Route path="/brand/:slug/builder" element={
            <ProtectedRoute allowedRoles={['customer', 'seller', 'admin']}>
              <KitBuilder />
            </ProtectedRoute>
          } />
          <Route path="/brand/:slug/review" element={
            <ProtectedRoute allowedRoles={['customer', 'seller', 'admin']}>
              <KitReview />
            </ProtectedRoute>
          } />

          {/* Protected Cross-brand shopping Routes - Requires Login */}
          <Route path="/builder" element={
            <ProtectedRoute allowedRoles={['customer', 'seller', 'admin']}>
              <KitBuilder />
            </ProtectedRoute>
          } />
          <Route path="/review" element={
            <ProtectedRoute allowedRoles={['customer', 'seller', 'admin']}>
              <KitReview />
            </ProtectedRoute>
          } />
          <Route path="/products" element={
            <ProtectedRoute allowedRoles={['customer', 'seller', 'admin']}>
              <ProductExploration />
            </ProtectedRoute>
          } />
          <Route path="/subscriptions" element={
            <ProtectedRoute allowedRoles={['customer', 'seller', 'admin']}>
              <SubscriptionTracking />
            </ProtectedRoute>
          } />

          {/* Seller Dashboard */}
          <Route path="/seller" element={
            <ProtectedRoute allowedRoles={['seller', 'admin']}>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<DashboardHome />} />
            <Route path="settings" element={<BrandSettings />} />
            <Route path="products" element={<ProductManager />} />
            <Route path="analytics" element={<SellerAnalytics />} />
          </Route>

          {/* Default catch-all */}
          <Route path="*" element={<PlatformHome />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
