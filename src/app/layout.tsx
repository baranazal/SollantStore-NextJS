import { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '@/components/theme-provider'
import { CartProvider } from '@/hooks/use-cart'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import CartSidebar from '@/components/layout/cart-sidebar'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'E-commerce Store',
  description: 'Your one-stop shop for digital and electronic products',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
              <CartSidebar />
            </div>
          </CartProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}