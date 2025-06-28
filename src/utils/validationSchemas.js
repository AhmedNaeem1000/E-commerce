import * as yup from 'yup';

// Login form validation
export const loginSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

// Register form validation
export const registerSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Full name is required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
});

// Product form validation
export const productSchema = yup.object({
  name: yup
    .string()
    .min(3, 'Product name must be at least 3 characters')
    .max(100, 'Product name must be less than 100 characters')
    .required('Product name is required'),
  description: yup
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters')
    .required('Product description is required'),
  price: yup
    .number()
    .positive('Price must be positive')
    .min(0.01, 'Price must be at least 0.01')
    .required('Price is required'),
  stock: yup
    .number()
    .integer('Stock must be a whole number')
    .min(0, 'Stock cannot be negative')
    .required('Stock is required'),
  category: yup
    .string()
    .required('Category is required'),
  discount: yup
    .number()
    .min(0, 'Discount cannot be negative')
    .max(100, 'Discount cannot exceed 100%')
    .nullable(),
  images: yup.array().of(yup.string().url('Please enter a valid image URL')).min(1, 'At least one image is required'),
});

// Profile update validation
export const profileSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Full name is required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  avatar: yup
    .string()
    .url('Please enter a valid image URL')
    .nullable(),
});

// Password change validation
export const passwordChangeSchema = yup.object({
  currentPassword: yup
    .string()
    .required('Current password is required'),
  newPassword: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('New password is required'),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Please confirm your new password'),
});

// Shipping address validation
export const shippingAddressSchema = yup.object({
  firstName: yup
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .required('First name is required'),
  lastName: yup
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .required('Last name is required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  phone: yup
    .string()
    .matches(/^[+]?[\d\s\-\(\)]+$/, 'Please enter a valid phone number')
    .required('Phone number is required'),
  address: yup
    .string()
    .min(10, 'Address must be at least 10 characters')
    .max(200, 'Address must be less than 200 characters')
    .required('Address is required'),
  city: yup
    .string()
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City must be less than 50 characters')
    .required('City is required'),
  state: yup
    .string()
    .min(2, 'State must be at least 2 characters')
    .max(50, 'State must be less than 50 characters')
    .required('State is required'),
  zipCode: yup
    .string()
    .matches(/^[\d\-\s]+$/, 'Please enter a valid ZIP code')
    .required('ZIP code is required'),
  country: yup
    .string()
    .required('Country is required'),
});

// Review form validation
export const reviewSchema = yup.object({
  rating: yup
    .number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating cannot exceed 5')
    .required('Rating is required'),
  comment: yup
    .string()
    .min(10, 'Review must be at least 10 characters')
    .max(500, 'Review must be less than 500 characters')
    .required('Review comment is required'),
});

// Search form validation
export const searchSchema = yup.object({
  query: yup
    .string()
    .min(2, 'Search query must be at least 2 characters')
    .max(100, 'Search query must be less than 100 characters')
    .required('Search query is required'),
});

// Contact form validation
export const contactSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  subject: yup
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be less than 100 characters')
    .required('Subject is required'),
  message: yup
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters')
    .required('Message is required'),
}); 