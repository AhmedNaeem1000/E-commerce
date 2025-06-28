import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { login as loginAPI, register as registerAPI, logout as logoutAPI, getCurrentUser, updateProfile, changePassword } from '../api/auth';
import toast from 'react-hot-toast';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      isAdmin: false,

      // Actions
      login: async (credentials) => {
        set({ isLoading: true });
        try {
          const response = await loginAPI(credentials);
          const { user, token } = response;

          set({
            user,
            token,
            isAuthenticated: true,
            isAdmin: user.role === 'admin',
            isLoading: false
          });

          // Store token in localStorage
          localStorage.setItem('authToken', token);
          localStorage.setItem('user', JSON.stringify(user));

          toast.success('Login successful!');
          return response;
        } catch (error) {
          set({ isLoading: false });
          toast.error(error.message || 'Login failed');
          throw error;
        }
      },

      register: async (userData) => {
        set({ isLoading: true });
        try {
          const response = await registerAPI(userData);
          const { user, token } = response;

          set({
            user,
            token,
            isAuthenticated: true,
            isAdmin: user.role === 'admin',
            isLoading: false
          });

          // Store token in localStorage
          localStorage.setItem('authToken', token);
          localStorage.setItem('user', JSON.stringify(user));

          toast.success('Registration successful!');
          return response;
        } catch (error) {
          set({ isLoading: false });
          toast.error(error.message || 'Registration failed');
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await logoutAPI();
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isAdmin: false,
            isLoading: false
          });

          toast.success('Logged out successfully');
        } catch (error) {
          set({ isLoading: false });
          toast.error('Logout failed');
          throw error;
        }
      },

      updateUserProfile: async (userData) => {
        set({ isLoading: true });
        try {
          const updatedUser = await updateProfile(userData);
          set({
            user: updatedUser,
            isLoading: false
          });

          // Update localStorage
          localStorage.setItem('user', JSON.stringify(updatedUser));

          toast.success('Profile updated successfully');
          return updatedUser;
        } catch (error) {
          set({ isLoading: false });
          toast.error(error.message || 'Profile update failed');
          throw error;
        }
      },

      changeUserPassword: async (passwordData) => {
        set({ isLoading: true });
        try {
          const response = await changePassword(passwordData);
          set({ isLoading: false });

          toast.success('Password changed successfully');
          return response;
        } catch (error) {
          set({ isLoading: false });
          toast.error(error.message || 'Password change failed');
          throw error;
        }
      },

      checkAuth: async () => {
        const token = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('user');

        if (!token || !storedUser) {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isAdmin: false
          });
          return false;
        }

        try {
          const user = await getCurrentUser();
          set({
            user,
            token,
            isAuthenticated: true,
            isAdmin: user.role === 'admin'
          });
          return true;
        } catch (error) {
          // Token is invalid, clear everything
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isAdmin: false
          });
          return false;
        }
      },

      // Initialize auth state from localStorage
      initializeAuth: () => {
        const token = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('user');

        if (token && storedUser) {
          try {
            const user = JSON.parse(storedUser);
            set({
              user,
              token,
              isAuthenticated: true,
              isAdmin: user.role === 'admin'
            });
          } catch (error) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isAdmin: false
            });
          }
        } else {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isAdmin: false
          });
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        isAdmin: state.isAdmin
      })
    }
  )
);

export default useAuthStore;
