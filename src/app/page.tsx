import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ShoppingBag, Monitor, FileDigit } from 'lucide-react'
import { Route } from 'next'

export const metadata: Metadata = {
  title: 'Home - E-commerce Store',
  description: 'Welcome to our e-commerce store',
}

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Welcome to Our Store
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl mb-8">
        Your one-stop destination for high-quality digital and electronic products.
        Browse our extensive collection and find exactly what you need.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        <Link href="/products/digital" className="w-full">
          <div className="group relative overflow-hidden rounded-lg border p-6 hover:border-primary transition-colors">
            <FileDigit className="h-12 w-12 mb-4 text-primary" />
            <h2 className="text-2xl font-semibold mb-2">Digital Products</h2>
            <p className="text-muted-foreground">
              Software, digital codes, and downloadable content
            </p>
          </div>
        </Link>
        
        <Link href={'/products/electronics' as Route} className="w-full">
          <div className="group relative overflow-hidden rounded-lg border p-6 hover:border-primary transition-colors">
            <Monitor className="h-12 w-12 mb-4 text-primary" />
            <h2 className="text-2xl font-semibold mb-2">Electronic Products</h2>
            <p className="text-muted-foreground">
              Hardware, gadgets, and electronic devices
            </p>
          </div>
        </Link>
      </div>
      
      <div className="mt-12">
        <Button asChild size="lg">
          <Link href="/products">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Start Shopping
          </Link>
        </Button>
      </div>
    </div>
  )
}