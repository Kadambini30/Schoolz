import { Inter } from 'next/font/google'
import { AuthProvider } from '../Providers'

const inter = Inter({ subsets: ['latin'] })

export default function teacherRootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
        {children}
        </AuthProvider>
        </body>
    </html>
  )
}
