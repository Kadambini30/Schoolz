import React from 'react'
import { AuthProvider } from '../Providers'
export default function StudentRootLayout({ children }) {
    return (

          <AuthProvider>
          {children}
          </AuthProvider>

    )
  }
  