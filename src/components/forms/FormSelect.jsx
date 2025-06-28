import React from 'react';
import { useFormContext } from 'react-hook-form';

const FormSelect = ({
  name,
  label,
  options = [],
  placeholder = 'Select an option',
  required = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <select
        id={name}
        disabled={disabled}
        className={`
          w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-colors duration-200 appearance-none bg-white dark:bg-gray-800
          ${error
            ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
            : 'border-gray-300 dark:border-gray-600'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          dark:text-white
        `}
        {...register(name)}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FormSelect; 