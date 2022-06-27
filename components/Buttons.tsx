import React, { forwardRef } from 'react'

export const ButtonPrimary: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ children, ...props }, ref) => (
  <a
    ref={ref}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center no-underline cursor-pointer"
    {...props}
  >
    {children}
  </a>
))

ButtonPrimary.displayName = 'ButtonPrimary'
