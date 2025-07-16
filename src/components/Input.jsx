import React, { useState } from 'react'

const Input = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  error,
  className = '',
  required = false,
  disabled = false,
  ...props
}) => {
  const [focused, setFocused] = useState(false)
  
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          className={`input-field ${
            error ? 'border-red-500 focus:border-red-500' : ''
          } ${
            focused ? 'border-primary' : ''
          } ${
            disabled ? 'bg-gray-100 cursor-not-allowed' : ''
          }`}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}

export default Input