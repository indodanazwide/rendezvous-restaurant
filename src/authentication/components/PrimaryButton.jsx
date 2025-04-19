import React from 'react'

const PrimaryButton = ({
  type = 'button',
  onClick,
  children,
  className = '',
  ...rest
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-purple-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default PrimaryButton