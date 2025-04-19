import React from 'react';

const TextInput = ({
  id,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  autoComplete,
  placeholder,
  className = '',
  ...rest
}) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      autoComplete={autoComplete}
      placeholder={placeholder}
      className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-300 sm:text-sm/6 ${className}`}
      {...rest}
    />
  );
};

export default TextInput;
