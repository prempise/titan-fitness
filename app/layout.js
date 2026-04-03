import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Toaster } from 'react-hot-toast'

export const metadata = {
  title: 'TITAN FITNESS | Forge Your Legacy',
  description: 'Transform your body. Conquer your limits. Become unstoppable. Join TITAN FITNESS — the most elite gym experience with 50K+ members, 200+ trainers, and world-class facilities.',
  keywords: 'gym, fitness, workout, personal training, HIIT, yoga, crossfit, boxing, swimming',
  openGraph: {
    title: 'TITAN FITNESS | Forge Your Legacy',
    description: 'Transform your body. Conquer your limits. Become unstoppable.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-dark text-white overflow-x-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#16213E',
              color: '#FFFFFF',
              border: '1px solid rgba(255,69,0,0.3)',
              fontFamily: 'Inter, sans-serif',
            },
            success: { iconTheme: { primary: '#00FF88', secondary: '#16213E' } },
            error: { iconTheme: { primary: '#E94560', secondary: '#16213E' } },
          }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
