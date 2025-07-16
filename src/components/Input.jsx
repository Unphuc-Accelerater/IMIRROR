import React, { useState } from 'react'

const Input = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  error,
  className = '',
  ...props
}) => {
  const [focused, setFocused] = useState(false)
  
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-text-primary mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`input-field ${focused ? 'ring-2 ring-primary ring-opacity-20' : ''} ${
          error ? 'border-error' : ''
        }`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  )
}

export default Input