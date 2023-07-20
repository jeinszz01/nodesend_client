import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/Header'
import AuthState from './context/auth/authState'
import AppState from './context/app/appState'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ReactNodeSend',
  description: 'Comparte archivos generando una url y compartelos definiendo un límite de descargas.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        <div className='bg-gray-100 min-h-screen'>
          <div className='container mx-auto'>
            
            <AuthState>
              <AppState>
                
                <Header />
                <main className='mt-20'>
                    {children}
                </main>
              
              </AppState>
            </AuthState>
            
          </div>
        </div>
        
      </body>
    </html>
  )
}
