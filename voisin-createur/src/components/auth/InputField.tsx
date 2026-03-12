import React from 'react'

interface InputFieldProps {
  id: string
  label: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  minLength?: number
}

export default function InputField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  minLength
}: InputFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-text mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        minLength={minLength}
        className="w-full px-6 py-3 border border-secondary rounded-full focus:ring-2 focus:ring-primary focus:border-transparent text-text"
        placeholder={placeholder}
      />
    </div>
  )
}
