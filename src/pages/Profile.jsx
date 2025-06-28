import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserCircle,
  LogOut,
  Edit2,
  Mail,
  Calendar,
  Shield,
  ShoppingBag,
  Heart,
  Save,
  X,
  Eye,
  EyeOff,
  Phone,
  MapPin,
  User,
  Lock
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useLang } from '../context/LangContext';
import Navbar from '../components/navbar';
import useAuthStore from '../hooks/useAuth';
import useWishlistStore from '../hooks/useWishlist.js';

const Profile = () => {
  const navigate = useNavigate();
  const { t, lang } = useLang();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { wishlistItems = [] } = useWishlistStore();

  // Form states
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: ''
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [stats, setStats] = useState({
    orders: 0,
    wishlist: 0
  });

  useEffect(() => {
    // Load user data from localStorage
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user.name || !user.email) {
        throw new Error('Invalid user data');
      }
      setUserData(user);

      // Set form data
      setEditForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || ''
      });

      // Load user stats
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      setStats({
        orders: orders.length,
        wishlist: wishlistItems.length
      });
    } catch (error) {
      console.error('Error loading user data:', error);
      toast.error(t('failedToLoadProfile'));
      navigate('/login');
    }
  }, [navigate, t, wishlistItems.length]);

  const handleLogout = async () => {
    try {
      await useAuthStore.getState().logout();
      toast.success(t('loggedOutSuccessfully'));
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error(t('failedToLogout'));
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);
    setIsChangingPassword(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm({
      name: userData.name || '',
      email: userData.email || '',
      phone: userData.phone || '',
      address: userData.address || '',
      city: userData.city || ''
    });
  };

  const handleSaveProfile = () => {
    // Validate form
    if (!editForm.name.trim() || !editForm.email.trim()) {
      toast.error(t('fillRequiredFields'));
      return;
    }

    if (!editForm.email.includes('@')) {
      toast.error(t('validEmail'));
      return;
    }

    try {
      // Update user data
      const updatedUser = {
        ...userData,
        ...editForm
      };

      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUserData(updatedUser);
      setIsEditing(false);

      toast.success(t('profileUpdated'));
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(t('failedToUpdateProfile'));
    }
  };

  const handleChangePassword = () => {
    setIsChangingPassword(true);
    setIsEditing(false);
  };

  const handleCancelPasswordChange = () => {
    setIsChangingPassword(false);
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleSavePassword = () => {
    // Validate password form
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      toast.error(t('fillAllFields'));
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast.error(t('passwordMinLength'));
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error(t('passwordsNotMatch'));
      return;
    }

    // In a real app, you would validate current password with backend
    // For now, we'll just update the password in localStorage
    try {
      const updatedUser = {
        ...userData,
        password: passwordForm.newPassword // In real app, this should be hashed
      };

      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUserData(updatedUser);
      setIsChangingPassword(false);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

      toast.success(t('passwordChanged'));
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error(t('failedToChangePassword'));
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-purple-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Get initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-purple-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl shadow-2xl bg-gradient-to-br from-slate-900/80 via-slate-950/80 to-purple-900/70 backdrop-blur-md border border-white/10 overflow-hidden">
            {/* Profile Header */}
            <div className="relative">
              <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600"></div>
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-white/70 dark:bg-white/10 border-4 border-white/20 dark:border-white/10 shadow-lg backdrop-blur-md">
                  {userData.avatar ? (
                    <img
                      src={userData.avatar}
                      alt={userData.name}
                      className="w-32 h-32 rounded-full object-cover"
                    />
                  ) : (
                    <div className="text-4xl font-bold text-blue-400">
                      {getInitials(userData.name)}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="pt-20 pb-8 px-8">
              {/* User Info */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">{userData.name}</h1>
                <div className="flex items-center justify-center space-x-2 text-white/80">
                  <Mail className="w-4 h-4" />
                  <span>{userData.email}</span>
                  {userData.isAdmin && (
                    <div className="flex items-center space-x-1 ml-2">
                      <Shield className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-400 text-sm font-medium">
                        {t('admin')}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/70 dark:bg-white/10 rounded-xl p-6 shadow backdrop-blur-md border border-white/10 dark:border-white/10">
                  <div className="flex items-center space-x-3">
                    <ShoppingBag className="w-8 h-8 text-blue-400" />
                    <div>
                      <p className="text-white/60 text-sm">
                        {t('orders')}
                      </p>
                      <p className="text-white text-2xl font-bold">{stats.orders}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/70 dark:bg-white/10 rounded-xl p-6 shadow backdrop-blur-md border border-white/10 dark:border-white/10">
                  <div className="flex items-center space-x-3">
                    <Heart className="w-8 h-8 text-red-400" />
                    <div>
                      <p className="text-white/60 text-sm">
                        {t('wishlist')}
                      </p>
                      <p className="text-white text-2xl font-bold">{stats.wishlist}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Edit Profile Form */}
              {isEditing && (
                <div className="bg-white/70 dark:bg-white/10 rounded-xl p-6 shadow backdrop-blur-md border border-white/10 dark:border-white/10 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">
                      {t('editProfile')}
                    </h3>
                    <button
                      onClick={handleCancelEdit}
                      className="text-white/60 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        {t('fullName')} *
                      </label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full px-3 py-2 bg-white/20 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={t('enterFullName')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        {t('email')} *
                      </label>
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="w-full px-3 py-2 bg-white/20 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={t('enterEmail')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        {t('phoneNumber')}
                      </label>
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        className="w-full px-3 py-2 bg-white/20 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={t('enterPhone')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        {t('address')}
                      </label>
                      <input
                        type="text"
                        value={editForm.address}
                        onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                        className="w-full px-3 py-2 bg-white/20 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={t('enterAddress')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        {t('city')}
                      </label>
                      <input
                        type="text"
                        value={editForm.city}
                        onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                        className="w-full px-3 py-2 bg-white/20 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={t('enterCity')}
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={handleSaveProfile}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        {t('save')}
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                      >
                        {t('cancel')}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Change Password Form */}
              {isChangingPassword && (
                <div className="bg-white/70 dark:bg-white/10 rounded-xl p-6 shadow backdrop-blur-md border border-white/10 dark:border-white/10 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">
                      {t('changePassword')}
                    </h3>
                    <button
                      onClick={handleCancelPasswordChange}
                      className="text-white/60 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        {t('currentPassword')} *
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                          className="w-full px-3 py-2 bg-white/20 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                          placeholder={t('enterCurrentPassword')}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        {t('newPassword')} *
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                          className="w-full px-3 py-2 bg-white/20 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                          placeholder={t('enterNewPassword')}
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                        >
                          {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        {t('confirmNewPassword')} *
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                          className="w-full px-3 py-2 bg-white/20 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                          placeholder={t('reEnterNewPassword')}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={handleSavePassword}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        {t('save')}
                      </button>
                      <button
                        onClick={handleCancelPasswordChange}
                        className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                      >
                        {t('cancel')}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* User Info Display */}
              {!isEditing && !isChangingPassword && (
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3 p-3 bg-white/70 dark:bg-white/10 rounded-xl shadow backdrop-blur-md border border-white/10 dark:border-white/10">
                    <User className="w-5 h-5 text-blue-400" />
                    <span className="text-white/80">
                      {t('name')}: {userData.name}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-white/70 dark:bg-white/10 rounded-xl shadow backdrop-blur-md border border-white/10 dark:border-white/10">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <span className="text-white/80">
                      {t('email')}: {userData.email}
                    </span>
                  </div>

                  {userData.phone && (
                    <div className="flex items-center space-x-3 p-3 bg-white/70 dark:bg-white/10 rounded-xl shadow backdrop-blur-md border border-white/10 dark:border-white/10">
                      <Phone className="w-5 h-5 text-blue-400" />
                      <span className="text-white/80">
                        {t('phone')}: {userData.phone}
                      </span>
                    </div>
                  )}

                  {userData.address && (
                    <div className="flex items-center space-x-3 p-3 bg-white/70 dark:bg-white/10 rounded-xl shadow backdrop-blur-md border border-white/10 dark:border-white/10">
                      <MapPin className="w-5 h-5 text-blue-400" />
                      <span className="text-white/80">
                        {t('address')}: {userData.address}
                      </span>
                    </div>
                  )}

                  {userData.city && (
                    <div className="flex items-center space-x-3 p-3 bg-white/70 dark:bg-white/10 rounded-xl shadow backdrop-blur-md border border-white/10 dark:border-white/10">
                      <MapPin className="w-5 h-5 text-blue-400" />
                      <span className="text-white/80">
                        {t('city')}: {userData.city}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center space-x-3 p-3 bg-white/70 dark:bg-white/10 rounded-xl shadow backdrop-blur-md border border-white/10 dark:border-white/10">
                    <Calendar className="w-5 h-5 text-blue-400" />
                    <span className="text-white/80">
                      {t('memberSince')}: {new Date().toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-white/70 dark:bg-white/10 rounded-xl shadow backdrop-blur-md border border-white/10 dark:border-white/10">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span className="text-white/80">
                      {t('accountStatus')}: {t('active')}
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {!isEditing && !isChangingPassword && (
                <div className="space-y-3">
                  <button
                    onClick={handleEditProfile}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-white/20 rounded-lg shadow-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>{t('editProfile')}</span>
                  </button>

                  <button
                    onClick={handleChangePassword}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-white/20 rounded-lg shadow-lg text-sm font-medium text-white bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 hover:from-orange-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200"
                  >
                    <Lock className="w-4 h-4" />
                    <span>{t('changePassword')}</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t('logout')}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
