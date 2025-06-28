import axiosClient from './axiosClient';

// Mock user data for development (replace with real API calls later)
const mockUsers = [
  {
    id: 1,
    email: 'admin@ecmorece.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://via.placeholder.com/150',
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 2,
    email: 'user@ecmorece.com',
    password: 'user123',
    name: 'Regular User',
    role: 'user',
    avatar: 'https://via.placeholder.com/150',
    createdAt: '2024-01-01T00:00:00.000Z'
  }
];

// Login function
export const login = async (credentials) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const { email, password } = credentials;
    const user = mockUsers.find(u => u.email === email && u.password === password);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Create JWT-like token
    const token = btoa(JSON.stringify({ userId: user.id, email: user.email, role: user.role }));

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
      message: 'Login successful'
    };
  } catch (error) {
    throw error;
  }
};

// Register function
export const register = async (userData) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const { email, password, name } = userData;

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      email,
      password,
      name,
      role: 'user',
      avatar: 'https://via.placeholder.com/150',
      createdAt: new Date().toISOString()
    };

    // In a real app, this would be saved to database
    mockUsers.push(newUser);

    // Create JWT-like token
    const token = btoa(JSON.stringify({ userId: newUser.id, email: newUser.email, role: newUser.role }));

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = newUser;

    return {
      user: userWithoutPassword,
      token,
      message: 'Registration successful'
    };
  } catch (error) {
    throw error;
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No token found');
    }

    // Decode token
    const decoded = JSON.parse(atob(token));
    const user = mockUsers.find(u => u.id === decoded.userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
  } catch (error) {
    throw error;
  }
};

// Logout function
export const logout = async () => {
  try {
    // In a real app, you might want to call the backend to invalidate the token
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    return { message: 'Logout successful' };
  } catch (error) {
    throw error;
  }
};

// Update user profile
export const updateProfile = async (userData) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No token found');
    }

    const decoded = JSON.parse(atob(token));
    const userIndex = mockUsers.findIndex(u => u.id === decoded.userId);

    if (userIndex === -1) {
      throw new Error('User not found');
    }

    // Update user data
    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      ...userData,
      updatedAt: new Date().toISOString()
    };

    const { password: _, ...userWithoutPassword } = mockUsers[userIndex];

    return userWithoutPassword;
  } catch (error) {
    throw error;
  }
};

// Change password
export const changePassword = async (passwordData) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No token found');
    }

    const decoded = JSON.parse(atob(token));
    const userIndex = mockUsers.findIndex(u => u.id === decoded.userId);

    if (userIndex === -1) {
      throw new Error('User not found');
    }

    // In a real app, you would verify the current password
    // For now, we'll just update it
    mockUsers[userIndex].password = passwordData.newPassword;

    return { message: 'Password changed successfully' };
  } catch (error) {
    throw error;
  }
}; 