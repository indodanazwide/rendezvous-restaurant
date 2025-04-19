import React from 'react'

const SecondaryButton = ({
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
      className={`flex w-full items-center justify-center rounded-md bg-white border border-gray-300 px-3 py-1.5 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default SecondaryButton
