import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './context/ThemeContext'
import { LangProvider } from './context/LangContext'
import ErrorBoundary from './components/ui/ErrorBoundary'
import ScrollToTop from './components/ui/ScrollToTop'
import AuthRedirect from './components/AuthRedirect'
import useAuthStore from './hooks/useAuth'
import useProductData from './hooks/useProductData'
import HomePage from './pages/homePage'
import ProductList from './pages/ProductList'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import Wishlist from './pages/Wishlist'
import Checkout from './pages/Checkout'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import ThankYou from './pages/ThankYou'
import AdminDashboard from './pages/AdminDashboard'
import AddProduct from './pages/AddProduct'
import EditProduct from './pages/EditProduct'
import AdminRoute from './components/AdminRoute'
import ProtectedRoute from './components/ProtectedRoute'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import OrderConfirmationPage from './pages/OrderConfirmationPage'
import HelpCenter from './pages/HelpCenter'
import NotFound from './pages/NotFound'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MyOrders from './pages/MyOrders'

function App() {
  const { initializeAuth } = useAuthStore()
  const { initializeProducts } = useProductData()

  useEffect(() => {
    // Initialize authentication state on app load
    initializeAuth()
    // Initialize default products
    initializeProducts()

    // إضافة تأخير قصير لضمان التهيئة الصحيحة
    const timer = setTimeout(() => {
      initializeProducts()
    }, 100)

    return () => clearTimeout(timer)
  }, [initializeAuth, initializeProducts])

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <ThemeProvider>
          <LangProvider>
            <div className="min-h-screen w-full bg-background dark:bg-background-dark">
              <Router>
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: '#333',
                      color: '#fff',
                      borderRadius: '8px',
                      fontSize: '14px',
                    },
                    success: {
                      iconTheme: {
                        primary: '#10b981',
                        secondary: '#fff',
                      },
                    },
                    error: {
                      iconTheme: {
                        primary: '#ef4444',
                        secondary: '#fff',
                      },
                    },
                  }}
                />

                <Routes>
                  {/* Landing Page - Only for non-authenticated users */}
                  <Route path="/" element={<HomePage />} />

                  {/* Public Routes */}
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/thank-you" element={<ThankYou />} />
                  <Route path="/help" element={<HelpCenter />} />

                  {/* Protected Routes - Require Login */}
                  <Route path="/cart" element={
                    <ProtectedRoute>
                      <CartPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/wishlist" element={
                    <ProtectedRoute>
                      <Wishlist />
                    </ProtectedRoute>
                  } />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
                  <Route path="/settings" element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  } />
                  <Route path="/checkout" element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  } />
                  <Route path="/order-confirmation" element={
                    <ProtectedRoute>
                      <OrderConfirmationPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/my-orders" element={
                    <ProtectedRoute>
                      <MyOrders />
                    </ProtectedRoute>
                  } />

                  {/* Admin Routes - Require Admin Login */}
                  <Route
                    path="/admin"
                    element={
                      <AdminRoute>
                        <AdminDashboard />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/add-product"
                    element={
                      <AdminRoute>
                        <AddProduct />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/edit-product/:id"
                    element={
                      <AdminRoute>
                        <EditProduct />
                      </AdminRoute>
                    }
                  />

                  {/* 404 Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>

                <ScrollToTop />
              </Router>
              <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            </div>
          </LangProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </HelmetProvider>
  )
}

export default App
